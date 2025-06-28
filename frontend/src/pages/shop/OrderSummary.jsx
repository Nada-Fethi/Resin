// eslint-disable-next-line no-unused-vars
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";









const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCheckout =() =>{
 navigate('/place-order');}
  // eslint-disable-next-line no-unused-vars
  const products = useSelector((store) => store.cart.products);
  const { selectedItems, totalPrice, tax, taxRate, grandTotal } = useSelector(
    (store) => store.cart
  );

  const handleClearCart = () => {
    dispatch(clearCart());

  };
  return (
    <div className="bg-color rounded text-base">
      <div className="px-6 py-4 space-y-5">
        <h2 className="text-xl cldark">Order Summary</h2>
        <p className="textdark mt-2">Selected Items: {selectedItems} </p>
        <p className="textdark mt-2">
          Total Pric: MAD {totalPrice.toFixed(2)}{" "}
        </p>
        <p className="textdark mt-2">
          Tax ({taxRate * 100}%) : MAD {tax.toFixed(2)}
        </p>
        <h3 className="font-bold mt-2">
          GrandTotal: MAD {grandTotal.toFixed(2)}
        </h3>
        <div className="px-4 mb-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClearCart();
            }}
            className=" btn px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4"
          >
            <span className="mr-2">Clear cart</span>
            <i className="ri-delete-bin-7-line"></i>
          </button>
              <Link
  to="/place-order">
<button
  onClick={() => {
handleCheckout
  }}
  className="btn px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center"
>
  <span className="mr-2">Proceed Checkout</span>
  <i className="ri-bank-card-line"></i>
</button>
</Link> 
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
