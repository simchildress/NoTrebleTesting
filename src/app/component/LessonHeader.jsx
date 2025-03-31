import React from "react";
import "../cs/LessonHeader.css"

function LessonHeader(props) {
  return (
        <div
          className=" lesson col-span-1 font-bold text-h3 text-center"
        >
        <p>{props.lesson}</p>
        </div>
  );
}
export default LessonHeader;

