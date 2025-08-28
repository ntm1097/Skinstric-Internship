import React from "react";
import locationLogo from "../Assets/location.svg"
<<<<<<< HEAD
import { Link } from "react-router-dom";


const Nav = ({ showButton = false }) => {
  return (
    <nav>
      <div className="main__bar">
        <Link to="/">
          <h1 className="company__name">
            SKINSTRIC
          </h1>
        </Link>
=======


const Nav = () => {
  return (
    <nav>
      <div className="main__bar">
        <h1 className="company__name">
          SKINSTRIC
        </h1>
>>>>>>> 9ab84175fa962b5d24209adcd4fea94683e938ae
        <figure className="location__logo">
          <img src={locationLogo} alt="Location" />
        </figure>
      </div>
      <div className="discount__code">
<<<<<<< HEAD
       {showButton && <button className="btn">ENTER CODE</button>}
=======
       <button className="btn">ENTER CODE</button>
>>>>>>> 9ab84175fa962b5d24209adcd4fea94683e938ae
      </div>
    </nav>
  );
};

export default Nav;
