"use client";
import React, { useState, useEffect } from "react";
import FileUploader from "./fileupload";
import SheetMusicInput from "../component/SheetMusicInput";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useTTS } from "../context/TTSContext";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Midi } from "@tonejs/midi";
import * as Tone from "tone";


export default function SheetMusicTools() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
const router = useRouter();
const [user, setUser] = useState(null);
const [uploadStatus, setUploadStatus] = useState("");
const [uploading, setUploading] = useState(false);
const { speakPageContent } = useTTS();

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) {
      router.push("/Login");
      return;
    }
    setUser(currentUser);
  });
  return () => unsubscribe();
}, [router]);

const [sheet, setSheet] = useState({
  title: "",
  composer: "",
  key: "",
  timesig: ""
});


    const [midiFile, setMidiFile] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [instrument, setInstrument] = useState("synth");
    const [speed, setSpeed] = useState(1);
    const [originalBPM, setOriginalBPM] = useState(120);

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setSheet((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    function handleFileChange(selectedFile) {
        setFile(selectedFile);

        if (selectedFile) {
          setPreview(URL.createObjectURL(selectedFile));
          handleUpload(selectedFile);
        } else {
            setPreview(null);
            setUploadStatus("No file selected!");
        }
    }


    async function playMIDI(file) {
        if (!file) {
            alert("Upload a MIDI file");
            return;
        }

        await Tone.start();

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async () => {
            const midi = new Midi(reader.result);

            Tone.Transport.cancel();
            Tone.Transport.stop();

            const bpm = midi.header.tempos[0]?.bpm || 120;
            setOriginalBPM(bpm);
            Tone.Transport.bpm.value = bpm * speed;

            let synth;
            if (instrument === "synth") {
                synth = new Tone.PolySynth(Tone.Synth).toDestination();
            } else if (instrument === "piano") {
                synth = new Tone.Sampler(
                    {
                        urls: {
                            C4: "https://wayneh08.github.io/NoTreble_Samples/Upright_Piano/C4.wav",
                            E4: "https://wayneh08.github.io/NoTreble_Samples/Upright_Piano/E4.wav",
                            G4: "https://wayneh08.github.io/NoTreble_Samples/Upright_Piano/G4.wav",
                            C5: "https://wayneh08.github.io/NoTreble_Samples/Upright_Piano/C5.wav",
                        },
                        release: 1,
                        onload: () => scheduleNotes(midi, synth),
                    }
                ).toDestination();
            } else if (instrument === "guitar") {
                synth = new Tone.Sampler(
                    {
                        urls: {
                            C4: "https://wayneh08.github.io/NoTreble_Samples/Guitar/C4.wav",
                            E4: "https://wayneh08.github.io/NoTreble_Samples/Guitar/E4.wav",
                            G4: "https://wayneh08.github.io/NoTreble_Samples/Guitar/G4.wav",
                            C5: "https://wayneh08.github.io/NoTreble_Samples/Guitar/C5.wav",
                        },
                        release: 1,
                        onload: () => scheduleNotes(midi, synth),
                    }
                ).toDestination();
            }
            scheduleNotes(midi, synth);
        };
    }

    function scheduleNotes(midi, synth) {
        Tone.Transport.bpm.value = originalBPM * speed;

        midi.tracks.forEach((track) => {
            track.notes.forEach((note) => {
                Tone.Transport.schedule((time) => {
                    synth.triggerAttackRelease(note.name, note.duration, time);
                }, note.time);
            });
        });

        Tone.Transport.start();
        setIsPlaying(true);
    }

    function pauseMIDI() {
        if (Tone.Transport.state === "started") {
            Tone.Transport.pause();
            setIsPlaying(false);
        }
    }

    function restartMIDI() {
        Tone.Transport.stop();
        Tone.Transport.start();
        setIsPlaying(true);
    }

    function handleSpeedChange(e) {
        const newSpeed = parseFloat(e.target.value);
        setSpeed(newSpeed);

        if (isPlaying) {
            Tone.Transport.bpm.value = originalBPM * newSpeed;
            setUploadStatus("No file selected!");
        }
    }

    // Upload the file to the server when triggered
  const handleUpload = async () => {
   if (!file) {
      return;
    }

    /*await db.collection("users")
    .doc(uid)
    .collection("files")
    .doc(file.name)  // filename is used as the Firestore document ID
    .set({
    displayName: displayName || fil.ename,
    originalName: filename,
    filePath: path.join(__dirname, 'uploads', uid, filename), // Link to the file on the server
    timestamp: Date.now()
  });

    console.log(`Display name "${displayName}" saved for ${filename}`);
*/
    const renamedFile = new File([file], `${user.uid}_${file.name}`, { type: file.type });
    const formData = new FormData();
    formData.append("file", renamedFile); 


      const response = await fetch("/api/upload",{
        method: "POST",
        body: formData, // Send FormData containing the file
      });

      if (response.ok) {
        setUploadStatus("File uploaded successfully!");

        const isXml = file.name.endsWith(".xml");
        if(!isXml){
            const convertResponse = await fetch("/api/convert", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  uid: user.uid,
                  filename: file.name,
                }),
              });
              if (convertResponse.ok) {
                setUploadStatus("File Uploaded!");
              } else {
                const errText = await convertResponse.text();
                setUploadStatus(`Conversion failed: ${errText}`);
              }
            } else {
              setUploadStatus("XML file uploaded. No conversion needed.");
            }
         } else {
            setUploadStatus("Upload failed. Please try again.");
          }
  };
    
    useEffect(() => {
    }, []); 


    return (
        <main>
      
            {/* SHEET MUSIC CONVERTER */}
<div className="m-20">
  <h1 className="font-bold mb-7 text-4xl">Sheet Music Converter</h1>

  <div className="w-auto h-auto bg-gray-200 rounded-2xl text-body p-4 pl-7 flex flex-col md:flex-row border-2 border-gray-400">
    <div className="md:w-1/2 flex flex-col justify-between p-4">
      <FileUploader setFile={handleFileChange} />
      <div className="mt-auto text-left md:text-4xl text-body">
        <p className="pb-3">Piece Title: {sheet.title}</p>
        <p className="pb-3">Key: {sheet.key}</p>
        <p className="pb-3">Time Signature: {sheet.timesig}</p>
        <p className="pb-3">Composer: {sheet.composer}</p>
      </div>
    </div>

    <div className="w-1/2 p-4">
      {preview ? (
        file.type === "application/pdf" ? (
          <embed
            src={preview}
            type="application/pdf"
            className="w-full h-full max-h-full object-contain"
          />
        ) : (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full max-h-full object-contain rounded"
          />
        )
      ) : (
        <span className="text-gray-500">No file uploaded</span>
      )}
    </div>
  </div>

  <div>
    <button onClick={handleUpload} disabled={uploading}>
      {uploading ? "Saving..." : "Save File"}
    </button>
  </div>

  <div>
    {uploadStatus && <p>{uploadStatus}</p>}
  </div>

  <Link href="SheetMusicTools/MusicLibrary">
    <button>🎵 Go to Music Library</button>
  </Link>
</div>


            {/* SHEET MUSIC COMPOSER */}
            <div className="ml-20 mr-20 mb-20">
                <h1 className="font-bold mb-7 text-4xl">Sheet Music Composer</h1>
                <form className="block bg-gray-200 rounded-2xl p-4 pl-7 text-3xl border-2 border-gray-400" onSubmit={handleSubmit}>
                    <label className="block mb-4">
                        Enter Title:
                        <SheetMusicInput
                            type="text"
                            name="title"
                            value={sheet.title}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="block mb-4">
                        Enter Composer Name:
                        <SheetMusicInput
                            type="text"
                            name="composer"
                            value={sheet.composer}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="block mb-4">
                        Enter Key:
                        <SheetMusicInput
                            type="text"
                            name="key"
                            value={sheet.key}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="block mb-4">
                        Enter Time Signature:
                        <SheetMusicInput
                            type="text"
                            name="timesig"
                            value={sheet.timesig}
                            onChange={handleChange}
                        />
                    </label>
                </form>
            </div>

            {/* SYNTH */}
            <div className="mx-20 mb-20">
                <h1 className="font-bold mb-7 text-4xl">Sheet Music Reader</h1>
                <div className="bg-gray-200 text-black rounded-2xl p-8 border-2 border-gray-400 flex flex-col items-center">
                    <input
                        type="file"
                        accept=".mid"
                        className="mb-4 p-3 text-lg border border-gray-500 rounded-lg bg-white"
                        onChange={(e) => setMidiFile(e.target.files[0])}
                    />

                    <div className="mb-4">
                        <label className="text-lg font-semibold mr-2">Instrument:</label>
                        <select
                            value={instrument}
                            onChange={(e) => setInstrument(e.target.value)}
                            className="p-2 text-lg bg-white border border-gray-500 rounded-lg"
                        >
                            <option value="synth">🎵 Synth</option>
                            <option value="piano">🎹 Piano</option>
                            <option value="guitar">🎸 Guitar</option>
                        </select>
                    </div>

                    <div className="mb-4 flex flex-col items-center">
                        <label className="text-lg font-semibold">Speed: {speed.toFixed(2)}x</label>
                        <input
                            type="range"
                            min="0.25"
                            max="2"
                            step="0.05"
                            value={speed}
                            onChange={handleSpeedChange}
                            className="w-64 mt-2"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => playMIDI(midiFile)}
                            className="px-6 py-3 text-xl font-semibold bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-all"
                        >
                            Play ▶️
                        </button>
                        <button
                            onClick={pauseMIDI}
                            className="px-6 py-3 text-xl font-semibold bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-600 transition-all"
                        >
                            Pause ⏸️
                        </button>
                        <button
                            onClick={restartMIDI}
                            className="px-6 py-3 text-xl font-semibold bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-all"
                        >
                            Restart ⏮️
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
