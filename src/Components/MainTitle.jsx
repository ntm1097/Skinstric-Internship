import React, { useRef, useState, useEffect } from "react";
import Footer from "./Footer";
import LeftRectangle from "../Assets/Left Rectangle 2779.png";
import RightRectangle from "../Assets/RectangleRight.svg";
import ButtonPolygon from "../Assets/Button-polygon.svg";
import LeftButtonPolygon from "../Assets/Left button polygon.svg";
import { gsap } from "gsap";
import ButtonBorder from "./ButtonBorder";
import { Link } from "react-router-dom";

const MainTitle = () => {
  const skincareRef = useRef(null);
  const mainTitleRef = useRef(null);
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);
  const leftRectRef = useRef(null);
  const rightRectRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const leftRect2Ref = useRef(null);
  const leftRect3Ref = useRef(null);
  const rightRect2Ref = useRef(null);
  const rightRect3Ref = useRef(null);
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);

  const movement = useRef({
    leftX: 250,
    rightX: -325,
    leftSkincareX: 160,
    rightSkincareX: -160,
  });

  useEffect(() => {
    gsap.fromTo(
      [mainTitleRef.current, skincareRef.current],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.5, stagger: 0.5, ease: "power2.out" }
    );

    // Responsive GSAP matchMedia for side-to-side movement
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1200px)", () => {
      movement.current = {
        leftX: 250,
        rightX: -325,
        leftSkincareX: 160,
        rightSkincareX: -160,
      };
    });

    mm.add("(max-width: 1199px)", () => {
      movement.current = {
        leftX: 0,
        rightX: 0,
        leftSkincareX: 0,
        rightSkincareX: 0,
      };
    });

    return () => mm.kill();
  }, []);

  const handleRightHover = () => {
    setRightHovered(true);
    gsap.to(mainTitleRef.current, {
      x: movement.current.rightX,
      duration: 1,
      ease: "power2.out",
    });
    gsap.to(skincareRef.current, {
      x: movement.current.rightSkincareX,
      duration: 1,
      ease: "power2.out",
    });
    gsap.to(leftButtonRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(leftRectRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(leftTextRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(leftRect2Ref.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(leftRect3Ref.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(rightRect2Ref.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(rightRect3Ref.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleRightLeave = () => {
    setRightHovered(false);
    gsap.to(mainTitleRef.current, { x: 0, duration: 0.8, ease: "power2.out" });
    gsap.to(skincareRef.current, { x: 0, duration: 1, ease: "power2.out" });
    gsap.to(leftButtonRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(leftRectRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(leftTextRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(leftRect2Ref.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(leftRect3Ref.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(rightRect2Ref.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(rightRect3Ref.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleLeftHover = () => {
    setLeftHovered(true);
    gsap.to(mainTitleRef.current, {
      x: movement.current.leftX,
      duration: 1,
      ease: "power2.out",
    });
    gsap.to(skincareRef.current, {
      x: movement.current.leftSkincareX,
      duration: 1,
      ease: "power2.out",
    });
    gsap.to(rightButtonRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(rightRectRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(rightTextRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(rightRect2Ref.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(rightRect3Ref.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(leftRect2Ref.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(leftRect3Ref.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleLeftLeave = () => {
    setLeftHovered(false);
    gsap.to(mainTitleRef.current, { x: 0, duration: 0.8, ease: "power2.out" });
    gsap.to(skincareRef.current, { x: 0, duration: 1, ease: "power2.out" });
    gsap.to(rightButtonRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(rightRectRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(rightTextRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(leftRect2Ref.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(leftRect3Ref.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(rightRect2Ref.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(rightRect3Ref.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <>
      <div className="main-bar">
        <div className="arrow arrow__left">
          <span ref={leftTextRef}>DISCOVER A.I.</span>
          <div style={{ position: "relative", display: "inline-block" }}>
            <button
              className="buttons"
              ref={leftButtonRef}
              onMouseEnter={handleLeftHover}
              onMouseLeave={handleLeftLeave}
            >
              <img className="left__button" src={LeftButtonPolygon} alt="" />
            </button>
            <ButtonBorder visible={leftHovered} />
          </div>
        </div>
        <div className="main-title" ref={mainTitleRef}>
          <h2 className="main__title">Sophisticated</h2>
          <h2 className="main__title" ref={skincareRef}>
            skincare
          </h2>
        </div>
        <div className="arrow arrow__right">
          <span ref={rightTextRef}>TAKE TEST</span>
          <div style={{ position: "relative", display: "inline-block" }}>
            <Link to={"/intro"}>
              <button
                className="buttons"
                ref={rightButtonRef}
                onMouseEnter={handleRightHover}
                onMouseLeave={handleRightLeave}
              >
                <img className="button__img" src={ButtonPolygon} alt="" />
              </button>
            </Link>
            <ButtonBorder visible={rightHovered} />
          </div>
        </div>
        <figure className="left__rectangle" ref={leftRectRef}>
          <img className="rectangle__img" src={LeftRectangle} alt="" />
        </figure>
        <figure
          className="left__rectangle left__rectangle--two"
          ref={leftRect2Ref}
        >
          <img className="rectangle__img" src={LeftRectangle} alt="" />
        </figure>
        <figure
          className="left__rectangle left__rectangle--three"
          ref={leftRect3Ref}
        >
          <img className="rectangle__img" src={LeftRectangle} alt="" />
        </figure>
        <figure className="right__rectangle" ref={rightRectRef}>
          <img className="rectangle__img" src={RightRectangle} alt="" />
        </figure>
        <figure
          className="right__rectangle right__rectangle--two"
          ref={rightRect2Ref}
        >
          <img className="rectangle__img" src={RightRectangle} alt="" />
        </figure>
        <figure
          className="right__rectangle right__rectangle--three"
          ref={rightRect3Ref}
        >
          <img className="rectangle__img" src={RightRectangle} alt="" />
        </figure>
      </div>
      <Footer />
    </>
  );
};

export default MainTitle;
