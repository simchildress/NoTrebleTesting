import React from "react";



function LevelButton(props) {
  return <button className="col-span-1 text-semibold text-2xl w-60 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] shadow-md "
    style={{ display: 'block', margin: 'auto', marginBottom: '20px', marginTop: '10px', height: '10vh'}}>Level {props.level}</button>
};
export default LevelButton