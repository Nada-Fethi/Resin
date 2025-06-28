// Address.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const Address = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      fullName: 'Nada Fethi',
      phone: '0633356195',
      city: 'Casablanca',
      postalCode: '20000',
      addressLine: '123 Rue de la Liberté',
      isDefault: true
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phone: '',
    city: '',
    postalCode: '',
    addressLine: '',
  });

  const handleDelete = (id) => {
    const updated = addresses.filter((addr) => addr.id !== id);
    setAddresses(updated);
  };

  const setDefault = (id) => {
    const updated = addresses.map((addr) =>
      addr.id === id
        ? { ...addr, isDefault: true }
        : { ...addr, isDefault: false }
    );
    setAddresses(updated);
  };

  const handleChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleAdd = () => {
    if (
      newAddress.fullName &&
      newAddress.phone &&
      newAddress.city &&
      newAddress.postalCode &&
      newAddress.addressLine
    ) {
      const newEntry = {
        ...newAddress,
        id: Date.now(),
        isDefault: false
      };
      setAddresses([...addresses, newEntry]);
      setNewAddress({
        fullName: '',
        phone: '',
        city: '',
        postalCode: '',
        addressLine: ''
      });
      setIsModalOpen(false);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="flex">
      <div className="grid m:grid-colss-2 gap-2">
        {addresses.map((addr) => (
          <div key={addr.id} className=" border mg   p-4 shadow-sm relative bg-pink-200">
            <p className="font-bold mgn1  text-lg">{addr.fullName}</p>
            <p className='mg m '>{addr.phone}</p>
            <p className='mg m'>{addr.addressLine}</p>
            <p className='mg m'>{addr.city}, {addr.postalCode}</p>

            <div className="flex gap-2 ">
              {!addr.isDefault && (
                <button
                  onClick={() => setDefault(addr.id)}
                  className="mg address-card  text-white px-4 py-2 rounded red transition text-sm hover:underline"
                >
                  Set as default
                </button>
              )}
              <button
                onClick={() => handleDelete(addr.id)}
                className="mg bg1 address-card btn-danger text-sm "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Address Button */}
      <div className="mt-6 ">
        <button
          onClick={() => setIsModalOpen(true)}
          className="mgn address-card bg5 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add New Address
        </button>
    

      {/* Modal */}
      {isModalOpen && (
        <div className=" bg-pink-300 bg-opacity-30 mg items-center justify-center z-50">
          <div className=" bg-pink-300 rounded-lg mg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Address</h3>
            <div className="">
              <input
                type="text"
                name="fullName"
                value={newAddress.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className=" form-inp mg"
              />
              <input
                type="text"
                name="phone"
                value={newAddress.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className=" form-inp mg"
              />
              <input
                type="text"
                name="addressLine"
                value={newAddress.addressLine}
                onChange={handleChange}
                placeholder="Address Line"
                className="form-inp mg"
              />
              <input
                type="text"
                name="city"
                value={newAddress.city}
                onChange={handleChange}
                placeholder="City"
                className="form-inp mg"
              />
              <input
                type="text"
                name="postalCode"
                value={newAddress.postalCode}
                onChange={handleChange}
                placeholder="Postal Code"
                className="form-inp mg"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                onClick={handleAdd}

                  className=" text-gray1  hover:text-gray-800"
                >Add
                  
                </button>
                <button
                           onClick={() => setIsModalOpen(false)}
                  className="text-gray2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
      </div>
  );
};

export default Address;
