// eslint-disable-next-line no-unused-vars
import React from "react";
import instaImg from "../assets/flower.jpg";
import instaImg1 from "../assets/flower.jpg";
import instaImg2 from "../assets/res3.jpg";
import instaImg3 from "../assets/flower.jpg";
import instaImg4 from "../assets/flower.jpg";
import instaImg5 from "../assets/res3.jpg";

const Footer = () => {
  return (
    <>
      <footer className="section__container footer__container">
        <div className="footer__col">
          <h4>CONTACT INFO</h4>
          <p>
            <span>
              <i className="ri-map-pin-2-fill"></i>
              Berkane, Morocco
            </span>
          </p>
          <p>
            <span>
              <i className="ri-mail-fill"></i> nada@gmail.com
            </span>
          </p>
          <p>
            <span>
              <i className="ri-phone-fill"></i>
              +212-695-907-975
            </span>
          </p>
        </div>

        <div className="footer__col">
          <h4>COMPANY</h4>
          <a href="/">Home</a>
          <a href="/About">About Us</a>
          <a href="/">Work with Us</a>
          <a href="/">Our Blogs</a>
          <a href="/">Trems & condition</a>
        </div>

        <div className="footer__col">
          <h4>USEFUL LINKS</h4>
          <a href="/">Crafting Tips</a>
          <a href="/">Shop Collection</a>
          <a href="/">Customer Care</a>
          <a href="/">Resin Tutorials</a>
          <a href="/">Shop Our Creations</a>
        </div>
        <div className="footer__col">
          <h4>INSTAGRAM</h4>
          <div className="instagram__grid">
            <img src={instaImg} alt="" />
            <img src={instaImg1} alt="" />
            <img src={instaImg2} alt="" />
            <img src={instaImg3} alt="" />
            <img src={instaImg4} alt="" />
            <img src={instaImg5} alt="" />
          </div>
        </div>
      </footer>

      <div className="footer__bar">
        Copyright © 2025 Web Design Mastery. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
