// eslint-disable-next-line no-unused-vars
import React from "react";

const ShopFiltering = ({
  // eslint-disable-next-line react/prop-types
  filters,
  // eslint-disable-next-line react/prop-types
  filtersState,
  // eslint-disable-next-line react/prop-types
  setFiltersState,

  // eslint-disable-next-line react/prop-types
  clearFilters,
}) => {
  return (
    <div className="space-y-5 flex-shrik-0 ">
      <h3 className="mgn1">Filters</h3>

      <div className="flex flex-col space-y-2 mgn">
        <h4 className="font-medium text-lg">Category</h4>
        <hr />

        {filters.categories.map((category) => (
          <label key={category} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="category"
              id="category"
              value={category}
              // eslint-disable-next-line react/prop-types
              checked={filtersState.category === category}
              onChange={(e) =>
                setFiltersState({ ...filtersState, category: e.target.value })
              }
            />

            <span className="ml-1">{category} </span>
          </label>
        ))}
      </div>

      <div className="flex flex-col space-y-2 mgn">
        <h4 className="font-medium text-lg">Colors</h4>
        <hr />

        {filters.colors.map((color) => (
          <label key={color} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="color"
              id="color"
              value={color}
              // eslint-disable-next-line react/prop-types
              checked={filtersState.color === color}
              onChange={(e) =>
                setFiltersState({ ...filtersState, color: e.target.value })
              }
            />

            <span className="ml-1">{color} </span>
          </label>
        ))}
      </div>

      <div className="flex flex-col space-y-2 mgn">
        <h4 className="font-medium text-lg">Price Range</h4>
        <hr />

        {filters.priceRanges.map((range) => (
          <label key={range.label} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="priceRanges"
              id="priceRanges"
              value={`${range.min}-${range.max}`}
              // eslint-disable-next-line react/prop-types
              checked={filtersState.priceRange === `${range.min}-${range.max}`}
              onChange={(e) =>
                setFiltersState({
                  ...filtersState,
                  priceRange: e.target.value,
                })
              }
            />
            <span className="ml-1">{range.label} </span>
          </label>
        ))}
      </div>

      <button
        onClick={clearFilters}
        className="bg-primary py-1 px-4 text-white rounded btn-shop btn "
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default ShopFiltering;
