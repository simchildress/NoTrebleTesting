import React from "react";
import NavLink from "./NavLink";
import "../cs/LevelButton.css"

function LevelButton(props) {
  return (
      <NavLink href={props.address} 
        className=" lvlBtn col-span-1 text-semibold text-2xl w-60 bg-[#455090] text-white py-2  
        rounded-lg hover:bg-[#102437] shadow-md "
        style={{ display: 'block', margin: 'auto', marginBottom: '20px', marginTop: '10px', height: '10vh'}}
        activeClassName="" nonActiveClassName="">
        <p>Level {props.level}</p>
      </NavLink>
  )};
export default LevelButton