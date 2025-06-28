// eslint-disable-next-line no-unused-vars
import React from "react";

const PromoBanner = () => {
  return (
    <section className="section__container banner__container">
      <div className="banner__card">
        <span>
          <i className="ri-truck-line"></i>
        </span>
        <h4>Free Delivery</h4>
        <p>
          offers convenience and the ability to shop from anywhere, anytime.
        </p>
      </div>
      <div className="banner__card">
        <span>
          <i className="ri-money-dollar-circle-line"></i>{" "}
        </span>
        <h4>Exclusive Deals And Discounts</h4>
        <p>Save more with special offers and limited-time discounts.</p>
      </div>
      <div className="banner__card">
        <span>
          <i className="ri-user-voice-line"></i>{" "}
        </span>
        <h4> Reliable Customer Support</h4>
        <p>Need help? Our team is available anytime to assist you.</p>
      </div>
    </section>
  );
};

export default PromoBanner;
