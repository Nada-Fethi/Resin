// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {  useNavigate} from "react-router-dom";
import { fetchUserOrders } from '../redux/slices/orderSlice';

const MyOrders = () => {

const navigate = useNavigate();
const dispatch = useDispatch();
const {orders} =useSelector((state)=> state.order);

//   const products = useSelector((state) => state.cart.products);
//   const grandTotal = useSelector((state) => state.cart.grandTotal);
//   const tax = useSelector((state) => state.cart.tax);
//   const totalPrice = useSelector((state) => state.cart.totalPrice);
//   // eslint-disable-next-line no-unused-vars
//   const isPaid = true;

//   const handleRemove = (id) => {
//     dispatch(removeFromCart({ id }));
//   };

//   const handleIncrement = (id) => {
//     dispatch(updateQuantity({ id, type: "increment" }));
//   };
  const {user} = useSelector((state) => state.auth);

//   const handleDecrement = (id) => {
//     dispatch(updateQuantity({ id, type: "decrement" }));
//   };
useEffect(() => {

  dispatch(fetchUserOrders());
}, [dispatch]);




  
 


const handleRowClick =(orderId) => {
  navigate(`/dashboard/orders/${orderId}`);
}
















  return (
        <div className="section__container bg-primary-light">
      <h2 className="section__header capitalize">Order Details</h2>
      <div className="imag-logout imgr33 p-4 sm:p-6 rounded-lg border ">
        <div className="top_margen flex flex-col sm:flex-row justify-between mb-8"></div>



    <div className='max-w-7xl mx-auto p-4 sm:p-6 cart top_margen'>
      <h2 className='text-xl  sm:text-2xl font-bold mb-6'>My Orders</h2>
      <div className="cart-items-title max-w-7xl relative shadow-md sm:rounded-lg overflow-hidden">
        <table className='min-w-full text-left text-gray-500'>
          <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order ID</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? 
           ( orders.map((order) => (
                <tr key={order._id}
                onClick={() => handleRowClick(order._id)}
                className='order-row border-b hover:border-gray-50 cursor-pointer'>
                  <td className="table-cell py-2 px-2 sm:py-4 sm:px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className='order-image w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-l'
                    />
                  </td>
                  <td className="cell-padding py-2 px-4">{order._id}</td>
                  <td className="cell-padding py-2 px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                     {new Date(order.createdAt).toLocaleTimeString()}
                     </td>
                  <td className="cell-padding py-2 px-4">{order.shippingAddress ? `${order.shippingAddress.city} , ${order.shippingAddress.country}`: "N/A"}</td>
                  <td className="cell-padding py-2 px-4">{order.orderItems.length}</td>
                  <td className="cell-padding py-2 px-4">${order.totalPrice}</td>
                  <td className="cell-padding py-2 px-4">
                   <span className={`${order.isPaid ? "status-paid bg-green-100 text-green-700" : "status-unpaid bg-red-100 text-red-700"} status-badge px-2 py-1 rounded-full text-xs sm:text-sm font-medium`} >
                    {order.isPaid ? "paid" : "pending"}
                   </span>

                  </td>
                </tr>
              ))
            ):   (
              <tr>
                <td colSpan={7} className='py-4 px-4 text-center text-gray-500'>You have no orders</td>
              </tr>
            ) }
          </tbody>
        </table>
      </div>
    </div>
      </div>
    </div>
  );
};

export default MyOrders;
