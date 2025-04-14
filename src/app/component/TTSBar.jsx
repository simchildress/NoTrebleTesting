"use client";
import { useState } from "react";
import { FaCirclePause } from "react-icons/fa6";
import { FaCirclePlay } from "react-icons/fa6";
import { useTTS } from "../context/TTSContext"; // Import TTS functions

export default function TTSBar() {
  const [buttonClicked, setButtonClicked] = useState(false); // State to track if the button is clicked
  const [isHovered, setIsHovered] = useState(false); // State to track hover status
  const [position, setPosition] = useState({ x: 100, y: 200 }); // Initial position for dragging
  const [dragging, setDragging] = useState(false); // Dragging state
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Offset while dragging
  const { speakPageContent, stopSpeaking, isSpeaking, currentIndex, resumeSpeaking } = useTTS(); // Use the TTS context

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleClick = () => {
    
    setButtonClicked(!buttonClicked);
 
    if (isSpeaking) {
      stopSpeaking();  // Stop speech if currently speaking
    } else {
      // Start from the beginning, or resume from the last word
      if (currentIndex !== null) {
        resumeSpeaking(); // Resume if we have a current index
      } else {
        speakPageContent(); // Start speaking if no previous index
      }
    }
  };
  

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="flex justify-center items-center w-fit h-fit p-5 bg-white border-4 border-gray-200 drop-shadow rounded-[50px]"
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className="content-center text-3xl mr-5">TTS Play/Pause</p>

      {/* Click on the icon to toggle */}
      <div className="transition-transform transform hover:scale-150" onClick={handleClick}>
        {!isSpeaking ? (
          <FaCirclePlay size={40} color={isHovered ? "#303E60" : "#455090"} />
        ) : (
          <FaCirclePause size={40} color={isHovered ? "#303E60" : "#455090"} />
        )}
      </div>
    </div>
  );
}
