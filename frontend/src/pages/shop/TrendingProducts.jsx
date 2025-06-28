// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import ProductCards from "./ProductCards";
import axios from "axios";
import staticProducts from "../../data/products.json";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products"); // adapte si ton backend est ailleurs

        const combinedProducts = [...res.data.products, ...staticProducts];
        setProducts(combinedProducts);
      } catch (error) {
        console.error("Erreur de chargement des produits :", error);
        setProducts(staticProducts); // fallback si backend échoue
      }
    };

    fetchProducts();
  }, []);

  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };

  return (
    <section className="section__container product__container">
      <div className="best">
        <h2 className="section__header">Best selling</h2>
        <p className="section__subheader mb-12">
          Top choice for unique and personalized gifts, designed to impress and
          last.
        </p>
      </div>
      <div>
        <ProductCards products={products.slice(0, visibleProducts)} />
      </div>

      <div className="product__btn">
        {visibleProducts < products.length && (
          <button className="btn btt mrgT" onClick={loadMoreProducts}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
