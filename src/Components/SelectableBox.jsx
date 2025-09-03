import React from "react";

const SelectableBox = ({
  selected,
  onClick,
  children,
  className = "",
  ...props
}) => (
  <div
    className={`${className} selectable-box${
      selected ? " selectable-box--selected" : ""
    }`}
    onClick={onClick}
    {...props}
  >
    {children}
  </div>
);

export default SelectableBox;
