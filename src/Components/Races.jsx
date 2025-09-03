import React from "react";

const Races = ({ items }) => (
  <ul className="demo__confidence--list">
    {items.map((item, idx) => (
      <li key={item.label} className="demo__races">
        <span className="race__title">{item.label}</span>
        <span className="race__confidence">{item.confidence}</span>
      </li>
    ))}
  </ul>
);

export default Races;
