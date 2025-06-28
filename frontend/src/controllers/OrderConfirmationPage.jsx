// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/features/cart/cartSlice';





const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const{checkout} =useSelector((state) => state.checkout);



useEffect(() =>{
  if (checkout && checkout._id) {
    dispatch(clearCart());
    localStorage.removeItem("cart");
  }else{
    navigate("/my-orders")
  }
},[checkout,dispatch, navigate] );

const calculateEstimatedDelivery =(createdAt) =>{
  const orderDate = new Date(createdAt);
  orderDate.setDate(orderDate.getDate() + 10);
  return orderDate.toLocaleDateString();
}



  return (
<div className="section__container bg-primary-light">
  <h1 className="section__header mg  capitalize font-bold text-center text-emerald-700 text-3xl mb-8">
    Thank You for Your Order
  </h1>

  {checkout && (
    <div className="p-6 mg m rounded-lg border">
      <div className="flex justify-between mb-4 imgr">
        <div>
          <h2 className="text-xl font-semibold">Order ID: {checkout._id}</h2>
          <p className="text-gray-500">
            Order date: {new Date(checkout.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-emerald-700 text-sm">
            Estimated Delivery: {calculateEstimatedDelivery(checkout.createdAt)}
          </p>
        </div>
      </div>

      <div className="mb-20">
        {checkout.checkoutItems.map((item) => (
          <div key={item.productId} className="flex items-center mb-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md mr-4 imge imgr"
            />
            <div>
              <h4 className="text-md font-semibold">{item.name}</h4>
              <p className='text-md'>{item.category}</p>

            </div>
            <div className='price-container ml-auto text-right  '>
            <p className=" text-sm text-gray-600 imgr ">MAD {item.price} | <s>MAD {item.oldPrice} </s></p>
            <p className='price-current text-sm text-gray-600 imgr'>Qty : {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='grid grid-cols-2 gap-8'>
        <div>
        <h4 className='text-lg font-semibold mb-2'>Payment Info</h4>
        <h4 className='text-gray-600 mg'>Payment Method : PayPal</h4>
        </div>

      <div >
        <h4 className='text-lg font-semibold mb-2 '>Shipping Info</h4>
        <p className='text-gray-600 mg'>Shipping Method : {checkout.shippingAddress.address} </p>
<p className='text-gray-600 mg'>Address : {checkout.shippingAddress.city} , {checkout.shippingAddress.country} </p>
    </div>

      </div>
    </div>
  )}
</div>
  )}
export default OrderConfirmationPage;
