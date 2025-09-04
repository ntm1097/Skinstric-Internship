import React from "react";

const BetterResults = ({ variant }) => (
  <>
    <div className={`photo__instructions${variant ? ` ${variant}` : ""}`}>
      <h2 className="photo__instructions--title">
        TO GET BETTER RESULTS MAKE SURE TO HAVE
      </h2>
      <ul className="photo__instructions--lists">
        <li className="photo__instructions--item">A NEUTRAL EXPRESSION</li>
        <li className="photo__instructions--item">FRONTAL POSE</li>
        <li className="photo__instructions--item">ADEQUATE LIGHTING</li>
      </ul>
    </div>
  </>
);

export default BetterResults;
