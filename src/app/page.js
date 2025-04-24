"use client";
import React, { useEffect, useState } from "react";
import NavLink from "./component/NavLink";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig"; // import firebase configuration


export default function Home() {
  const [target, setTarget] = useState("/Login");
  const [loading, setLoading] = useState(true);

  // Use useEffect to trigger the speech when the page loads
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setTarget("/Login");
        return;
      }
      try {
        setTarget("/Profile");
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }

    });
   
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="welcome-main flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="welcome-div flex-col gap-4 items-center justify-items-center sm:flex-row">
            <h2>Learn Music with <span className="font-bold text-[#455090]">No Treble</span></h2>
            <p className="wd-50">
              No Treble provides an accessible learning environment for visually impaired people to learn music theory and access sheet music reading and writing tools.
            </p>
            <p className="italic text-[#2a325e]"> Press CTRL + (→) to go Next page</p>
            <p className="italic text-[#2a325e]"> Press CTRL + (←) to go Previous Page</p>
            <p className="italic text-[#2a325e]"> Press SPACE to toggle TTS</p>
            <p></p>
          </div>
          {target === "/Login" ? <NavLink href="/Signup" className="btn-primary welcome-signup" activeClassName="" nonActiveClassName="">Sign up</NavLink> : ""}
        

        </main>
      </div>
      <div className="features-div flex-cols items-center justify-items-center">
        <h2>Features</h2>
        <ul className="features">
  <li className="features-list">
    <div>
      <a href="/Lessons">
        <h3 className="italic">Lessons</h3>
      </a>
      <p>
        Learn music theory concepts in an easy way. From tempo and time signature to dynamics, we’ll teach you all the skills and vocabulary you need to read sheet music. Use the log-in feature to save your progress.
      </p>
    </div>
  </li>

  <li className="features-list">
    <div>
      <a href="/SheetMusicTools">
        <h3 className="italic">Sheet Music Reader</h3>
      </a>
      <p>
        Scan and upload a picture of your sheet music, and we’ll format it to be read aloud. We’ll tell you the key, time signature, and any other sheet music notation in the piece. Save your scanned music with the log-in feature.
      </p>
    </div>
  </li>

  <li className="features-list FLExcess">
    <div>
      <a href="/SheetMusicTools">
        <h3 className="italic"><span>Sheet Music Composer</span></h3>
      </a>
      <p>
        Write and edit your own compositions with this feature. You’ll be able to edit your sheet music markings in an easy and accessible way and play it back to perfect your piece.
      </p>
    </div>
  </li>
</ul>
</div>
    </>
  );
}
