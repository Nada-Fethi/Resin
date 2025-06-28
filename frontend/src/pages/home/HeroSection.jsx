// eslint-disable-next-line no-unused-vars
import React from "react";
import reskey1 from "../../assets/flower.jpg";
import reskey2 from "../../assets/ele2.jpg";
import reskey3 from "../../assets/flower.jpg";

const HeroSection = () => {
  const cards = [
    {
      id: 1,
      image: reskey1,
      trend: "2025 Trend",
      title: "girls 1",
    },
    {
      id: 2,
      image: reskey2,
      trend: "2025 Trend",
      title: "girls 2",
    },
    {
      id: 3,
      image: reskey3,
      trend: "2025 Trend",
      title: "girls 3",
    },
  ];
  return (
    <section className="section__container hero__container">
      {cards.map((card) => (
        <div key={card.id} className="hero__card">
          <img src={card.image} className="imgCard" />
          <div className="hero__content">
            <p>{card.trend} </p>
            <h4>{card.title} </h4>
            <a href="#">Discover More</a>
          </div>
        </div>
      ))}{" "}
    </section>
  );
};

export default HeroSection;
