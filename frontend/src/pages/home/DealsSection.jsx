// eslint-disable-next-line no-unused-vars
import React from "react";
import reskey from "../../assets/res.png";
const DealsSection = () => {
  return (
    <section className="section__container deals__container">
      <div className="deals__image">
        <img src={reskey} alt="" />
      </div>
      <div className="deals__content">
        <h4 className="">Exclusive Offer</h4>
        <h5>
          Get your personalized Resin Letter Keychain at a special price –
          limited time only!
        </h5>
        <div className="deals__countdown flex-wrap">
          <div className="deals__countdown__card">
            <h4>14</h4>
            <p>Days</p>
          </div>
          <div className="deals__countdown__card">
            <h4>20</h4>
            <p>Hours</p>
          </div>
          <div className="deals__countdown__card">
            <h4>05</h4>
            <p>Mins</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
