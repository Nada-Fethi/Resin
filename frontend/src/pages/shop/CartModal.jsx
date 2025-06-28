// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
} from "../../redux/features/cart/cartSlice";

// eslint-disable-next-line react/prop-types
const CartModal = ({ products, isOpen, onClose }) => {


  const dispatch = useDispatch();
  const handleQuantity = (type, id) => {
    const payload = { type, id };
    dispatch(updateQuantity(payload));
  };

  const handleRemove = (e, id) => {
    e.preventDefault();
    dispatch(removeFromCart({ id }));
  };

  return (
    <div
      className={`fixed1 z-[1000] inset-0 bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ transition: "opacity 300ms" }}
    >
      <div
        className={`fixed1 chang right-0 top-0  w-fullh-full overflow-y-auto bg-white transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          transition: "transform 300ms cubic-bezier(0.25,0.46,0.45, 0.94)",
        }}
      >
        <div className="p-4 mgn2 mt-4 ">
          <div className="flex justify-between items-center1 mb-4">
            <h4 className="text-xl font-somibold">your Cart</h4>
            <button onClick={() => onClose()} className=" text-gray">
              <i className="ri-xrp-fill bg-blak p-1 "></i>
            </button>
          </div>
          <div className=" cart-items">
            {products.length === 0 ? (
              <div>your cart is empty</div>
            ) : (
              products.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md\:flex-row md\:items-center md\:justify-between shadow-md md:p-5"
                >
                  <div className="flex items-center">
                    <span className="mr-6 mr px-1 runded-full">
                      0{index + 1}
                    </span>
                    <img
                      src={item.image}
                      alt=""
                      className="w-10 h-10 object-cover mr-4"
                    />
                    <div>
                      <h5 className="text-lg font-medium ">{item.name} </h5>
                      <p className="textgray">
                        MAD {Number(item.price).toFixed(2)}{" "}
                      </p>
                    </div>
                    <div className="flex  flex-row md:justify-start justify-end items-center mr-2">
                      {" "}
                      <Link
                        onClick={() => handleQuantity("decrement", item._id)}
                        className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-700 text-gray-700 hover:bg-primary hover:text-white"
                      >
                        -
                      </Link>
                      <span className="px-2 text-center mx-1">
                        {item.quantity}
                      </span>
                      <Link
                        onClick={() => handleQuantity("increment", item._id)}
                        className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-700 text-gray-700 hover:bg-primary hover:text-white"
                      >
                        +
                      </Link>
                      <div className="ml-5">
                        <Link
                          onClick={(e) => handleRemove(e, item._id)}
                          className="color"
                        >
                          Remove
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {products.length > 0 && <OrderSummary />}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
