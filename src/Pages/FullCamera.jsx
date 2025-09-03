import React, { useEffect, useRef, useState } from "react";
import CamerLogo from "../Assets/Camera Logo.svg";
import LocationLogo from "../Assets/location camera.svg";
import BackButton from "../Components/BackButton";
import SideButton from "../Components/SideButton";
import proceedIcon from "../Assets/Button-polygon.svg";
import BetterResults from "../Components/BetterResults";
import Nav from "../Components/Nav";

const FullCamera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

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

  const handleProceed = () => {};

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
