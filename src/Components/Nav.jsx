import React from "react";
import locationIntro from "../Assets/location.svg";
import LocationAnalysis from "../Assets/location-analysis.svg";
import LocationLogo from "../Assets/location camera.svg";
import { Link } from "react-router-dom";

const Nav = ({ showButton = false, logoType = "default", className }) => {
  let logoSrc;
  switch (logoType) {
    case "analysis":
      logoSrc = LocationAnalysis;
      break;
    case "locationintro":
      logoSrc = locationIntro;
      break;
    default:
      logoSrc = LocationLogo;
  }

  return (
    <nav className={className}>
      <div className="main__bar">
        <Link to="/">
          <h1 className="company__name">SKINSTRIC</h1>
        </Link>
        <figure className="location__logo">
          <img src={logoSrc} alt="Location" />
        </figure>
      </div>
      <div className="discount__code">
        {showButton && <button className="btn">ENTER CODE</button>}
      </div>
    </nav>
  );
};

export default Nav;
