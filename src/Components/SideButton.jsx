import React from "react";

const SideButton = ({ className = "", icon, label, onClick, ...props }) => (
  <div className={`proceed__arrow ${className}`} onClick={onClick} {...props}>
    {icon && <img className="proceed__arrow--img" src={icon} alt="" />}
    <span className="proceed__text">{label}</span>
  </div>
);
export default SideButton;
