"use client";
import { createContext, useState, useEffect, useContext } from "react";

// Create Context
const TTSContext = createContext();

export const TTSProvider = ({ children }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const newUtterance = new SpeechSynthesisUtterance();
    setUtterance(newUtterance);

    return () => {
      synth.cancel(); // Stop speech when component unmounts
    };
  }, []);

  // Select all the texts from the inside the body tag
  const getPageText = () => {
    const mainContent = document.querySelector("main") || document.body;
    return mainContent.innerText.trim();
  };

  const speakPageContent = () => {
    if (!utterance) return;
    const text = getPageText();

    if (text) {
      const synth = window.speechSynthesis;
      synth.cancel(); // Stop previous speech if any
      utterance.text = text;
      synth.speak(utterance);
      setIsSpeaking(true);

      utterance.onend = () => setIsSpeaking(false); // Reset after speaking
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel(); // Stop speech
    setIsSpeaking(false); // Update state
  };

  return (
    <TTSContext.Provider value={{ speakPageContent, stopSpeaking, isSpeaking }}>
      {children}
    </TTSContext.Provider>
  );
};

export const useTTS = () => useContext(TTSContext);
