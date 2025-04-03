"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { usePathname } from "next/navigation";

// Create Context
const TTSContext = createContext();

export const TTSProvider = ({ children }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const pathname = usePathname(); // Gets the current page route

  useEffect(() => {
    const synth = window.speechSynthesis;
    const newUtterance = new SpeechSynthesisUtterance();
    setUtterance(newUtterance);

    return () => {
      synth.cancel(); // Stop speech when component unmounts
    };
  }, []);

   // Stop speech when the user navigates to a new page
   useEffect(() => {
    window.speechSynthesis.cancel(); // Stop TTS on route change
    setIsSpeaking(false);
    setCurrentIndex(0);   // Reset the index when the page changes
  }, [pathname]); // Runs whenever the page path changes

  // Select all the texts from the inside the body tag
  const getPageText = () => {
    const mainContent = document.body;
    return mainContent.innerText.trim();
  };

  const speakPageContent = (startIndex = 0) => {
    if (!utterance) return;
  
    const text = getPageText();
    if (!text) return;
  
    const words = text.split(/\s+/); // Split text into an array of words
    const resumedText = words.slice(startIndex).join(" "); // Resume exactly where it left off
  
    const synth = window.speechSynthesis;
    synth.cancel(); // Stop previous speech
  
    utterance.text = resumedText; // Only contains the remaining words
    let spokenWordCount = startIndex; // Track spoken words
  
    utterance.onboundary = (event) => {
      if (event.name === "word") {
        const spokenWords = resumedText.slice(0, event.charIndex).split(/\s+/).length; // Count the words spoken so far
        spokenWordCount = startIndex + spokenWords;
        
        setCurrentIndex(spokenWordCount - 1); // Set the index to be one less because it keeps skipping a word in between
      }
    };
  
    synth.speak(utterance);
    setIsSpeaking(true);
  
    utterance.onend = () => setIsSpeaking(false);
  };
  
  
  // Resume function
  const resumeSpeaking = () => {
    if (currentIndex !== null) {
      speakPageContent(currentIndex); // Restart from last spoken word
    }
  };
  

  const stopSpeaking = () => {
    window.speechSynthesis.pause(); // resume speech
    setIsSpeaking(false); // Update state
  };

  return (
    <TTSContext.Provider value={{ getPageText, speakPageContent, resumeSpeaking, stopSpeaking, isSpeaking, currentIndex }}>
      {children}
    </TTSContext.Provider>
  );
};

export const useTTS = () => useContext(TTSContext);
