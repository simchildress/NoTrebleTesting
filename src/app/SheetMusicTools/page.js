"use client";
import React, { useState } from "react";

export default function SheetMusicTools(){
    
    //Music sheet starts out with 4 properties
    const [sheet, setSheet]=useState({
        title: "",
        composer: "",
        key: "",
        timesig: ""
    });

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
            <div className= "m-20">
                <h1 className="font-bold text-5xl mb-7">Sheet Music Reader</h1>
                <div className= "bg-gray-200 -z-10 rounded-2xl text-2xl p-4 pl-7">
                    <button className="mt-10 px-5 py-3 border-2 border-black bg-white text-black rounded mb-20 mt-5 hover:bg-gray-400 duration-300">Upload image or PDF</button>
                    <p className="pb-3">Piece Title: </p>
                    <p className="pb-3">Key: </p>
                    <p className="pb-3">Time Signature: </p>
                    <p className="pb-3">Composer: </p>
                </div>
            </div>
            <br />
            
            <div className="ml-20 mr-20">
                <h1 className="font-bold text-5xl mb-7">Sheet Music Composer</h1>
                <form className= "inset-2 bg-gray-200 -z-10 rounded-2xl text-2xl p-4 pl-7">
                    <label className="mt-5 block text-2xl">
                        Enter Title:
                        <input 
                            type="text"
                            name="title"
                            value={sheet.title}
                            onChange={handleChange} 
                            className="mt-2 ml-3 px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-600"
                        />
                    </label>
                    <label className="mt-5 block text-2xl">
                        Enter Composer Name:
                        <input
                            type="text" 
                            name="composer"
                            value={sheet.composer}
                            onChange={handleChange}  
                            className="mt-2 ml-3 px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-600"
                        />
                    </label>
                    <label className="mt-5 block text-2xl">
                        Enter Key:
                        <input
                            type="text" 
                            name="key"
                            value={sheet.key}
                            onChange={handleChange} 
                            className="mt-2 ml-3 px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-600"
                        />
                    </label>
                    <label className="mt-5 block text-2xl">
                        Enter Time Signature:
                        <input
                            type="text" 
                            name="timesig"
                            value={sheet.timesig}
                            onChange={handleChange}  
                            className="mt-2 ml-3 px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-600"
                        />
                    </label>
                </form>
            </div>
        </main>
    );
}