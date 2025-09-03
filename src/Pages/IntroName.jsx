import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import AnalysisHeading from "../Components/AnalysisHeading";
import RotatingSquares from "../Components/RotatingSquares";
import BackButton from "../Components/BackButton";

const Intro = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setName(e.target.value);
    setError(""); // Clear error on change
  };

  const isInvalid = (str) => /[^a-zA-Z\s]/.test(str);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && name.trim()) {
      if (isInvalid(name.trim())) {
        setError("Name must not contain numbers or special characters.");
        return;
      }
      localStorage.setItem("userName", name.trim());
      navigate("/intro-location");
    }
  };

  return (
    <>
      <Nav logoType="locationintro" />
      <AnalysisHeading />
      <div className="intro__section">
        <RotatingSquares />
        <h4 className="intro__prompt">CLICK TO TYPE</h4>
        <input
          className="name__input"
          type="text"
          placeholder="Introduce Yourself"
          value={name}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {error && <p style={{ color: "red", marginTop: "12px" }}>{error}</p>}
      </div>
      <BackButton />
    </>
  );
};

export default Intro;
