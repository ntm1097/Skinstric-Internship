import React, { useState } from "react";
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

const raceItems = [
  { label: "East Asian", confidence: "96%" },
  { label: "White", confidence: "80%" },
  { label: "Black", confidence: "45%" },
  { label: "South Asian", confidence: "45%" },
  { label: "Latino Hispanic", confidence: "45%" },
  { label: "South East Asian", confidence: "45%" },
  { label: "Middle Eastern", confidence: "45%" },
];

const ageItems = [
  { label: "0-9", confidence: "12%" },
  { label: "10-19", confidence: "56%" },
  { label: "20-29", confidence: "22%" },
  { label: "30-39", confidence: "10%" },
  { label: "40-49", confidence: "5%" },
  { label: "50-59", confidence: "10%" },
  { label: "60-69", confidence: "8%" },
  { label: "70+", confidence: "0%" },
];

const sexItems = [
  { label: "Male", confidence: "40%" },
  { label: "Female", confidence: "60%" },
];

const Demographics = () => {
  const [selectedBox, setSelectedBox] = useState(0);
  const [selectedRace, setSelectedRace] = useState(0);

  const items =
    selectedBox === 1 ? ageItems : selectedBox === 2 ? sexItems : raceItems;

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
                onClick={() => {
                  setSelectedBox(idx);
                  setSelectedRace(0);
                }}
                className="demo__box"
              >
                <div className="race__selected--title">
                  <span>{box.title}</span>
                </div>
                <div className="selected__title">
                  <span>{box.label}</span>
                </div>
              </SelectableBox>
            ))}
          </div>
          <div className="demographic__display">
            <h2 className="demo__display--title">
              {selectedBox === 1
                ? `${items[selectedRace].label} y.o.` // Custom age display format
                : items[selectedRace].label}
            </h2>
            <span className="demo__display--percentage">
              <span className="demo__display--percentage-value">
                {items[selectedRace].confidence}
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
              selectedIndex={selectedRace}
              onSelect={setSelectedRace}
            />
          </div>
        </div>
      </div>
      <BackButton className="demographics__back-button" showButton={true} />
    </>
  );
};

export default Demographics;
