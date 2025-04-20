"use client";
import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export default function MusicEditor({ params }) {
  const router = useRouter();
  const { uid, filename } = use(params); // Next.js 15 use() hook
  const [xmlData, setXmlData] = useState("");
  const [userId, setUserId] = useState("");
  const osmdRef = useRef(null);
  const osmdContainerRef = useRef(null);

  // Authenticate user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        alert("Please log in to use this feature");
        router.push("/Login");
        return;
      }
      setUserId(user.uid);
    });
    return () => unsubscribe();
  }, [router]);

  // Fetch MusicXML from server
  useEffect(() => {
    if (uid && filename && userId) {
      const fetchXml = async () => {
        try {
          const response = await fetch(`/api/getxml/${uid}/${filename}`);
          const xml = await response.text();
          setXmlData(xml);
        } catch (error) {
          console.error("Error loading XML:", error);
        }
      };
      fetchXml();
    }
  }, [uid, filename, userId]);

  // Load and render music with OSMD
  useEffect(() => {
    if (xmlData && osmdContainerRef.current) {
      const osmd = new OpenSheetMusicDisplay(osmdContainerRef.current, {
        autoResize: true,
        drawTitle: true,
        pageFormat: "A4_P",
      });

      osmd
        .load(xmlData)
        .then(() => osmd.render())
        .then(() => {
          osmdRef.current = osmd;

          // Defer interaction setup to ensure SVG is ready
          requestAnimationFrame(() => {
            const svg = osmdContainerRef.current.querySelector("svg");

            if (!svg) {
              console.warn("SVG not found after render.");
              return;
            }

            // Try matching note-related elements
            const clickableNotes = svg.querySelectorAll("g[class*='note'], use, path");

            console.log("Clickable notes found:", clickableNotes.length);

            clickableNotes.forEach((noteEl, index) => {
              noteEl.style.cursor = "pointer";
              noteEl.addEventListener("click", () => {
                console.log(`Clicked note ${index}`);
                noteEl.style.fill = "red"; // Visual feedback
              });
            });
          });
        })
        .catch((err) => console.error("OSMD render error:", err));
    }
  }, [xmlData]);

  return (
    <div>
      <h1>Editing: {filename}</h1>
      <Link href="/SheetMusicTools/MusicLibrary">
        <button> Back to Library</button>
      </Link>
      <div
        ref={osmdContainerRef}
        id="osmdContainer"
        style={{
          width: "100%",
          height: "600px",
          overflow: "auto",
          border: "1px solid #ccc",
          padding: "1rem",
          marginTop: "1rem",
        }}
      />
    </div>
  );
}
