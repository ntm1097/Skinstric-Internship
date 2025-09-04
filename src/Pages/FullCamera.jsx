import React, { useEffect, useRef, useState } from "react";
import CamerLogo from "../Assets/Camera Logo.svg";
import LocationLogo from "../Assets/location camera.svg";
import BackButton from "../Components/BackButton";
import SideButton from "../Components/SideButton";
import proceedIcon from "../Assets/Button-polygon.svg";
import BetterResults from "../Components/BetterResults";
import Nav from "../Components/Nav";
import PhotoAnalizing from "../Pages/PhotoAnalizing";
import { useNavigate } from "react-router-dom";
import PhotoUpload from "./PhotoUpload";

const FullCamera = () => {
  const [isAnalysing, setIsAnalysing] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const analyzeImageAndNavigate = async (base64Image) => {
    setIsAnalysing(true);
    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Image }),
        }
      );

      const rawText = await response.text();
      let apiResponse;
      try {
        apiResponse = JSON.parse(rawText);
      } catch (jsonErr) {
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
      setIsAnalysing(false);
    }
  };

  useEffect(() => {
    let stream;
    const getCamera = async () => {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };
    getCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleProceed = async () => {
    if (capturedImage) {
      await analyzeImageAndNavigate(capturedImage);
    }
  };

  if (isAnalysing) {
    return <PhotoAnalizing />;
  }

  return (
    <>
      {!capturedImage ? (
        <Nav className="full__camera" logoType="default" />
      ) : (
        <Nav className="full__camera" logoType="analysis" />
      )}
      <div className="camera__section">
        {!capturedImage && (
          <button className="camera__bar" onClick={handleCapture}>
            <span className="camera__button--text">TAKE PICTURE</span>
            <img className="camera__logo--img" src={CamerLogo} alt="" />
          </button>
        )}
      </div>
      <div className="full-camera__container">
        {!capturedImage ? (
          <>
            <video ref={videoRef} autoPlay className="full-camera__video" />
            <BackButton className="photo__back--button" />
          </>
        ) : (
          <>
            <img
              src={capturedImage}
              alt="Captured"
              className="full-camera__video"
              style={{ objectFit: "cover" }}
            />
            <div className="captured__text">GREAT SHOT!</div>
            <div className="camera__buttons--after">
              <BackButton className="fullcamera__back--button" />
              <SideButton
                label="Proceed"
                icon={proceedIcon}
                onClick={handleProceed}
                className="fullcamera__proceed--button"
              />
            </div>
          </>
        )}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
      <BetterResults />
    </>
  );
};

export default FullCamera;
