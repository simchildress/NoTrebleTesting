"use client";
import React, { useState } from "react";
import Link from "next/link";

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();

      if(password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      // add login validation  
      setError("");
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Password:', password);

      //clearing after input
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    };

return (
    <div className=' flex flex-col items-center justify center min-h-screen bg-gray-100 p-6'>
         <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-lg w-full max-w-2xl text-2xl "> 
            <div className="mb-6"> 
            <h1 className = "text-5xl font-bold text-center mb-6">Sign Up</h1>
                <label className="block text-gray-800 font-semibold mb-2">Name: </label> 
                <input 
                type='name' 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full p-1 border border-gray-500 rounded "
                required
                />
                </div>
                <div>
                <label className="block text-gray-800 font-semibold mb-2">Email: </label> 
                <input 
                type='email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-1 border border-gray-500 rounded "
                required
                />
                 </div>
                  <div> 
                    <label className="block text-gray-800 font-semibold mb-2">Password:</label> 
                    <input 
                    type='password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full p-1 border border-gray-500 rounded"
                    required/> 
                    </div> 
                    <div>
                    <label className="block text-gray-800 font-semibold mb-2">Confirm Password: </label> 
                <input 
                type='password' 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-1 border border-gray-500 rounded "/>
                    </div>

                    {error && <p className="text-red-500 text-lg font-semibold mb-4">{error}</p>}

                    <button 
                    type="submit" className="mt-6 w-full bg-[#455090] text-white py-4 rounded-lg hover:bg-[#102437] mt-6 text-2xl font-bold"
                    >Sign Up
                    </button> 
                    </form> 
                    <p className="text-center mb-6 text-xl" >
                        Already have an account? 
                        <Link href="/Login" className="test-blue-600 font-semibold hover:underline">
                        {" "} Login
                        </Link>
                        </p> 
                    </div>
        ); 
    }; 

        export default SignUp; 
