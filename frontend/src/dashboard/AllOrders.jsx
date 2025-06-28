// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'

import Sidebar from '../admin-view/sidebar'
import Header from '../admin-view/header';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllOrders, updateOrderStatus } from '../redux/slices/adminOrderSlice';

const AllOrders = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();

  const {user} = useSelector((state) => state.auth)
  const {orders} = useSelector((state) => state.adminOrder)

useEffect(() =>{if(!user || user.role !="admin")
{
  // navigate("/")

}else{
  dispatch(fetchAllOrders());
}
},[dispatch, user, navigate])





const handleStatusChange = (orderId, status) =>{
  dispatch(updateOrderStatus({id: orderId, status}))
  console.log({id:orderId, status});
};





  return (
    <div className="flex flex-1 flex min-h-screen w-full contr">

<Sidebar/>
<div className="column-contr flex flex-1 flex-col min-h-screen w-full flex flex-col">
<Header />

<main  >

<div className="order-container">
  <h2 className="order-title">Order Management</h2>
  <div className="order-table-wrapper">
    <table className="order-table">
      <thead className="order-table-header">
        <tr>
          <th className="order-table-cell">Order ID</th>
                    <th className="order-table-cell"> Name</th>

          <th className="order-table-cell">Total Price</th>
          <th className="order-table-cell">Status</th>
          <th className="order-table-cell">Actions</th>
        </tr>
      </thead>
      <tbody>
  {orders.length > 0 ? (
    orders.map((order) => (
      <tr key={order._id} className="order-row">
        <td className="order-cell-id">{order._id}</td>

        {/* <td className="p-4">{order.user.name}</td> */}
<td className="customcell p-4">{order.user?.name || order.user?.username || order.user?.email || "Unknown"}</td>

<td className="p-4">{order.totalPrice} MAD</td>
<td className="p-4">
  <select
    value={order.status}
    onChange={(e) => handleStatusChange(order._id, e.target.value)}
    className="custoinput"
    >
      <option value="Processing">Processing</option>
      <option value="Shipped">Shipped</option>
      <option value="Delivered">Delivered</option>
      <option value="Cancelled">Cancelled</option>
    </select>
</td>
<td className="p-4">
  <button
  onClick={() => handleStatusChange(order._id, 'Delivered')}
    className="delivered-button"
  >
    Mark as Delivered
  </button>
</td>

     </tr>
    ))
  ) : (
    <tr>
      <td colSpan={5} className="order-empty-cell">
        No orders found.
      </td>
    </tr>
  )}
</tbody>

  </table>
  </div>
</div>

</main>
</div>

</div>
)
}
export default AllOrders