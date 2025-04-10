"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { usePathname } from "next/navigation";

// Create Context
const TTSContext = createContext();

export const TTSProvider = ({ children }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [rate, setRate] = useState(1);
  const [voice, setVoice] = useState();
  const [voices, setVoices] = useState();
  const pathname = usePathname(); // Gets the current page route

  useEffect(() => {
    const synth = window.speechSynthesis;
    
    // Get the voices available for different browsers
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoice(availableVoices[0]);   // Default voice
      setVoices(availableVoices);   // Store all voices
    };
    const newUtterance = new SpeechSynthesisUtterance();
    setUtterance(newUtterance);
  
    // Stop speech and reset state on route change
    synth.cancel();
    setIsSpeaking(false);
    setCurrentIndex(0);

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  
    loadVoices(); // Also run on mount
  
    return () => {
      synth.cancel(); // Also stop speech on unmount
    };
  }, [pathname]);

  // Select all the texts from the inside the body tag
  const getPageText = () => {
    const mainContent = document.body;
    const ttsBar = document.querySelector(".ttsBar"); // Target the TTSBar by class
    
    // If there's a TTS Bar, exclude it from the selection
    const textContent = mainContent.innerText.trim();
    const barText = ttsBar ? ttsBar.innerText.trim() : ''; // Get the TTS Bar content
  
    // Remove the TTS Bar's text from the body text
    return textContent.replace(barText, "").trim();
  };

  const speakPageContent = (startIndex = 0) => {
    if (!utterance) return;
  
    const text = getPageText();
    if (!text) return;
  
    const words = text.split(/\s+/); // Split text into an array of words
    const resumedText = words.slice(startIndex).join(" "); // Resume exactly where it left off
  
    const synth = window.speechSynthesis;
    synth.cancel(); // Stop previous speech
  
    utterance.rate = rate;
    utterance.voice = voice;
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
    <TTSContext.Provider value={{ getPageText, speakPageContent, resumeSpeaking, stopSpeaking, isSpeaking, currentIndex,
       rate, setRate, voice, setVoice, voices, setVoices }}>
      {children}
    </TTSContext.Provider>
  );
};

export const useTTS = () => useContext(TTSContext);
