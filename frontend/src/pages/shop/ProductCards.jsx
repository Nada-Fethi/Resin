// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../components/RatingStars";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { fetchAdminProducts } from "../../redux/slices/adminProduct";

// eslint-disable-next-line react/prop-types
const ProductCards = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(fetchAdminProducts()); // <-- إذا كنت باغي تحدث المنتجات بعد الإضافة


  // باقي الكومبونونت...
};


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <div key={index} className="product__card">
          <div className="relative">
            <Link to={`/shop/${product._id}`}>
              <img
                src={product.image}
                alt="product"
                className="product-image"
              />
            </Link>
            <div className="hover:block absolute top-3 right-3">
              <Link
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
              >
<i className="ri-heart-3-fill heart"></i>              </Link>
            </div>
          </div>

          <div className="product__card__content">
          <h4>{product.name}</h4>
          <p>
              MAD {product.price}{" "}
              {product?.oldPrice ? <s>MAD {product?.oldPrice} </s> : null}
            </p>
            <RatingStars rating={product.rating} />
              <Link
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
              > <button className="bton bt ">ADD</button></Link>
          </div>

        </div>

      ))}
    </div>
  );
};

export default ProductCards;
