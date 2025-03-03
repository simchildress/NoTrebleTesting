"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "../../lib/firebase/auth";



const Login = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const router = useRouter();

        const handleSubmit = async (e) => {
            e.preventDefault();
            
            try {
              const user = await login(email, password);
              console.log("User logged in:", user);
              alert("Login successful!");

              router.push("/");
          
              setEmail("");
              setPassword("");
            } catch (error) {
              alert("Login failed: " + error.message); 
            }
          };
          
    
    return (
        <div className=' flex flex-col items-center justify center min-h-screen bg-gray-100 p-6'>
             <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-lg w-full max-w-2xl text-2xl "> 
                <div className="mb-6"> 
                <h1 className = "text-5xl font-bold text-center mb-6">Login</h1>
                    <label className="block text-gray-800 font-semibold mb-2">Email: </label> 
                    <input 
                    type='email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-1 border border-gray-500 rounded "/>
                     </div>
                      <div> 
                        <label className="block text-gray-800 font-semibold mb-2">Password:</label> 
                        <input 
                        type='password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full p-1 border border-gray-500 rounded"/> 
                        </div> 
                        <button 
                        type="submit" className="mt-6 w-full bg-[#455090] text-white py-4 rounded-lg hover:bg-[#102437] mt-6 text-2xl font-bold"
                        >Login
                        </button> 
                        </form> 
                        <p className="text-center mb-6 text-xl" >
                            Don't have an account? 
                            <Link href="/Signup" className="test-blue-600 font-semibold hover:underline">
                            {" "} Create an account
                            </Link>
                            </p> 
                        </div>
            ); 
        }; 

            export default Login; 
    

