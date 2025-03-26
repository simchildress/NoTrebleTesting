"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/firebaseConfig";
import { getUserProfile } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, deleteUser, updateProfile, updateEmail, updatePassword, updateGradeLevel, updateInstrument } from "firebase/auth";

//WILL GET ATTEMPTED IMPORT ERROR BECAUSE THIS NEED TO BE SETUP WITHIN FIREBASE

const Settings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gradelevel, setGradeLevel] = useState("");
  const [instrument, setInstrument] = useState("");
  const [user, setUser] = useState(null);
  const [isOn, setIsOn] = useState(false);

  const handleSaveChanges = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    // Basic layout of when the system takes in new inputs (need to change)
    try {
      if (user) {
        // Update username if changed
        if (username && userSnap.data().usernamee !== username) {
          await updateProfile(user, { displayName: username });
          alert("Username updated successfully");
        }

        // Update email if changed
        if (email && user.email !== email) {
          await updateEmail(user, email);
          alert("Email updated successfully");
        }

        // Update password if changed
        if (password) {
          await updatePassword(user, password);
          alert("Password updated successfully");
        }

        if (password) {
          await updateGradeLevel(user, gradelevel);
          alert("Grade level updated successfully");
        }

        if (password) {
          await updateInstrument(user, instrument);
          alert("Instrument updated successfully");
        }
      }
    } catch (error) {
      console.error("Error updating user information:", error);
      alert("Failed to update changes.");
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")){
        if(window.confirm("Are you really sure?")){

            const auth = getAuth();
            const user = auth.currentUser;
            deleteUser(user).then(() => {
              console.alert('Successfully deleted user');
            })
            .catch((error) => {
              console.log('Error deleting user:', error);
            });
        }
      }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUsername(user.displayName || ""); // Set username if available
        setEmail(user.email || ""); // Set email if available
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); 
  }, []);

  // Need to link this with the TTS option when sign in
  const handToggle = () => {
    setIsOn(!isON);
  }

  return ( //need to integrate with theme
    <div className="w-3/4 min-h-screen bg-gray-100 flex flex-col mx-auto my-20 rounded-xl border-2 border-black-100 drop-shadow-md">
      <h1 className="text-3xl font-bold mx-auto mt-20 mb-10"> Account Settings</h1>
      
      <div className="mx-20">
        <label className="mt-5 mb-10 block text-xl font-bold">
          Username:
          <input 
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-3/4 mt-2 ml-5 px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-600 shadow-md shadow-[#455090]/20"
          />
        </label>

        <label className="mt-5 mb-10 block text-xl font-bold">
          Password:
          <input 
              type="text"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-3/4 mt-2 ml-5 px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-600 shadow-md shadow-[#455090]/20"
          />
        </label>

        <label className="mt-5 mb-10 block text-xl font-bold">
          Grade Level:
          <input 
              type="text"
              name="gradelevel"
              value={gradelevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="w-3/4 mt-2 ml-5 px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-600 shadow-md shadow-[#455090]/20"
          />
        </label>

        <label className="mt-5 mb-10 block text-xl font-bold">
          Instrument of Interest:
          <input 
              type="text"
              name="instrument"
              value={instrument}
              onChange={(e) => setInstrument(e.target.value)}
              className="w-3/4 mt-2 ml-5 px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-600 shadow-md shadow-[#455090]/20"
          />
        </label>

        {/* Toggle button for TTS option */}
        <div className="flex items-center space-x-4 mb-10">
          <p className="text-xl font-bold">Text-To-Speech (TTS) option:</p>
          <button
            onClick={() => setIsOn(!isOn)}
            className={`w-20 h-10 flex items-center justify-${isOn ? "end" : "start"} rounded-full px-2 transition-colors ${
              isOn ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <span className="text-white font-bold text-lg flex-1 text-center">
              {isOn ? "ON" : "OFF"}
            </span>
          </button>
        
        </div >
        
        { /* User will get to choose 3 different font sizes? */ }
        <div className="flex items-center space-x-4 mb-10">
          <p className="text-xl font-bold">Text Sizes: </p>
        </div>

      </div>


      <button
        onClick={handleSaveChanges} // Save all changes when clicked
        className="m-auto bg-[#455090] text-white text-xl rounded-xl px-4 py-2 hover:bg-blue-600 mt-4"
      >
        Save Changes
      </button>


      <button
        onClick={handleDeleteAccount}
        className="bg-red-200 text-black text-xl rounded-sm px-4 py-2 hover:bg-red-500 border-2 border-black/50 border-dashed"
      >
        Delete Account
      </button>
    </div>
  );
};

export default Settings;
