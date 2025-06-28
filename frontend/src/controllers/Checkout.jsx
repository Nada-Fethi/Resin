// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PayPalButton from './PayPalButton';
import { useDispatch } from "react-redux";
import { updateQuantity } from '../redux/features/cart/cartSlice';
import { createCheckout } from '../redux/slices/checkoutSlice';
import axios from 'axios';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

const { selectedItems, cart, totalPrice, tax, taxRate, grandTotal, products } = useSelector(
  (store) => store.cart
);





  const [checkoutId, setCheckoutId] = useState(null);
const {user} = useSelector((state) => state.auth);
 
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });




    useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/place-order");
    }
  }, [cart, navigate]);



    // eslint-disable-next-line no-unused-vars
    const handleQuantity = (type, id) => {
      const payload = { type, id };
      dispatch(updateQuantity(payload));
    };
  

const handleCreateCheckout = async (e) => {
  e.preventDefault();

  if (products && products.length > 0) {
    const checkoutItems = products.map(product => ({
      productId: product._id || product.id,
      quantity: product.quantity || 1,
      price: product.price,
       name: product.name,      // أضف الاسم
      image: product.image,    // أضف الصورة
    }));

    const res = await dispatch(createCheckout({
      checkoutItems,
      shippingAddress,
      paymentMethod: "Paypal",
      totalPrice,
    }));

    if (res.payload && res.payload._id) {
      setCheckoutId(res.payload._id);
      console.log("Checkout created with ID:", res.payload._id);
    }
  }
};



  const handlePaymentSuccess =async (details) => {
    console.log("Payment Successful", details);
    navigate("/order"); 
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        
        {
          paymentStatus: "paid",
          paymentDetails: details,
        },
  { withCredentials: true }
      );
      if (response.status === 200) {
        await handleFinalizeCheckout(checkoutId);
      } else {
  console.error("Erreur lors du paiement ou finalisation, statut:", response.status);

      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
  { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/order");
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };







  // if(!cart || !cart.products || cart.products.length === 0){return <p>your cart is empty</p>}

  return (
    <>
    <div className='section section__container bg-primary-light margen text-xl sm:text-2xl my-3'>
        <h2 className="margen  section__header capitalize "> Delivery Information</h2>
</div>



    <div className=" about-content margen margen  grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 pt-5 tracking-tighter">
      <div className='about-image-wrapper margne bg-white rounded-lg p-6'>
        <h2 className='text-2xl uppercase mb-6'>Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className='text-lg mb-4'>Contact Details</h3>

          {/* Email */}
          <div className='mb-4'>
            <label className='block text-gray-700'>Email</label>
<input className='mb-4 w-full border p-2 rounded' type="email"
value={user.email} placeholder='Email address' readOnly />
          </div>

          {/* First Name + Last Name */}
          <div className='mb-4'>
            <label className='block text-gray-700'>First name</label>
            <input className='mb-4 w-full border p-2 rounded' type="text" placeholder='First name'
              value={shippingAddress.firstName}
              onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
              required
            />

            <label className='block text-gray-700'>Last name</label>
            <input className='w-full p-2 border rounded' type="text" placeholder='Last name'
              value={shippingAddress.lastName}
              onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
              required
            />
          </div>

          {/* Address */}
          <div className='mb-4'>
            <label className='block text-gray-700'>Address</label>
            <input className='w-full border p-2 rounded' type="text" placeholder='Address'
              value={shippingAddress.address}
              onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
              required
            />
          </div>

          {/* City + Postal Code */}
          <div className='mb-4'>
            <label className='block text-gray-700'>City</label>
            <input className='mb-4 w-full border p-2 rounded' type="text" placeholder='City'
              value={shippingAddress.city}
              onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
              required
            />

            <label className='block text-gray-700'>Postal code</label>
<input
  className='w-full p-2 border rounded'
  type="text"
  placeholder='Postal code'
  value={shippingAddress.postalCode}  // حرف C كبير
  onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}  // حرف C كبير
  required
/>

          </div>

          {/* Country + Phone */}
          <div className='mb-4'>
            <label className='block text-gray-700'>Country</label>
            <input className='mb-4 w-full border p-2 rounded' type="text" placeholder='Country'
              value={shippingAddress.country}
              onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
              required
            />

            <label className='block text-gray-700'>Phone</label>
            <input className='w-full p-2 border rounded' type="text" placeholder='Phone'
              value={shippingAddress.phone}
              onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
              required
            />
          </div>

          {/* Conditional Button or Paypal */}
          <div className='mt-6'>
            {!checkoutId ? (
              <button className='btn w-full bg-blue-600 text-white py-3 rounded' type='submit'>
                Continue to Payment
              </button> 
            ) : (
              <div>
                <h3 className="text-lg font-semibold">Pay with Paypal</h3>
                <PayPalButton
                  amount={totalPrice.toFixed(2)}
                  onSuccess={handlePaymentSuccess}
                  // eslint-disable-next-line no-unused-vars
                  onError={(err) => alert("Payment failed. Try again.")}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div className='bg-gray-50 p-6 rounded-lg margne'>
        <h3 className='text-lg mb-4'>Order Summary</h3>

        <div className='dividersection'>
        <div className=" ca1  rounded-lg mb-6 containecustom max-w-7xl mx-auto p-6 vertical-spacing">
              {products.length === 0 ? (
                <div></div>
              ) : (
                products.map((item, index) => (
                  <div key={index} className="productitem">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w object-cover mr-4 productimage "
                    />
                    <div>
                      <h5 className="text-md font-medium">{item.name}</h5>
                      <p className="text-gray-600">MAD {Number(item.price).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className=' ca1 p-6 rounded-lg mb-6'>
          <p className="text-dark mt-2">Selected Items: {selectedItems}</p>
          <p className="text-dark mt-2">Total Price: MAD {totalPrice.toFixed(2)}</p>
          <p className="text-dark mt-2">Tax ({(taxRate * 100).toFixed(0)}%): MAD {tax.toFixed(2)}</p>
          <h3 className="font-bold mt-2">Grand Total: MAD {grandTotal.toFixed(2)}</h3>
        </div>
</div>
      </div>

            {/* Order Summary */}

    </div>
    </>
  );
};

export default Checkout;
