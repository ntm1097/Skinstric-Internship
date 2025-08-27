import React from "react";

const ButtonBorder = ({ visible }) => {
  return (
    <div
      className="button__border"
      style={{
        borderColor: visible ? "#000000ff" : "transparent",
        opacity: visible ? 0.5 : 0,
        transition: "border-color 0.4s, opacity 0.4s",
      }}
    ></div>
  );
};

export default ButtonBorder;
