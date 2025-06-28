// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import Sidebar from './sidebar';
import Header from './header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts } from '../redux/slices/adminProduct';
import { fetchAllOrders } from '../redux/slices/adminOrderSlice';
import axios from 'axios';
import staticProducts from "../data/products.json";

const Layout = () => {
  const dispatch = useDispatch();

  const {
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);

  const [products, setProducts] = useState([]);

  const {
    orders = [],
    totalOrders = 0,
    totalSales = 0,
    loading: ordersLoading = false,
    error: ordersError = null,
  } = useSelector((state) =>  state.adminOrder);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());

    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/product");
        const combinedProducts = [...res.data, ...staticProducts];
        setProducts(combinedProducts);
      } catch (error) {
        console.error("Erreur de chargement des produits :", error);
        setProducts(staticProducts);
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div className="flex-1 flex min-h-screen w-full contr">
      <Sidebar />
      <div className="column-contr flex-1 flex-col min-h-screen w-full flex flex-col">
        <Header />
        <main>
          <div className="con-custom">
            <h2 className="headingsection text-2xl font-bold">Admin Dashboard</h2>

            {productsLoading || ordersLoading ? (
              <p>Loading...</p>
            ) : productsError ? (
              <p className="text-red-500">Error fetching products: {productsError}</p>
            ) : ordersError ? (
              <p className="text-red-500">Error fetching orders: {ordersError}</p>
            ) : (
              <>
                <div className='bg-bgPrimary p-5'></div>
                <div className="grid-custom">
                  <div className="mt-2 card shadow-md rounded-lg">
                    <h2 className="mt-2 imag text-xl">Revenue</h2>
                    <p className="mt-2 imag text-2xl">{totalSales.toFixed(2)} MAD</p>
                  </div>
                  <div className="mt-2 p-4 shadow-md rounded-lg">
                    <h2 className="mt-2 imag text-xl font-semibold">Total Orders</h2>
                    <p className="mt-2 imag text-2xl">{totalOrders}</p>
                  </div>
                  <div className="mt-2 p-4 shadow-md rounded-lg">
                    <h2 className="imag text-xl font-semibold">Total Products</h2>
                    <p className="mt-2 imag text-2xl">{products.length}</p>
                    <Link to="/dashboard/ManageProduct" className="mt-2 imag text-lk text-blue-500 hover:underline">Manage Products</Link>
                  </div>
                </div>
              </>
            )}

            <div className="sect mt-6">
              <h2 className="sectle text-2xl font-bold mb-4">Recent Orders</h2>
              <div className="tablecontainer overflow-x-auto">
                <table className="customtable min-w-full text-left text-gray-500">
                  <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Total Price</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <tr key={order._id} className="custorow border-b hover:bg-gray-50 cursor-pointer">
                          <td className="customcell">
                            <Link className="text-blue-600 hover:underline">{order._id}</Link>
                          </td>
                          <td className="customcell p-4">{order.user?.name || order.user?.username || order.user?.email || "Unknown"}</td>
                          <td className="customcell p-4">MAD {order.totalPrice}</td>
                          <td className="customcell p-4">{order.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="emptyrow p-4 text-center text-gray-500">
                          No recent orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
