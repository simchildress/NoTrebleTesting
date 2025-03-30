"use client";
import React, { useState } from "react";
import { Midi } from "@tonejs/midi";
import * as Tone from "tone";

export default function SynthPage() {
  const [midiFile, setMidiFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [instrument, setInstrument] = useState("synth");

  async function playMIDI(file) { // checks if they picked a midi file yet, if not browser should prompt for one
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

      let synth;
      if (instrument === "synth") {
        synth = new Tone.PolySynth(Tone.Synth).toDestination();
      } else if (instrument === "piano") { // piano samples
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
      } else if (instrument === "guitar") { //guitar samples
        synth = new Tone.Sampler(
          {
            urls: {
              C4: "https://wayneh08.github.io/NoTreble_Samples/Guitar/C4.wav",
              E4: "https://wayneh08.github.io/NoTreble_Samples/Guitar/E4.wav",
              G4: "https://wayneh08.github.io/NoTreble_Samples/Guitar/G4.wav",
              C5: "https://wayneh08.github.io/NoTreble_Samples/Guitar/C5.wav",
            },
            release: 1,
            onload: () => scheduleNotes(midi, synth), // Ensuring sampler is loaded
          }
        ).toDestination();
      }
    };
  }

  function scheduleNotes(midi, synth) {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-6">Upload and Play Your Sheet Music!</h2>

      <input
        type="file"
        accept=".mid"
        className="mb-4 p-3 text-lg border border-gray-500 rounded-lg bg-gray-800"
        onChange={(e) => setMidiFile(e.target.files[0])}
      />

      {/* Instrument Selection */}
      <div className="mb-4">
        <label className="text-lg">Instrument: </label>
        <select
          value={instrument}
          onChange={(e) => setInstrument(e.target.value)}
          className="p-2 text-lg bg-gray-800 border border-gray-500 rounded-lg"
        >
          <option value="synth">🎵 Synth</option>
          <option value="piano">🎹 Piano</option>
          <option value="guitar">🎸 Guitar</option>
        </select>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => playMIDI(midiFile)}
          className="px-6 py-3 text-xl font-semibold bg-green-500 rounded-lg shadow-lg hover:bg-green-600 transition-all"
        >
          Play
        </button>
        <button
          onClick={pauseMIDI}
          className="px-6 py-3 text-xl font-semibold bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600 transition-all"
        >
        Pause
        </button>
        <button
          onClick={restartMIDI}
          className="px-6 py-3 text-xl font-semibold bg-red-500 rounded-lg shadow-lg hover:bg-red-600 transition-all"
        >
          Restart
        </button>
      </div>
    </div>
  );
}
