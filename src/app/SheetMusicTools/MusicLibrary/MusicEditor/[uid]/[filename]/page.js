"use client";
import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import Link from "next/link";
import {
  Renderer,
  Stave,
  StaveNote,
  Voice,
  Formatter,
  Dot,
  Accidental,
  Beam,
  StaveConnector,
} from "vexflow";
import { XMLParser } from "fast-xml-parser";

export default function MusicEditor({ params }) {
  const router = useRouter();
  const { uid, filename } = use(params);
  const [userId, setUserId] = useState("");
  const [xmlData, setXmlData] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        alert("Please log in to use this feature.");
        router.push("/Login");
        return;
      }
      setUserId(user.uid);
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (uid && filename && userId) {
      const fetchXml = async () => {
        try {
          const res = await fetch(`/api/getxml/${uid}/${filename}`);
          const xml = await res.text();
          setXmlData(xml);
        } catch (err) {
          console.error("Error loading MusicXML:", err);
        }
      };
      fetchXml();
    }
  }, [uid, filename, userId]);

  useEffect(() => {
    if (xmlData && containerRef.current) {
      drawMusic(xmlData, containerRef.current);
    }
  }, [xmlData]);

  return (
    <div>
      <h1>Editing: {filename}</h1>
      <Link href="/SheetMusicTools/MusicLibrary">
        <button>⬅️ Back to Library</button>
      </Link>
      <div
        ref={containerRef}
        style={{ backgroundColor: "#fcfcf5", width: "100%", minHeight: "100vh" }}
      />
    </div>
  );
}

// ==== DRAWING ==== //

function drawMusic(xml, container) {
  const parser = new XMLParser({ ignoreAttributes: false });
  const parsed = parser.parse(xml);
  const parts = Array.isArray(parsed["score-partwise"].part)
    ? parsed["score-partwise"].part
    : [parsed["score-partwise"].part];

  container.innerHTML = "";
  const renderer = new Renderer(container, Renderer.Backends.SVG);
  renderer.resize(1400, 2000);
  const context = renderer.getContext();

  let y = 40;
  const measureWidth = 280;
  const spacing = 220;

  let isFirstSystem = true; // Only display time signature in the first system.

  for (const part of parts) {
    const measures = Array.isArray(part.measure) ? part.measure : [part.measure];
    const stavesPerSystem = parseInt(measures[0]?.attributes?.staves || "1", 10);
    const chunks = chunkArray(measures, 4);

    for (const chunk of chunks) {
      const staveYs = [...Array(stavesPerSystem)].map((_, i) => y + i * 80);
      const staveRows = [...Array(stavesPerSystem)].map(() => []);
      let isFirstMeasureInSystem = true; // Ensure connectors are only drawn for the first measure

      for (let m = 0; m < chunk.length; m++) {
        const measure = chunk[m];
        const staffVoices = [...Array(stavesPerSystem)].map(() => ({}));
        const allBeams = [...Array(stavesPerSystem)].map(() => []);

        for (let s = 0; s < stavesPerSystem; s++) {
          const stave = new Stave(40 + m * (measureWidth + 1), staveYs[s], measureWidth);

          // Display clef and key signature at the beginning of each system
          if (m === 0) {
            const clef = extractClef(measure.attributes?.clef, s + 1);
            const key = extractKey(measure.attributes?.key?.fifths);
            const time = measure.attributes?.time?.beats
              ? `${measure.attributes.time.beats}/${measure.attributes.time["beat-type"]}`
              : null;
            if (clef) stave.addClef(clef);
            if (key) stave.addKeySignature(key); // Add key signature at the start of each system
            if (time && isFirstSystem) {
              stave.addTimeSignature(time); // Add time signature only on the first system
              isFirstSystem = false; // Only add the time signature once
            }
          }

          stave.setContext(context).draw();
          staveRows[s].push(stave);

          // Draw the Stave Connector only at the first measure in the system
          if (isFirstMeasureInSystem && stavesPerSystem > 1) {
            for (let i = 0; i < staveRows.length - 1; i++) {
              const top = staveRows[i][m];
              const bottom = staveRows[i + 1][m];
              if (top && bottom) { // Ensure the stave is initialized
                new StaveConnector(top, bottom)
                  .setType(StaveConnector.type.BRACE)
                  .setContext(context)
                  .draw();
              }
            }
            isFirstMeasureInSystem = false; // After drawing the first connector, no more connectors in this system
          }
        }

        const notes = Array.isArray(measure.note) ? measure.note : [measure.note];
        const beamsMap = {}; // { voiceNumber: [ { notes: [], beamGroup: [start, cont, end] } ] }

        for (const note of notes) {
          const staffIndex = parseInt(note.staff || "1", 10) - 1;
          const voiceId = note.voice || "1";
          const clef = extractClef(measure.attributes?.clef, staffIndex + 1);
          const vfNote = createVFNote(note, clef);
          if (!vfNote) continue;

          if (!staffVoices[staffIndex][voiceId]) staffVoices[staffIndex][voiceId] = [];
          staffVoices[staffIndex][voiceId].push(vfNote);

          // Beam group building
          if (note.beam) {
            if (!beamsMap[voiceId]) beamsMap[voiceId] = [[]];
            const group = beamsMap[voiceId];
            const beamVal = Array.isArray(note.beam) ? note.beam[0]["#text"] : note.beam["#text"] || note.beam;
            if (beamVal === "begin") {
              group.push([vfNote]);
            } else if (beamVal === "continue") {
              if (group.length > 0) group[group.length - 1].push(vfNote);
            } else if (beamVal === "end") {
              if (group.length > 0) group[group.length - 1].push(vfNote);
            }
          }
        }

        for (let s = 0; s < stavesPerSystem; s++) {
          const stave = staveRows[s][m];
          const voices = Object.values(staffVoices[s] || {}).map((group) =>
            new Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables(group)
          );

          voices.forEach((v) => new Formatter().joinVoices([v]).format([v], measureWidth - 20));
          voices.forEach((v) => v.draw(context, stave));
        }

        // Draw beams
        for (const beamGroups of Object.values(beamsMap)) {
          beamGroups.forEach((group) => {
            if (group.length > 1) {
              const beam = new Beam(group);
              beam.setContext(context).draw();
            }
          });
        }
      }

      // Draw the system brace for the first measure of the system only
      if (stavesPerSystem > 1) {
        const firstStave = staveRows[0][0]; // First stave in the system
        const secondStave = staveRows[1][0]; // Second stave in the system
        new StaveConnector(firstStave, secondStave)
          .setType(StaveConnector.type.BRACE)
          .setContext(context)
          .draw();
      }

      // Connect every measure with a vertical line
      for (let m = 0; m < chunk.length - 1; m++) {
        for (let s = 0; s < staveRows.length; s++) {
          const top = staveRows[s][m];
          const bottom = staveRows[s][m + 1];
          new StaveConnector(top, bottom)
            .setType(StaveConnector.type.SINGLE_LEFT)
            .setContext(context)
            .draw();
        }
      }

      y += spacing;
    }
  }
}

