import React from "react";

const RacePercentage = ({ items, selectedIndex, onSelect }) => {
  return (
    <ul className="demo__confidence--list">
      {items.map((item, idx) => (
        <li
          key={item.label}
          className={`demo__races selectable-box${
            selectedIndex === idx ? " selectable-box--selected" : ""
          }`}
          onClick={() => onSelect(idx)}
          tabIndex={0}
          role="button"
          aria-pressed={selectedIndex === idx}
        >
          <span className="race__title">{item.label}</span>
          <span className="race__confidence">{item.confidence}</span>
        </li>
      ))}
    </ul>
  );
};

export default RacePercentage;
