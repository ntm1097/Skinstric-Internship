import React from "react";
import backArrow from "../Assets/Left button polygon.svg";
import { useNavigate } from "react-router-dom";

const BackButton = ({ className = "", ...props }) => {
  const navigate = useNavigate();

  return (
    <div className={`back__arrow ${className}`} {...props}>
      <button
        className="back__arrow--img"
        onClick={() => navigate(-1)}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
        aria-label="Go back"
      >
        <img src={backArrow} alt="" />
      </button>
      <h2 className="back__text">Back</h2>
    </div>
  );
};

export default BackButton;
