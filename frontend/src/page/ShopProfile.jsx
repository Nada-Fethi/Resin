// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/features/auth/authSlice';
import Address from './Address';
import { fetchUserOrders } from '../redux/slices/orderSlice';

const ShopProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.cart);

  const [logoutUser] = useLogoutUserMutation();

  const [activeTab, setActiveTab] = useState('personal-information');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    newsletter: true
  });

  const [displayedUsername, setDisplayedUsername] = useState(user?.username || '');
  const [displayedEmail, setDisplayedEmail] = useState(user?.email || '');

  const [product, setProduct] = useState([]);

  useEffect(() => {
    setDisplayedUsername(user?.username || '');
    setDisplayedEmail(user?.email || '');
  }, [user]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setProduct(savedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(product));
  }, [product]);

  const addNewProduct = () => {
    const newUser = {
      _id: Date.now(),
      name: formData.name,
      price: formData.price,
      image: formData.image,
    };
    setProduct(prev => [newUser, ...prev]);
  };

  const updateDisplayedInfo = (e) => {
    e.preventDefault();
    setDisplayedUsername(formData.username || user?.username);
    setDisplayedEmail(formData.email || user?.email);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };




const {orders} =useSelector((state)=> state.order);


useEffect(() => {

  dispatch(fetchUserOrders());
}, [dispatch]);



  return (
    <div className="min-h-[1024px] bg-gray-50">
      <main className="colorm main-contain">
        <div className="e rounded-lg shadow-sm p-6 mb-6 color">
          <div className="flex-cont flex items-center space-x-6">
            <div className="eleme w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              <img src={user?.profileImage} alt="Profile" className="elem" />
            </div>
            <div className="ele">
              <h1 className="h1 text-2xl font-semibold">{displayedUsername}</h1>
              <p className="p text-gray-600">{displayedEmail}</p>
              <div className="mt-2">
                <span className="badge inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Premium Member
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="contai border-b border-gray-200 mb-6">
          <nav className="nav flex space-x-8">
            {['Personal Information', 'Order History', 'Your favourites', 'Addresses', 
            // 'Payment Methods'
              
            ].map((tab) => {
              const tabKey = tab.toLowerCase().replace(' ', '-');
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tabKey)}
                  className={`tabl pb-4 px-1 cursor-pointer whitespace-nowrap ${
                    activeTab === tabKey
                      ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="grid-container">
          {activeTab === 'personal-information' && (
            <div className="formspan-2">
              <div className="formcard">
                <h2 className="formhead">Personal Information</h2>
                <form className="space-y-6">
                  <div>
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  <div className='mgn2'>
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  <div className="mgn2 checkbox-wrapper">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                      className="form-checkbox"
                    />
                    <label className="checkbox-label">Subscribe to newsletter</label>
                  </div>
                  <button onClick={updateDisplayedInfo} type="button" className="mgn2 btn submitbutton">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'order-history' && (
            <div className="formspan-2 ">
              <div className="formcard shadow-md">
                <h2 className="formhead">Order History</h2>
      <div className="cart-items-title max-w-7xl relative shadow-md sm:rounded-lg overflow-hidden">
              <Link to="/my-orders">
        <table className='mgn '>
          <thead className='text-xs  text-gray-700'>
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order ID</th>
              <th className="py-2 px-4 ">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className='order-row border-b hover:border-gray-50 cursor-pointer'>
                  <td className="table-cell py-2 px-2 sm:py-4 sm:px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className='order-image w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-l'
                    />
                  </td>
                  <td className="cell-padding py-2 px-4">{order._id}</td>
                  <td className="cell-padding py-2 px-4">{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</td>
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
            ) : (
              <tr>
                <td colSpan={7} className='py-4 px-4 text-center text-gray-500'>You have no orders</td>
              </tr>
            )}
          </tbody>
        </table>
        </Link>
      </div>              </div>
            </div>
          )}

          {activeTab === 'your-favourites' && (
            <div className="formspan-2">
              <div className="formcard">
                <h2 className="formhead">Your favourites</h2>
                <div className="ca rounded-lg mb-6containecustom max-w-7xl mx-auto p-6 vertical-spacing">
                  {products.length === 0 ? (
                    <div></div>
                  ) : (
                    products.map((item, index) => (
                      <div key={index} className="productitem">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w object-cover mr-4 productimage"
                        />
                        <div>
                          <h5 className="text-md font-medium">{item.name}</h5>
                          <p className="text-gray-600">MAD {Number(item.price).toFixed(2)}</p>
                        </div>
                        <i className="ri-heart-3-fill mgan heart"></i>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="formspan-2">
              <div className="formcard">
                <div>
                <h2 className="formhead">Addresses</h2>
<Address/></div>
              </div>
            </div>
          )}

          {activeTab === 'payment-methods' && (
            <div className="formspan-2">
              <div className="formcard">
                <h2 className="formhead">Payment Methods</h2>
                <p>صفحة طرق الدفع.</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="account-summary-container">
              <h3 className="account-summary-title">Account Summary</h3>
              <div className="account-summary-list">
                <div className="account-summary-item">
                  <span className="account-summary-label">Membership</span>
                  <span className="account-summary-value">Premium</span>
                </div>
                <div className="account-summary-item">
                  <span className="account-summary-label">Recent Orders</span>
                  <span className="account-summary-value">{orders?.length || 0}</span>
                </div>
                <div className="account-summary-item">
                  <span className="account-summary-label">Wishlist Items</span>
                  <span className="account-summary-value">{products?.length || 0}</span>
                </div>
              </div>
            </div>

            <div className="quick-actions-container">
              <h3 className="quick-actions-title">Quick Actions</h3>
              <div className="quick-actions">
                <button className="quick-action-button">
                              <Link to="/About">
                  
                  <i className="fas fa-shield-alt quick-action-icon"></i>
                  <span className="quick-action-label">Privacy Settings</span></Link>
                </button>
                <button className="quick-action-button">
                                                <Link to="/SettingsPage">

                  <i className="fas fa-question-circle quick-action-icon"></i>
                  <span className="quick-action-label">Help Center</span>
                  </Link>
                </button>
                <button onClick={handleLogout} className="quick-action-button">
                  <i className="fas fa-sign-out-alt quick-action-icon"></i>
                  <span className="quick-action-label">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShopProfile;
