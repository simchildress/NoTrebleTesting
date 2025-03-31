import React from "react";
import Link from "next/link";
import LevelButton from "../component/LevelButton";



export default function Lessons() {
    const Columns = () =>
    <div className="grid grid-cols-3 mt-4">
    <div className="col-span-3 font-bold text-3xl text-center">Introduction</div>
    <div className="col-span-3 font-bold text-3xl text-center">
    <LevelButton level = {0} address ="/Lessons/Introduction" >Basic Notation</LevelButton>
    </div>
    <div className="col-span-1 font-bold text-3xl text-center">Scales</div>
    <div className="col-span-1 font-bold text-3xl text-center">Rhythm</div>
    <div className="col-span-1 font-bold text-3xl text-center">Melody</div>
    <LevelButton level = {1} address ="/Lessons/Key/Lesson1-Pitches" ></LevelButton>
    <LevelButton level = {1} address ="/Lessons/Rhythm/Lesson1-Rhythmic-Values" ></LevelButton>
    <LevelButton level = {1} address ="/Lessons/Melody/Lesson1-Intervals" />
    <LevelButton level = {2} address ="/Lessons/Key/Lesson2-Scales" ></LevelButton>
    <LevelButton level = {2} address ="/Lessons/Rhythm/Lesson2-Beams-and-Borrowed-Divisions" ></LevelButton>
    <LevelButton level = {2} address ="/Lessons/Melody/Lesson2-Triads-and-Seventh-Chords" ></LevelButton>
    <LevelButton level = {3} address ="/Lessons/Key/Lesson3-Key-Signatures" ></LevelButton>
    <LevelButton level = {3} address ="/Lessons/Rhythm/Lesson3-Meter" ></LevelButton>
    <LevelButton level = {3} address ="/Lessons/Melody/Lesson3-Motion" ></LevelButton>
    </div>
    // can add level 4 buttons again if needed

    
    return (
        <main>
        <h1 className="text-center font-bold text-4xl mt-6">Music Theory Lessons</h1>    
        <div className= "mb-6 bg-gray-200 p-10 rounded-lg shadow-lg w-lg mt-4 ">
        <Columns/>
        </div>
        </main>
    );
}