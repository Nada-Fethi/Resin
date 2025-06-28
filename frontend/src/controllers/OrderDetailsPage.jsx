// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useParams} from "react-router-dom";
import { fetchOrderDetails } from "../redux/slices/orderSlice";






const OrderDetailsPage = () => {

const dispatch = useDispatch();
const { orderDetails } = useSelector((state) => state.order);


const {id} = useParams();


useEffect(() => {
  dispatch(fetchOrderDetails(id));
},[dispatch,id])



  return (
    <div className="section__container bg-primary-light">
      <h2 className="section__header capitalize">Order Details</h2>
{!orderDetails || !orderDetails.orderItems ? (<p>No Order details found</p>):(
   <div className="p-6 mg m rounded-lg border">
      <div className="flex justify-between mb-4 imgr">
        <div>
          <h2 className="text-xl font-semibold">Order ID: {orderDetails._id}</h2>
          <p className="text-gray-500">
          {new Date(orderDetails.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
          <div>
        <span className={`${orderDetails.isPaid
          ?"bg-green-300 text-green-400":"bg-red-300 text-red-400"
        } px-3 py-1 rounded-full text-sm font-medium mb-2`}>
          {orderDetails.isPaid ? "Approved" : "Pending"}
        </span>
</div>
<div>
        <span className={`${orderDetails.isDelivered
          ?"bg-green-300 text-green-400":"bg-yellow-300 text-yellow-400"
        } px-3 py-1 rounded-full text-sm font-medium mb-2 mg`}>
          {orderDetails.isDelivered ? "Delivered" : " Pending Delivered"}
        </span>
</div>
        
        
        </div>
        
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className=' mg text-lg font-semibold mb-2 '>Payment Info</h4>
<p className='text-gray-600 mg'>Payment Method: {orderDetails.paymentMethod}</p>
        <p className='cell-paddingtext-gray-600 mg'> Status: { orderDetails.isPaid ? "Paid" : "Unpaid"} </p>
          </div>
                    <div>
            <h4 className=' mg text-lg font-semibold mb-2'>Shipping Info</h4>
        <p className='order-imagetext-gray-600 mg'>Shipping Method :{orderDetails.shippingMethod} </p>
        <p className='text-gray-600 mg'> Address: { `${orderDetails.shippingAddress?.city},${orderDetails.shippingAddress?.country }`} </p>
          </div>
        </div>



    <div className=' max-w-7xl mx-auto p-4 sm:p-6 cart top_margen'>
      <h2 className='m text-xl  sm:text-2xl font-bold mb-6'>Products</h2>
      <div className=" cart-items-title max-w-7xl relative shadow-md sm:rounded-lg overflow-hidden">
        <table className='mg min-w-full text-left text-gray-500'>
          <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
            <tr>
              <th className="py-2 px-4 sm:py-3">Name</th>
              <th className="py-2 px-4 sm:py-3">Unit Price</th>
              <th className="py-2 px-4 sm:py-3">Quantity</th>
              <th className="py-2 px-4 sm:py-3">Total</th>
            </tr>
          </thead>
          <tbody>
            
              {orderDetails.orderItems.map((item) => (
         <tr key={item.productId} className='border-b'>
  <td className="table-cell  py-2 px-2 sm:py-4 sm:px-4  items-center gap-2">
<td className="table-cell py-2 px-2 sm:py-4 sm:px-4  items-center gap-2">
  <img
    src={item.image}
    alt={item.name}
    className='M w w-10 h-13 sm:w-12 sm:h-12 object-cover rounded-l'
  />
  <span className="M"> {item.name}</span>
</td>

  </td>
  <td className="py-2 px-4 sm:py-4">MAD {item.price}</td>
  <td className="py-2 px-4 sm:py-4">MAD {item.quantity}</td>
  <td className="py-2 px-4 sm:py-4">MAD {item.price * item.quantity}</td>
</tr>
              ))}

          </tbody>
        </table>
      </div>



    </div>
    <Link to="/my-orders"   className=" py-2 px-4 sm:py-4 mg hover:underline">
Back to My Orders
</Link>
</div>
)}
    </div>
  );
};

export default OrderDetailsPage;
