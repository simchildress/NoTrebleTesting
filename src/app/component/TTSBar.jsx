"use client";
import { useState, useEffect } from "react";
import { FaCirclePause } from "react-icons/fa6";
import { FaCirclePlay } from "react-icons/fa6";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { MdOutlineArrowDropUp } from "react-icons/md";
import { useTTS } from "../context/TTSContext"; // Import TTS functions

export default function TTSBar() {
  const [buttonClicked, setButtonClicked] = useState(false); // State to track if the button is clicked
  const [isHovered, setIsHovered] = useState(false); // State to track hover status
  const [position, setPosition] = useState({ x: 100, y: 200 }); // Initial position for dragging
  const [dragging, setDragging] = useState(false); // Dragging state
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Offset while dragging
  const [showOptions, setShowOptions] = useState(false);  // State for the expanding button   
  const { speakPageContent, stopSpeaking, isSpeaking, currentIndex, resumeSpeaking, rate, setRate, voice, setVoice, voices, setVoices } = useTTS(); // Use the TTS context

  useEffect(() => {
    // Ensure the voices are populated from the SpeechSynthesis API
    const allVoices = window.speechSynthesis.getVoices();
    setVoices(allVoices); // Set the available voices in the TTS context
  }, []);

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

  const handleTTS = () => {
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

  const handleRate = (e) => {
    // Stop speaking when user chooses a new rate
    stopSpeaking();
    const newRate = parseFloat(e.target.value);
    setRate(newRate);
  };

  const handleExpand = () => {
    setShowOptions(!showOptions);
  };

  const filteredVoices = voices.slice(0, 3);

  const handleVoiceChange = (e) => {
    stopSpeaking();
    const selectedVoice = filteredVoices.find((v) => v.name === e.target.value);
    setVoice(selectedVoice); // Update the voice in the TTS context
  };

  // Get the first 3 voices from the available voices list

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="ttsBar flex flex-col justify-center items-center w-fit h-fit p-2 bg-white border-4 border-gray-200 drop-shadow rounded-[50px]"
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
      <div className="relative">
        <div className="flex items-center">
        <p className="content-center text-body m-3">TTS Bar</p>

        {/* Position the Play/Pause button on top of the speech rate */}
        <div className="transition-transform transform hover:scale-125" onClick={handleTTS}>
          {!isSpeaking ? (
            <FaCirclePlay size={40} color={isHovered ? "#303E60" : "#455090"} />
          ) : (
            <FaCirclePause size={40} color={isHovered ? "#303E60" : "#455090"} />
          )}
        </div>
        <button className="m-2" onClick={handleExpand}>
          {!showOptions ? (
            < MdOutlineArrowDropDown size={40} />
          ) : (
            <MdOutlineArrowDropUp size={40} />
          )}
        </button>
      </div>
      </div>
          {/* Expandable Options */}
      <div className={`transition-all duration-300 ease-in-out ${showOptions ? "max-h-96" : "max-h-0"} overflow-hidden`}>
        {/* Speech rate dropdown below the play/pause button */}
        <div className="text-body mt-2"> {/* Adjust margin to move the dropdown below the button */}
          <label>Speed: </label>
          <select 
            value={rate}
            onChange={handleRate}
            className="content-center text-center m-2 bg-gray-200 shadow"
          >
            <option value="0.5">0.5</option>
            <option value="0.75">0.75</option>
            <option value="1">1</option>
            <option value="1.5">1.5</option>
            <option value="1.75">1.75</option>
            <option value="2">2</option>
          </select>
        </div>
        <div className="text-body mt-2">
            <label>Voice: </label>
            <select 
              value={voice?.name} 
              onChange={handleVoiceChange} // Now the function is called correctly
            >
              {filteredVoices.map((v, i) => (
                <option key={i} value={v.name}>{v.name}</option>
              ))}
            </select>
        </div>
      </div>
    </div>
  );
}
