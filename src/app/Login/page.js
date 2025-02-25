"use client";
import React, { useState } from "react";

const Login = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = (e) => {
             e.PreventDefault();
          // FIXME login validation   
          console.log('Email:', email);
          console.log('Password:', password);
        };
    
    return (
        <div className='login-page'>
             <h1 className = "text-2xl font-bold text-center mb-6">Login Page</h1> 
             <form onSubmit={handleSubmit}> 
                <div> 
                    <label>Email:</label> 
                    <input 
                    type='email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} />
                     </div>
                      <div> 
                        <label>Password:</label> 
                        <input 
                        type='password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} /> 
                        </div> 
                        <button 
                        type='submit'
                        >Login
                        </button> 
                        </form> 
                        <p>
                            Don't have an account? 
                            <a href='/signup'>
                            {" "}Create an account
                            </a>
                        </p> 
                        </div>
            ); 
        }; 

            export default Login; 
    