// ==== HELPERS ==== //

function chunkArray(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function extractClef(data, staffNum) {
  if (!data) return "treble";
  if (Array.isArray(data)) {
    const match = data.find((c) => String(c["@_number"] || "1") === String(staffNum));
    return mapClef(match?.sign);
  } else if (data.sign) {
    return mapClef(data.sign);
  }
  return "treble";
}

function extractKey(fifths) {
  const map = {
    "-7": "Cb", "-6": "Gb", "-5": "Db", "-4": "Ab", "-3": "Eb", "-2": "Bb", "-1": "F",
    "0": "C", "1": "G", "2": "D", "3": "A", "4": "E", "5": "B", "6": "F#", "7": "C#",
  };
  return map[fifths] || "C";
}

function mapClef(sign) {
  const map = { G: "treble", F: "bass", C: "alto", percussion: "percussion" };
  return map[sign] || "treble";
}

function createVFNote(note, clef) {
  const durationMap = {
    whole: "w", half: "h", quarter: "q", eighth: "8", "16th": "16", "32nd": "32",
  };

  const type = note.type?.toLowerCase?.();
  const base = durationMap[type] || "q";

  const isRest = !!note.rest;
  const dotCount = Array.isArray(note.dot)
    ? note.dot.length
    : note.dot || note["dot"] !== undefined
    ? 1
    : 0;

  const duration = base + (isRest ? "r" : "");

  let keys = ["b/4"];
  let acc = null;

  if (!isRest) {
    const step = note.pitch?.step?.toLowerCase?.();
    const octave = note.pitch?.octave;
    if (!step || !octave) return null;

    keys = [`${step}/${octave}`];

    const accXml = note.accidental?.toLowerCase?.();
    const alter = note.pitch?.alter;

    if (accXml) {
      const accMap = {
        sharp: "#",
        flat: "b",
        natural: "n",
        "double-sharp": "##",
        "flat-flat": "bb",
      };
      acc = accMap[accXml];
    } else if (alter !== undefined) {
      acc = alter === "1" ? "#" : alter === "-1" ? "b" : alter === "0" ? "n" : null;
    }
  }

  const hasBeam = Array.isArray(note.beam) || note.beam !== undefined;

  const noteObj = new StaveNote({
    keys,
    duration,
    clef,
    auto_stem: !hasBeam,
  });

  if (dotCount > 0) Dot.buildAndAttach([noteObj], { all: true });
  if (hasBeam) {
    noteObj.setFlagStyle({ fillStyle: "transparent", strokeStyle: "transparent" });  // hides flag (the tail!)
  }
  if (acc) noteObj.addModifier(new Accidental(acc), 0);

  return noteObj;
}
