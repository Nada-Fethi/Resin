// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import productsData from "../../data/products.json";
import ProductCards from "./ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const filters = {
  categories: ["all", "electronics", "accessories", "flower", "resin"],
  colors: ["all", "black", "pink", "gold", "blue", "green", "white", "silver"],
  priceRanges: [
    { label: "Under MAD 50", min: 0, max: 50 },
    { label: "MAD 50 - MAD 100", min: 50, max: 100 },
    { label: "MAD 100 - MAD 150", min: 100, max: 150 },
    { label: "MAD 150 and above", min: 150, max: Infinity },
  ],
};
const ShopPage = () => {
  const [filtersState, setFiltersState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(8);

  /*
  const applyFilters = () => {
    let filteredProducts = productsData;

    if (filtersState.category && filtersState.category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filtersState.category
      );
    }

    if (filtersState.color && filtersState.color !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.color === filtersState.color
      );
    }

    if (filtersState.priceRange) {
      const [minPrice, maxPrice] = filtersState.priceRange
        .split("-")
        .map(Number);
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }
    setProducts(filteredProducts);
  };

  useEffect(() => {
    applyFilters();
  }, [filtersState]);
*/

  const { category, color, priceRange } = filtersState;

  const [minPrice, maxPrice] = priceRange.split("-").map(Number);

  const {
    data: { products = [], totalPages, totalProducts } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    color: color !== "all" ? color : "",
    minPrice: isNaN(minPrice) ? "" : minPrice,
    maxPrice: isNaN(maxPrice) ? "" : maxPrice,
    page: currentPage,
    limit: ProductsPerPage,
  });

  const clearFilters = () => {
    setFiltersState({
      category: "all",
      color: "all",
      priceRange: "",
    });
  };


  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error Loading products.</div>;

  const startProduct = (currentPage - 1) * ProductsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Shop</h2>
      </section>

      <section className="section__contain">
        <div className="flex-contain mrgn ">
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />
          <div>
            <h3 className="text-style text-xl font-medium mb-4">
            Showing { startProduct} to {endProduct} of {totalProducts} products
            </h3>
            <ProductCards products={products} />

{/* pagination controls */}
<div className="pagination-container">
<button
onClick={() => handlePageChange(currentPage - 1)}
className="pagination-button">Previous</button>


  {
    [...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        onClick={() => handlePageChange(index + 1) }
        className={`pagination-button
          ${currentPage === index + 1 ?
            'active' : ''}`}
      >
        {index + 1}
      </button>
    ))
  }
  <button
  disabled={currentPage === totalPages}
      onClick={() => handlePageChange(currentPage + 1) }
  className="pagination-button">Next</button>

</div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
