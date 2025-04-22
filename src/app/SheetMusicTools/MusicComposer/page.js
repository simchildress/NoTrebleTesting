"use client";

import { use, useEffect, useRef, useState } from "react";
import {
  Renderer,
  Stave,
  StaveNote,
  Voice,
  Accidental,
  Dot,
  Formatter,
} from "vexflow";

export default function ComposerPage({ params }) {
  const containerRef = useRef(null);
  const { title, key, time, composer } = use(params);

  // Default values for key, time, and clef
  const keySignature = key || "C"; // Default to C major if no key provided
  const timeSignature = time || "4/4"; // Default to 4/4 time if no time provided
  const clef = "treble"; // Use treble clef by default

  const [measures, setMeasures] = useState([{ id: 0 }]); // Start with one empty measure
  const [notes, setNotes] = useState([]); // Store notes added by user

  const addMeasure = () => {
    setMeasures((prev) => [...prev, { id: prev.length }]); // Add a new measure
  };

  const addNote = (xPos) => {
    const newNote = new StaveNote({
      clef,
      keys: [`c/4`], // Default to C4 note
      duration: "q",
    });
    newNote.addModifier(new Accidental("#"), 0); // Add sharp accidental
    newNote.addModifier(new Dot(), 0); // Add dot (dotted note)
    
    setNotes((prevNotes) => [...prevNotes, { note: newNote, xPos }]); // Store the new note
  };

  useEffect(() => {
    const div = containerRef.current;
    if (!div) return;

    div.innerHTML = ""; // Clear the container before rendering

    // Initialize the renderer correctly
    const renderer = new Renderer(div, Renderer.Backends.SVG);
    renderer.resize(1000, 150 * measures.length); // Adjust height based on the number of measures

    const context = renderer.getContext(); // Get the SVG context

    let y = 40; // Start drawing from the top of the canvas

    // Loop over the measures to render them
    measures.forEach((_, index) => {
      const stave = new Stave(10, y, 900); // Create a new stave for each measure
      stave.addClef(clef).addKeySignature(keySignature).addTimeSignature(timeSignature);
      stave.setContext(context).draw(); // Draw the stave with the correct metadata

      // Create a voice and add all notes (with their x positions)
      const voice = new Voice({ time: timeSignature });
      const staveNotes = notes
        .filter((note) => note.xPos >= index * 100 && note.xPos < (index + 1) * 100) // Filter by x-position for this measure
        .map((note) => note.note);

      // Add notes to the voice
      voice.addTickables(staveNotes);

      // Manually draw the notes without using Formatter
      staveNotes.forEach((note) => {
        note.setContext(context).draw(); // Draw each note individually
      });

      // Format and render the voice
      new Formatter().joinVoices([voice]).format([voice], 850);
      voice.draw(context, stave);

      y += 150; // Adjust for the next stave position
    });
  }, [measures, keySignature, timeSignature, clef, notes]);

  // Handle click to add notes at position
  const handleClick = (e) => {
    const xPos = e.clientX - containerRef.current.getBoundingClientRect().left; // Get X position of click
    addNote(xPos); // Add note at clicked position
  };

  return (
    <div className="p-6" onClick={handleClick}>
      <h1 className="text-3xl mb-2">{title}</h1>
      <p className="mb-1">Composer: {composer}</p>
      <p className="mb-1">Key: {keySignature}</p>
      <p className="mb-4">Time Signature: {timeSignature}</p>

      <div className="mb-4">
        <button onClick={addMeasure} className="bg-blue-600 text-white px-4 py-2 rounded">
          ➕ Add Measure
        </button>
      </div>

      <div ref={containerRef} style={{ position: "relative", cursor: "pointer" }}></div>
    </div>
  );
}
