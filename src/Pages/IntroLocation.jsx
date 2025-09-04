import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import AnalysisHeading from "../Components/AnalysisHeading";
import RotatingSquares from "../Components/RotatingSquares";
import BackButton from "../Components/BackButton";
import SideButton from "../Components/SideButton";
import proceedIcon from "../Assets/Button-polygon.svg";

const IntroCity = () => {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLocation(e.target.value);
    setError(""); 
  };

  const isInvalid = (str) => /[^a-zA-Z\s]/.test(str);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && location.trim()) {
      const name = localStorage.getItem("userName") || "";
      if (isInvalid(name) || isInvalid(location.trim())) {
        setError(
          "Name and location must not contain numbers or special characters."
        );
        return;
      }
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, location: location.trim() }),
          }
        );
        const data = await response.json();
      } catch (error) {
        console.error("API error:", error);
      }
      setTimeout(() => {
        setLoading(false);
        setShowThankYou(true);
      }, 2000);
    }
  };

  const handleProceed = () => {
    navigate("/photo-upload");
  };

  return (
    <>
      <Nav logoType="locationintro" />
      <AnalysisHeading />
      <div className="intro__section">
        <RotatingSquares />
        {!loading && !showThankYou && (
          <>
            <h4 className="intro__prompt">CLICK TO TYPE</h4>
            <input
              className="name__input"
              type="text"
              placeholder="Where are you from?"
              value={location}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            {error && (
              <p style={{ color: "red", marginTop: "12px" }}>{error}</p>
            )}
          </>
        )}
        {loading && (
          <>
            <h4 className="proccessing">Processing Submission</h4>
            <div className="loading__bubbles">
              <div className="loading__bubble"></div>
              <div className="loading__bubble"></div>
              <div className="loading__bubble"></div>
            </div>
          </>
        )}
        {showThankYou && (
          <>
            <h4 className="proccessing">Thank you!</h4>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 400,
                opacity: 0.7,
                marginBottom: "32px",
              }}
            >
              Proceed to the next step
            </p>
            <div style={{ position: "absolute", bottom: -93, right: 20 }}>
              <SideButton
                label="PROCEED"
                icon={proceedIcon}
                onClick={handleProceed}
              />
            </div>
          </>
        )}
      </div>
      <BackButton />
    </>
  );
};

export default IntroCity;
