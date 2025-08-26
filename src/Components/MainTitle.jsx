import React from "react";
import Footer from "./Footer";
import LeftRectangle from "../Assets/Left Rectangle 2779.png";
import RightRectangle from "../Assets/RectangleRight.svg";
import ButtonPolygon from "../Assets/Button-polygon.svg"
import LeftButtonPolygon from "../Assets/Left button polygon.svg"


const MainTitle = () => {
  return (
    <>
      <div className="main-bar">
        <div className="arrow arrow__left">
            DISCOVER A.I.
        <button className="buttons">
          <img className="left__button" src={LeftButtonPolygon} alt="" />
        </button>
        </div>
        <div className="main-title">
          <h2 className="main__title">Sophisticated</h2>
          <h2 className="main__title">skincare</h2>
        </div>
        <div className=" arrow arrow__right">
            TAKE TEST
        <button className="buttons">
          <img className="button__img" src={ButtonPolygon} alt="" />
        </button>
        </div>
        <figure className="left__rectangle">
          <img className="rectangle__img" src={LeftRectangle} alt="" />
        </figure>
        <figure className="right__rectangle">
          <img className="rectangle__img" src={RightRectangle} alt="" />
        </figure>
      </div>
      <Footer />
    </>
  );
};

export default MainTitle;
