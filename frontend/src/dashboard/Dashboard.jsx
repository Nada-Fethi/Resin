// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import uploadPlaceholder from "../assets/upload_area.png"; // صورة افتراضية
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminProducts,
  createProduct,
} from "../redux/slices/adminProduct";

const Dashboard = () => {
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const selectedProduct = useSelector(
    (state) => state.products?.selectedProduct
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    oldPrice: 0,
    color: "",
    rating: 0,
    gender: "",
    image: uploadPlaceholder, // صورة وحدة
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchAdminProducts(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // معاينة فقط
      setProductData((prevData) => ({
        ...prevData,
        image: imageUrl,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct({ productData }));
    navigate("/dashboard/ManageProduct");
  };

  return (
    <>
      <div className="containecustom max-w-7xl mx-auto p-6">
        <h2 className="headingsection text-2xl font-bold">Add New Product</h2>
      </div>
      <div className="conner flex min-h-screen w-full my-flex-container">
        <form onSubmit={handleSubmit} className="flex flex-col items-start gap-3">
          <div className="up_margin">
            <p>Image:</p>
            <input onChange={handleImageUpload} type="file" id="image1"
/>
            {productData.image && (
              <div>
                <img
                  onChange={handleImageUpload}
                  type="file" id="image1"
                  src={productData.image}
                  alt="preview"

               
                  className="updoad"
                />
              </div>
            )}
          </div>

          <div className="margen w-full">
            <p className="mb-2">Product name</p>
            <input
              name="name"
              type="text"
              placeholder="Type here"
              onChange={handleChange}
              value={productData.name}
              className="w-full max-w-[500px] px-3 py-2"
              required
            />
          </div>

          <div className="margen w-full">
            <p className="mb-2">Product Description</p>
            <textarea
              onChange={handleChange}
              value={productData.description}
              name="description"
              rows={4}
              placeholder="Write content here"
              className="w-full max-w-[500px] px-3 py-2"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
            <div className="margen">
              <p className="mb-2">Product Category</p>
              <select
                name="category"
                onChange={handleChange}
                value={productData.category}
                className="w-full px-3 py-2"
                required
              >
                <option value="">Select Category</option>
                <option value="flower">Flower</option>
                <option value="resin">Resin</option>
                <option value="accessories">Accessories</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>

            <div className="margen">
              <p className="mb-2">Product Color</p>
              <select
                name="color"
                onChange={handleChange}
                value={productData.color}
                className="w-full px-3 py-2"
                required
              >
                <option value="">Select Color</option>
                <option value="pink">Pink</option>
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="blue">Blue</option>
              </select>
            </div>

            <div className="margen">
              <p className="mb-2">Product Price</p>
              <input
                onChange={handleChange}
                name="price"
                type="number"
                placeholder="25"
                value={productData.price}
                className="w-full px-3 py-2 sm:w-[120px]"
                required
              />
            </div>

            <div className="margen">
              <p className="mb-2">Product Old Price</p>
              <input
                onChange={handleChange}
                name="oldPrice"
                type="number"
                placeholder="25"
                value={productData.oldPrice}
                className="w-full px-3 py-2 sm:w-[120px]"
              />
            </div>
          </div>

          <div className="margen flex items-center mb-4">
            <p className="mr-2">Product Rating:</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="clickable-text cursor-pointer text-yellow-500 text-xl"
                onClick={() => {
                  setRating(star);
                  setProductData((prev) => ({ ...prev, rating: star }));
                }}
              >
                {rating >= star ? (
                  <i className="ri-star-fill"></i>
                ) : (
                  <i className="ri-star-line"></i>
                )}
              </span>
            ))}
          </div>

          <div className="margen flex gap-2 mt-2">
            <input type="checkbox" id="bestseller" name="bestseller" />
            <label className="cursor-pointer" htmlFor="bestseller">
              Add to bestseller
            </label>
          </div>

          <button
            type="submit"
            className="margen w-28 py-3 mt-7 btn text-fuchsia-50"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
