import React from "react";
import backArrow from "../Assets/Left button polygon.svg";
import { useNavigate } from "react-router-dom";

const BackButton = ({
  showParagraph = false,
  showButton = false,
  className = "",
  ...props
}) => {
  const navigate = useNavigate();

  const handleConfirmClick = () => {
    alert("Sorry, this feature hasn't been implemented yet");
  };

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
      <h2 className="back__text">BACK</h2>
      {showParagraph && (
        <p className="back__text--paragraph">
          If A.I. estimate is wrong, select the correct one.
        </p>
      )}
      <div className="additional__buttons">
        {showButton && <button className="reset__button">RESET</button>}
        {showButton && (
          <button className="confirm__button" onClick={handleConfirmClick}>
            CONFIRM
          </button>
        )}
      </div>
    </div>
  );
};

export default BackButton;
