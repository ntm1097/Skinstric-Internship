import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import AnalysisHeading from "../Components/AnalysisHeading";
import RotatingSquares from "../Components/RotatingSquares";
import BackButton from "../Components/BackButton";
import PhotoScan from "../Assets/camera-svg.svg";
import photoUpload from "../Assets/gallery-svg.svg";
import PinArrow from "../Assets/pin line.svg";

const PhotoUpload = () => {
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);
  const navigate = useNavigate();

  const handleScanFaceClick = () => {
    setShowPermissionPrompt(true);
    setCameraError("");
  };

  const handleGrantPermission = async () => {
    setCameraError("");
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setShowPermissionPrompt(false);
      setCameraActive(false);
      navigate("/full-camera");
    } catch (err) {
      setCameraError("Camera access denied or not available.");
      setCameraActive(false);
      setShowPermissionPrompt(false);
    }
  };

  const handleGalleryClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        
        console.log("Selected image data URL:", event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Nav showButton={false} />
      <AnalysisHeading />
      {showPermissionPrompt && (
        <div className="camera__access__popup">
          <p className="camera__access__text">
            ALLOW A.I. TO ACCESS YOUR CAMERA
          </p>
          <div className="permission__buttons">
            <button
              className="camera-access__button"
              onClick={() => setShowPermissionPrompt(false)}
              style={{ marginLeft: "12px" }}
            >
              DENY
            </button>
            <button
              className="camera-access__button"
              onClick={handleGrantPermission}
            >
              ALLOW
            </button>
          </div>
        </div>
      )}
      <div className="photo__upload--section">
        <div className="AI__photo--section">
          <h4 className="photo__scan--title">
            ALLOW A.I. <br /> TO SCAN YOUR FACE
          </h4>
          <img className="pin__arrow--camera" src={PinArrow} alt="" />
          <img
            src={PhotoScan}
            alt=""
            className="photo__scan--img"
            onClick={handleScanFaceClick}
            style={{ cursor: "pointer" }}
          />
          {cameraError && (
            <p style={{ color: "red", marginTop: "12px" }}>{cameraError}</p>
          )}
          {cameraActive && (
            <video
              ref={videoRef}
              autoPlay
              style={{
                width: "320px",
                height: "240px",
                marginTop: "16px",
                borderRadius: "12px",
              }}
            />
          )}
          <RotatingSquares variant="AI__squares" />
        </div>
        <div
          className={`upload__local--section${
            showPermissionPrompt ? " upload__local--dimmed" : ""
          }`}
        >
          <h4 className="upload__title">
            ALLOW A.I. <br /> ACCESS TO YOUR GALLERY
          </h4>
          <img className="pin__arrow--local" src={PinArrow} alt="" />
          <img
            className="photo__upload--img"
            src={photoUpload}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={handleGalleryClick}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <RotatingSquares variant="local__squares" />
        </div>
      </div>
      <BackButton />
    </>
  );
};

export default PhotoUpload;
