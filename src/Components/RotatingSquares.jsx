import React from "react";
import squareBox from "../Assets/Squarebox.svg";

const RotatingSquares = ({ variant = "" }) => {
  return (
    <>
      <img
        className={`square__one${variant ? " " + variant + "__one" : ""}`}
        src={squareBox}
        alt=""
      />
      <img
        className={`square__two${variant ? " " + variant + "__two" : ""}`}
        src={squareBox}
        alt=""
      />
      <img
        className={`square__three${variant ? " " + variant + "__three" : ""}`}
        src={squareBox}
        alt=""
      />
    </>
  );
};

export default RotatingSquares;
