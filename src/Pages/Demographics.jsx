import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../Components/Nav";
import RacePercentage from "../Components/RacePercentage";
import SelectableBox from "../Components/SelectableBox";
import BackButton from "../Components/BackButton";

const demoboxes = [
  {
    title: "EAST ASIAN",
    label: "RACE",
  },
  {
    title: "20-29",
    label: "AGE",
  },
  {
    title: "FEMALE",
    label: "SEX",
  },
];

const getDynamicItems = (key, fallback) => {
  const stored = localStorage.getItem(key);
  try {
    const parsed = stored ? JSON.parse(stored) : fallback;
    return Array.isArray(parsed) &&
      parsed.length > 0 &&
      parsed[0].label &&
      parsed[0].confidence
      ? parsed
      : fallback;
  } catch {
    return fallback;
  }
};

// Example: get items from localStorage and sort by confidence descending
const getSortedItems = (key) => {
  const items = JSON.parse(localStorage.getItem(key) || "[]");
  return items.sort((a, b) => {
    // Remove % and compare as numbers
    const aVal = parseFloat(a.confidence.replace("%", ""));
    const bVal = parseFloat(b.confidence.replace("%", ""));
    return bVal - aVal;
  });
};

const Demographics = () => {
  const location = useLocation();

  const [selectedBox, setSelectedBox] = useState(0);
  const [selectedIndexes, setSelectedIndexes] = useState([0, 0, 0]); // [race, age, sex]

  const raceItems =
    location.state?.raceItems &&
    Array.isArray(location.state.raceItems) &&
    location.state.raceItems.length > 0
      ? location.state.raceItems
      : getSortedItems("dynamicRaceItems");
  const ageItems =
    location.state?.ageItems &&
    Array.isArray(location.state.ageItems) &&
    location.state.ageItems.length > 0
      ? location.state.ageItems
      : getSortedItems("dynamicAgeItems");
  const sexItems =
    location.state?.sexItems &&
    Array.isArray(location.state.sexItems) &&
    location.state.sexItems.length > 0
      ? location.state.sexItems
      : getSortedItems("dynamicSexItems");

  const items =
    selectedBox === 1 ? ageItems : selectedBox === 2 ? sexItems : raceItems;
  const safeSelectedIndex = Math.min(
    selectedIndexes[selectedBox],
    items.length - 1
  );

  const confidenceStr = items[safeSelectedIndex]?.confidence || "0%";
  const confidenceValue = parseInt(confidenceStr.replace("%", ""), 10);

  if (!items || items.length === 0) {
    return (
      <>
        <Nav logoType="analysis" />
        <div className="demographics__header">
          <span className="ai__label">A.I. ANALYSIS</span>
          <h1 className="demographics__title">DEMOGRAPHICS</h1>
          <span className="demographics__subtitle">No data available</span>
        </div>
        <BackButton className="demographics__back-button" showButton={true} />
      </>
    );
  }

  return (
    <>
      <Nav logoType="analysis" />
      <div className="demographics__header">
        <span className="ai__label">A.I. ANALYSIS</span>
        <h1 className="demographics__title">DEMOGRAPHICS</h1>
        <span className="demographics__subtitle">PREDICTED RACE & AGE</span>
      </div>
      <div className="demographics__container">
        <div className="demographic__selection">
          <div className="demo__selector">
            {demoboxes.map((box, idx) => (
              <SelectableBox
                key={box.label}
                selected={selectedBox === idx}
                onClick={() => setSelectedBox(idx)}
                className="demo__box"
              >
                <div className="race__selected--title">
                  <span>
                    {
                      (idx === 0 ? raceItems : idx === 1 ? ageItems : sexItems)[
                        selectedIndexes[idx]
                      ]?.label
                    }
                  </span>
                </div>
                <div className="selected__title">
                  <span>{box.label}</span>
                </div>
              </SelectableBox>
            ))}
          </div>
          <div className="demographic__display">
            <h2 className="demo__display--title">
              {items[safeSelectedIndex]?.label
                ? selectedBox === 1
                  ? `${items[safeSelectedIndex].label} y.o.`
                  : items[safeSelectedIndex].label
                : ""}
            </h2>
            <span
              className="demo__display--percentage"
              style={{ "--percent": confidenceValue }}
            >
              <span className="demo__display--percentage-value">
                {confidenceStr}
              </span>
            </span>
          </div>
          <div className="demographic__confidence">
            <div className="demo__confidence--heading">
              <h2 className="confidence__subject">
                {selectedBox === 1 ? "AGE" : selectedBox === 2 ? "SEX" : "RACE"}
              </h2>
              <h2 className="confidence__title">A.I. CONFIDENCE</h2>
            </div>
            <RacePercentage
              items={items}
              selectedIndex={safeSelectedIndex}
              onSelect={(idx) => {
                setSelectedIndexes((prev) => {
                  const updated = [...prev];
                  updated[selectedBox] = idx;
                  return updated;
                });
              }}
            />
          </div>
        </div>
      </div>
      <BackButton
        className="demographics__back-button"
        showButton={true}
        showParagraph={true}
      />
    </>
  );
};

export default Demographics;
