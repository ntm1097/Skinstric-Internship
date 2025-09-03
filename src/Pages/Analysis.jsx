import React from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import RotatingSquares from "../Components/RotatingSquares";
import BackButton from "../Components/BackButton";
import SideButton from "../Components/SideButton"; // import SideButton
import proceedIcon from "../Assets/Button-polygon.svg"; // or use your summary icon if different

const Analysis = () => {
  const navigate = useNavigate();

  return (
    <>
      <Nav logoType="analysis" />
      <div className="analysis__header">
        <h1 className="analysis__title">A.I. ANALYSIS</h1>
        <p className="analysis__para">
          A.I. HAS ESTIMATED THE FOLLOWING. <br /> FIX ESTIMATED INFORMATION IF
          NEEDED.{" "}
        </p>
      </div>
      <div className="analysis__container">
        <RotatingSquares />
        <div className="demo__squares-group">
          <div
            className="demo__square"
            onClick={() => navigate("/demographics")}
            style={{ cursor: "pointer" }}
          >
            <span className="demo__title">DEMOGRAPHICS</span>
          </div>
          <div className="demo__square">
            <span className="skin__title">SKIN TYPE DETAIL</span>
          </div>
          <div className="demo__square">
            <span className="cosmetic__title">COSMETIC CONCERNS</span>
          </div>
          <div className="demo__square">
            <span className="weather__title">WEATHER</span>
          </div>
        </div>
        <BackButton className="analysis__back--button" />
        <SideButton
          label="GET SUMMARY"
          icon={proceedIcon}
          className="analysis__summary--button"
          onClick={() => navigate("/demographics")}
        />
      </div>
    </>
  );
};

export default Analysis;
