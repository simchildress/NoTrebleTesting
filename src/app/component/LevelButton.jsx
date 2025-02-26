import React from "react";



function LevelButton(props) {
  return <button className="col-span-1 text-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4 ">Level {props.level}</button>;
}
export default LevelButton