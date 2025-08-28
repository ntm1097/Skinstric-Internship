import React from "react";
import locationLogo from "../Assets/location.svg"
import { Link } from "react-router-dom";


const Nav = ({ showButton = false }) => {
  return (
    <nav>
      <div className="main__bar">
        <Link to="/">
          <h1 className="company__name">
            SKINSTRIC
          </h1>
        </Link>
        <figure className="location__logo">
          <img src={locationLogo} alt="Location" />
        </figure>
      </div>
      <div className="discount__code">
       {showButton && <button className="btn">ENTER CODE</button>}
      </div>
    </nav>
  );
};

export default Nav;
