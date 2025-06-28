// eslint-disable-next-line no-unused-vars
import React from "react";
import res2 from "../../assets/ecc1.jpg";
import res3 from "../../assets/res3.jpg";
import res4 from "../../assets/fleurs3.jpg";
import res1 from "../../assets/ele2.jpg";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    { name: "Electronics", path: "Electronics", image: res1 },
    { name: "Accessories", path: "Accessories", image: res2 },
    { name: "Resin", path: "Resin", image: res3 },
    { name: "flower", path: "flower", image: res4 },
  ];
  return (
    <div className="product__grid">
      {categories.map((category) => (
        <Link
          key={category.name}
          to={`/categories/${category.path}`}
          className="categories__card"
        >
          <img src={category.image} alt={category.name} />
          <h4>{category.name}</h4>
        </Link>
      ))}
    </div>
  );
};
export default Categories;
