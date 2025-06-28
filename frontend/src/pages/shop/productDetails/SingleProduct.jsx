// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link, useParams } from "react-router-dom";
import RatingStars from "../../../components/RatingStars";
import {useDispatch} from "react-redux"
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import ReviewsCard from "../reviews/ReviewsCard";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
const {data,error, isLoading} = useFetchProductByIdQuery(id);
const SingleProduct = data?.product || {};

const productReviews = data?.reviews || [];


  const handleAddToCart = (product) => {
    // eslint-disable-next-line no-unused-vars
    const productWithId = { ...product, id: product.id };

  dispatch(addToCart(product));
  };



if (isLoading) return <p>Loading...</p>

if (error) return <p>Error loading product details. </p>


  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">product</h2>
        <div className="section__subheader">
          <span>
            <Link to="/">Home</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span>
            <Link to="/Shop">Shop</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span>
            <Link to="/">{SingleProduct.name }</Link>
          </span>
        </div>
      </section>

      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8 flex-cont">
          <div className="md:w-1/2 w-full image-cont">
            <img
              src={SingleProduct?.image}
              alt=""
              className="image-cont image-shop rounded-md w-full h-auto object-cover max-w-sm"
            />
          </div>
          <div className=" p-cont">
            <h3 className="product-title text-2xl font-semibold mb-4">
            {SingleProduct?.name }
            </h3>
            <p className=" mg text-xl-mb-4">
              MAD {SingleProduct?.price}
              {SingleProduct?.oldPrice && <s>      MAD { SingleProduct?.oldPrice}  </s> }

            </p>
            <p>{SingleProduct?.description}</p>

            <div>
              <p className="mg">
                {" "}
                <strong>Category :</strong> {SingleProduct?.category}
              </p>{" "}
              <div>
                <p className="mg">
                  {" "}
                  <strong>Color :</strong>  {SingleProduct?.color}
                </p>
                <div className="mg flex gap-1 items-center ner">
                  <strong>Rating :</strong>
                  <RatingStars rating= {SingleProduct?.rating} />
                </div>
              </div>
            </div>
            <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(SingleProduct);
                }}
             className=" btn cancel-btn mt-6 px-6 py-3 btn mgn2 ">
              add to cart
            </button>
          </div>
        </div>
      </section>

      <section className="section__container ">
        <ReviewsCard productReviews ={productReviews} />
      </section>
    </>
  );
};

export default SingleProduct;
