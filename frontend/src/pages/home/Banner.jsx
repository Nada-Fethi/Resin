// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import girlimg from "../../assets/girl.png";
const Banner = () => {
  return (
    <div className="section__container header__container">
      <div className="header__content z-30">
        <h1 className="h1">From Gadgets to Handcrafted Wonders</h1>
        <p>
        Shining, vibrant, and made just for you. Whether it's tech, accessories, resin art, or flowers, each piece is crafted to match your unique style or make the perfect gift.</p>
        <button className="btn">
          <Link to="/shop" className="btn">
            Explore now
          </Link>
        </button>
      </div>
      <div className="header__image">
        <img src={girlimg} />
      </div>
    </div>
  );
};

export default Banner;
