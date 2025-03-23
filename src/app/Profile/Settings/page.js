"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/firebaseConfig";
import { getUserProfile } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, deleteUser, updateProfile } from "firebase/auth";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUsername = () => { //add firebase
    alert("Change username clicked");
  };

  const handleChangePassword = () => {
    alert("Change password clicked");
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

  return ( //need to integrate with theme
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="bg-white rounded-2xl shadow p-6 space-y-6">
        <div className="flex flex-col gap-4">
          <button
            onClick={handleChangeUsername}
            className="bg-blue-500 text-white rounded-xl px-4 py-2 hover:bg-blue-600"
          >
            Change Username
          </button>

          <button
            onClick={handleChangePassword}
            className="bg-blue-500 text-white rounded-xl px-4 py-2 hover:bg-blue-600"
          >
            Change Password
          </button>

          <button
            onClick={handleDeleteAccount}
            className="bg-blue-500 text-white rounded-xl px-4 py-2 hover:bg-blue-600"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
