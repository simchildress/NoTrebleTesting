"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OpenSheetMusicDisplay, TransposeCalculator } from "opensheetmusicdisplay";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import Vex from "vexflow";

export default function MusicEditor({ params }) {
  const router = useRouter();
  const { uid, filename } = use(params);
  const [xmlData, setXmlData] = useState("");
  const [userId, setUserId] = useState("");
  const [osmd, setOsmd] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        alert("Please log in to use this feature");
        router.push("/Login");
        return;
      }
      setUserId(user.uid);
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (uid && filename && userId) {
      (async () => {
        try {
          const res = await fetch(`/api/getxml/${uid}/${filename}`);
          const xml = await res.text();
          setXmlData(xml);
        } catch (err) {
          console.error("Error loading XML:", err);
        }
      })();
    }
  }, [uid, filename, userId]);

  useEffect(() => {
    if (xmlData) {
      const container = document.getElementById("osmdContainer");
      if (container) {
        const display = new OpenSheetMusicDisplay(container, {
          autoResize: true,
          pageFormat: "A4_P",
        });
        display.load(xmlData).then(() => {
          display.render();
          setOsmd(display);
        });
      }
    }
  }, [xmlData]);

  const insertNote = () => {
    if (!osmd) return;
    const vfContainer = document.getElementById("vexflowInsert");
    vfContainer.innerHTML = "";

    const { Renderer, Stave, StaveNote, Voice, Formatter } = Vex.Flow;
    const renderer = new Renderer(vfContainer, Renderer.Backends.SVG);
    renderer.resize(300, 200);
    const ctx = renderer.getContext();

    const stave = new Stave(10, 40, 250);
    stave
      .addClef("treble")
      .addTimeSignature("4/4")
      .setContext(ctx)
      .draw();

    const note = new StaveNote({ keys: ["c/4"], duration: "q" });
    const voice = new Voice({ num_beats: 4, beat_value: 4 }).addTickables([note]);
    new Formatter().joinVoices([voice]).format([voice], 200);
    voice.draw(ctx, stave);
  };

  const changeTimeSignature = () => {
    alert("Time signature editing requires XML manipulation and reloading.");
  };

  const transposeScore = () => {
    if (!osmd) return;
    TransposeCalculator.transpose(osmd.Sheet, 2);
    osmd.render();
  };

  const exportXML = () => {
    if (!xmlData) return;
    const blob = new Blob([xmlData], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white">
      <div className="flex justify-between items-center w-full max-w-6xl mb-4">
        <h1 className="text-2xl font-bold text-[#0a0a0a]">Editing: {filename}</h1>
        <Link href="/SheetMusicTools/MusicLibrary">
          <button className="bg-[#455090] text-white rounded px-4 py-2 hover:bg-[#374774]">
            Back to Library
          </button>
        </Link>
      </div>

      <div className="flex gap-6 w-full max-w-6xl">
        <aside className="w-1/4 bg-[#f4f8ff] p-4 rounded-xl shadow-md space-y-4">
          <button
            onClick={insertNote}
            className="w-full bg-[#455090] text-white rounded px-4 py-2 hover:bg-[#374774]"
          >
            Insert Note
          </button>
          <button
            onClick={changeTimeSignature}
            className="w-full bg-[#8cbe47] text-white rounded px-4 py-2 hover:bg-[#7aab40]"
          >
            Change Time Signature
          </button>
          <button
            onClick={transposeScore}
            className="w-full bg-[#f0bc56] text-white rounded px-4 py-2 hover:bg-[#e29c44]"
          >
            Transpose
          </button>
          <button
            onClick={exportXML}
            className="w-full bg-[#6f56d1] text-white rounded px-4 py-2 hover:bg-[#5c46b3]"
          >
            Export XML
          </button>
        </aside>

        <main className="w-3/4 flex justify-center items-start">
          <div
            id="osmdContainer"
            className="border rounded-lg shadow-md bg-white mx-auto w-full max-w-4xl overflow-auto"
            style={{ height: "600px" }}
          ></div>
        </main>
      </div>

      <div className="mt-4 flex justify-center w-full max-w-6xl">
        <div id="vexflowInsert"></div>
      </div>
    </div>
  );
}
