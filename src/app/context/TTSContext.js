"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { getAuth } from "@/firebaseConfig";
import { usePathname } from "next/navigation";
import { getFirestore } from "firebase/firestore";

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
  const db = getFirestore();

  useEffect(() => {
    if (voice) {
      saveTTSSettings(rate, voice);
    }
  }, [rate, voice]);
  

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

  const speakPageContent = (startIndex = 0, content = getPageText()) => {
    if (!utterance) return;
  
    const text = content;
    if (!text) return;
  
    const words = text.split(/\s+/); // Split text into an array of words
    const resumedText = words.slice(startIndex).join(" "); // Resume exactly where it left off
  
    window.speechSynthesis.cancel(); // Stop previous speech
  
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
  
    window.speechSynthesis.speak(utterance);   // Start speaking
    setIsSpeaking(true);
  
    utterance.onend = () => {
      setIsSpeaking(false);   // Reset state when done
      setCurrentIndex(null);    // Reset so future play starts from the beginning
    };
  };
  

  // Speak function for quick content
  const speakText = (text) => {
    if (!utterance || !text) return;  

    window.speechSynthesis.cancel();    // Stop anything already speaking

    utterance.text = text;
    utterance.voice = voice;
    utterance.rate = rate;

    window.speechSynthesis.speak(utterance); // Start speaking
    setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
  }

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

  const handleClick = (event) => {
    const target = event.target;
    let content = "";
  
    window.speechSynthesis.pause();

    // When clicking the speaker icon, it should read "TTS Menu" instead of the whole page
    if (event.target.closest('[data-ignore-tts]')) {
      if (isSpeaking) return;
      stopSpeaking();
      speakText("TTS Menu");
      return;
    }

    // Take in the alt texts if an element is an image
    if (target.tagName === "IMG") {
      content = target.alt?.trim();
    } else {
      content = target.innerText?.trim();
    }

    console.log('Clicked element:', event.target);
    // on click read
    console.log("I herd a clickkk");

    speakPageContent(0, content); // Read current paragraph
  };

  // TEST FIXME: need to unmount the event listener when the pathname changes
  // Old event listeners are still attached when they don't exist anymore
  useEffect(() => {
    const elements = document.querySelectorAll('p, h1, h2, h3, span, img, button, input'); // Select all <p> elements
    elements.forEach(element => {
      element.addEventListener('click', handleClick);
    });

    return () => {
    elements.forEach(element => {
      // Clean up the old event listeners and make sure the current DOM elements have nothing from the previous route
      element.removeEventListener('click', handleClick);
    });
    };
  }, [pathname, handleClick]);

  const saveTTSSettings = async (rate, voice) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) return;   // Don't save the changes if not logged in
    
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        speed: newRate,
        voice: newVoice?.name || "", // Store voice name
      });
      console.log("TTS settings saved to Firestore");
    } catch (error) {
      console.error("Error saving TTS settings:", error.message);
    }
  };


// END TEST
  return (
    <TTSContext.Provider value={{ getPageText, speakPageContent, resumeSpeaking, stopSpeaking, isSpeaking, currentIndex,
       rate, setRate, voice, setVoice, voices, setVoices, speakText }}>
      {children}
    </TTSContext.Provider>
  );
};

export const useTTS = () => useContext(TTSContext);
