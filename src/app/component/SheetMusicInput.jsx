import React from "react";
import "../cs/SheetMusicInput.css"
//add the input bar as a component in the css, use the @media to change the width person screen size.
// the screen size 
//className="mt-2 ml-3 px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-600"

const SheetMusicInput = ({ type, name, value, onChange }) => {
  return (
        <input
          type= {type}
          name={name}
          value={value}
          onChange={onChange}
          className=" SMinput flex border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-600"
        />
  );
}
export default SheetMusicInput;