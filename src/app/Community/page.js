"use client";
import React, { useState } from "react";

export default function Community(){
    //Post starts out with 4 properties
    const [post, setPost]=useState([]);
    
    //Handle the change when the input changes and assign it to the appropriate field
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setSheet((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    //Prevent resetting the page to default after every input
    const handleSubmit = (event) => {
        event.preventDefault();
    };
    
    return (
        <main>
            <h1 className=" text-center font-bold text-5xl mt-40 mb-10">Community Posts</h1>
                <div className="container mx-auto bg-gray-200 -z-10 rounded-2xl text-2xl p-8">
                    <div className="w-auto mx-auto bg-[#455090] -z-10 rounded-2xl text-2xl p-8">
                        <input
                            type="text"
                            name="post"
                            placeholder="Let's share what going..."
                            className="mt-2 ml-3 px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-600"
                        />
                        <button className="ml-10 w-auto bg-gray-800 text-white rounded-lg px-4 py-2">Create Post</button>
                    </div>
                    <p className="mt-10 mb-10">See more</p>
                
                    <div className= "mx-auto bg-[#455090] -z-10 rounded-2xl text-2xl p-8">
                        
                    </div>
                </div>
        </main>
    );
}