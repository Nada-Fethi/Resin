// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import ProductCards from "../shop/ProductCards";
import productsData from "../../data/products.json";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();

    const filtered = productsData.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);
  };

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Search Products</h2>
      </section>
      <section className="section__container bg-primary-light ">
        <div className="searchs-bt">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar searchs"
            placeholder="Search for products..."
          />
          <button onClick={handleSearch} className="search-button element btn">
            Search
          </button>
        </div>
        <ProductCards products={filteredProducts} />
      </section>
    </>
  );
};

export default Search;
