"use client";

import React, { useEffect, useState } from "react";
import { realtimeDB } from "@/firebaseConfig";
import { ref, get } from "firebase/database";
import "./textbook.css"; 

const Textbook = () => {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchTextbook = async () => {
      const textbookRef = ref(realtimeDB, "openMusicTheory/lessons"); 
      const snapshot = await get(textbookRef);
      if (snapshot.exists()) {
        setChapters(snapshot.val());
      } else {
        console.log("No textbook data found");
      }
    };

    fetchTextbook();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Open Music Theory Textbook</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chapters.map((chapter, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">{chapter.title}</h2>
            <p className="text-sm text-gray-600">{chapter.creator}</p>
            <a
              href={chapter.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Read Chapter
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Textbook;
