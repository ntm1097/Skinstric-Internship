import React from "react";
import PhotoScan from "../Assets/camera-svg.svg";
import RotatingSquares from "../Components/RotatingSquares";
import BetterResults from "../Components/BetterResults";

const CameraSetup = () => {
  return (
    <>
      <div className="camera__setup">
        <RotatingSquares />
        <img className="camera__scan--img" src={PhotoScan} alt="" />
        <h2 className="camera__setup--title">SETTING UP CAMERA...</h2>
        <BetterResults variant="photo__instructions--black" />
      </div>
    </>
  );
};

export default CameraSetup;
