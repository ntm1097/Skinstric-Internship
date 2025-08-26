import React from "react";
import locationLogo from "../Assets/location.svg"


const Nav = () => {
  return (
    <nav>
      <div className="main__bar">
        <h1 className="company__name">
          SKINSTRIC
        </h1>
        <figure className="location__logo">
          <img src={locationLogo} alt="Location" />
        </figure>
      </div>
      <div className="discount__code">
       <button className="btn">ENTER CODE</button>
      </div>
    </nav>
  );
};

export default Nav;
