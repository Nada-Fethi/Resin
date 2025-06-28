// eslint-disable-next-line no-unused-vars
import React from "react";
import about from "../assets/About.jpg";

const Pages = () => {
  return (
    <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize ">About Us</h2>
      <div className="about-content">
        <div className="about-image-wrapper ">
          <img
            src={about}
            alt="Our Workshop"
            className="about-image"
          />
        </div>
        <div className="about-text">
          <p>
            Welcome to <span className="highlight">Resin Artistry</span>, where every piece of jewelry tells a story. Founded in 2022 by two passionate artists, our mission is to bring beauty, color, and creativity into your everyday life.
          </p>
          <p>
            In our cozy workshop, we experiment with natural elements—flowers, pigments, metallic flakes—and encapsulate them in high-quality resin. Each item is handcrafted with love, ensuring you receive a unique treasure.
          </p>
          <p>
            Thank you for being part of our journey. We hope our creations inspire you as much as they inspire us.
          </p>
        </div>
      </div>
  <div className="text-xl py-4 ms-5 flex flex-col md:flex-row text-sm mb-20 about-content 
 ">
      <h2 className="section__header capitalize mb-12">WHY CHOOSE US</h2>
      </div>
<div className=" flex flex-col md:flex-row text-sm mb-20">
<div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5"> 
        <b className="margen">Quality Assurance:</b>
        <p className=" margen text-gray-600">At the heart of everything we do is an unwavering commitment to quality.
           We ensure that every product and service we offer meets the highest standards through rigorous testing, continuous improvement, and attention to detail.
            With our expert team and reliable processes, you can trust us to deliver excellence—every time.</p>
      </div>

      <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5"> 
        <b className="margen">Convenience:</b>
        <p className=" margen text-gray-600">We make your experience seamless and stress-free. From intuitive navigation to quick checkout and fast delivery, everything is designed with your comfort in mind. Whether you're shopping from home or on the go, our platform ensures a smooth, hassle-free journey every step of the way.</p>
      </div>

      <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5"> 
        <b className="margen">Exceptional Customer Service:</b>
        <p className="margen text-gray-600">We're here for you—always. Our dedicated support team is ready to assist with any questions or concerns, ensuring you feel valued and heard. Whether it's before, during, or after your purchase, we go the extra mile to provide fast, friendly, and effective service that exceeds expectations.</p>
        <div className="margen"></div>
      </div>
      </div>
    </section>

  );
};

export default Pages;
