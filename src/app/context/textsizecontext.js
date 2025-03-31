"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from "@/firebaseConfig";
import { getUserProfile } from "@/lib/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const TextSizeContext = createContext();

export const TextSizeProvider = ({ children }) => {
  const [textSize, setTextSize] = useState(null); // State for text size
  const [loading, setLoading] = useState(true);  // Track loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const profileData = await getUserProfile(currentUser.uid);
          const savedTextSize = profileData.textSize || 'medium'; // Default to 'medium' if none is saved
          
          // Set the text size from the profile
          setTextSize(savedTextSize);
          
          // Apply the text size to the body on initial load
          document.body.classList.toggle("large-text-size", savedTextSize === "large");
          document.body.classList.toggle("medium-text-size", savedTextSize === "medium");
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        // If no user, fall back to the default 'medium'
        setTextSize('medium');
        document.body.classList.add("medium-text-size");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return null; 
  }

  return (
    <TextSizeContext.Provider value={{ textSize, setTextSize }}>
      {children}
    </TextSizeContext.Provider>
  );
};

// Custom hook to use TextSizeContext in any component
export const useTextSize = () => useContext(TextSizeContext);
