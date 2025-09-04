import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import AnalysisHeading from "../Components/AnalysisHeading";
import RotatingSquares from "../Components/RotatingSquares";
import BackButton from "../Components/BackButton";
import PhotoScan from "../Assets/camera-svg.svg";
import photoUpload from "../Assets/gallery-svg.svg";
import PinArrow from "../Assets/pin line.svg";
import PhotoAnalizing from "../Pages/PhotoAnalizing";
import CameraSetup from "./CameraSetup";

const PhotoUpload = () => {
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [showCameraSetup, setShowCameraSetup] = useState(false);
  const navigate = useNavigate();

  const API_ENDPOINT =
    "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

  const handleScanFaceClick = () => {
    setShowPermissionPrompt(true);
    setCameraError("");
  };

  const handleGrantPermission = async () => {
    setCameraError("");
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setShowPermissionPrompt(false);
      setShowCameraSetup(true);
      setTimeout(() => {
        setShowCameraSetup(false);
        navigate("/full-camera");
      }, 2000);
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

  const analyzeImageAndNavigate = async (base64Image) => {
    setIsAnalysing(true);
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      });

      const rawText = await response.text();
      let apiResponse;
      try {
        apiResponse = JSON.parse(rawText);
      } catch (jsonErr) {
        setCameraError("API returned invalid JSON.");
        setIsAnalysing(false);
        return;
      }

      const { data } = apiResponse;
      const toPercent = (val) => `${Math.round(Number(val) * 100)}%`;

      const raceItems =
        data?.race && typeof data.race === "object" && !Array.isArray(data.race)
          ? Object.entries(data.race).map(([label, value]) => ({
              label: label
                .replace(/_/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase()),
              confidence: toPercent(value),
            }))
          : [];
      const ageItems =
        data?.age && typeof data.age === "object" && !Array.isArray(data.age)
          ? Object.entries(data.age).map(([label, value]) => ({
              label,
              confidence: toPercent(value),
            }))
          : [];
      const sexItems =
        data?.gender &&
        typeof data.gender === "object" &&
        !Array.isArray(data.gender)
          ? Object.entries(data.gender).map(([label, value]) => ({
              label: label.charAt(0).toUpperCase() + label.slice(1),
              confidence: toPercent(value),
            }))
          : [];

      localStorage.setItem("dynamicRaceItems", JSON.stringify(raceItems));
      localStorage.setItem("dynamicAgeItems", JSON.stringify(ageItems));
      localStorage.setItem("dynamicSexItems", JSON.stringify(sexItems));

      setTimeout(() => {
        setIsAnalysing(false);
        navigate("/analysis"); // changed from "/demographics"
      }, 3000);
    } catch (err) {
      setCameraError("Failed to analyze image.");
      setIsAnalysing(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Image = event.target.result.split(",")[1];
        await analyzeImageAndNavigate(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isAnalysing) {
    return <PhotoAnalizing />;
  }

  if (showCameraSetup) {
    return <CameraSetup />;
  }

  return (
    <>
      <Nav logoType="locationintro" showButton={false} />
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
