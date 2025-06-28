// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Sidebar from '../admin-view/sidebar';
import Header from '../admin-view/header';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useRegisterUserMutation,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useGetUserQuery
} from '../redux/features/auth/authApi';
// eslint-disable-next-line no-unused-vars
import { setUser } from '../redux/features/auth/authSlice';

const Manage = () => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Fetch all users
  const { data: users = [], refetch } = useGetUserQuery();
  
  // Mutations
  const [registerUser] = useRegisterUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate("/dashboard/users");
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await registerUser(formData).unwrap();
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'customer',
      });
      refetch();
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole({ userId, role: newRole }).unwrap();
      refetch();
    } catch (err) {
      console.error("Error updating role", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId).unwrap();
        refetch();
      } catch (err) {
        console.error("Error deleting user", err);
      }
    }
  };

  return (
    <div className="flex flex-1 min-h-screen w-full contr">
      <Sidebar />
      <div className="column-contr flex flex-1 flex-col min-h-screen w-full">
        <Header />
        <main>
          <div className="containecustom max-w-7xl mx-auto p-6">
            <h2 className="headingsection text-2xl font-bold mb-6">User Management</h2>

            {/* Add New User Form */}
            <div className="ca p-6 rounded-lg mb-6">
              <h3 className="catitle text-lg font-bold mb-4">Add New User</h3>
              <form onSubmit={handleSubmit}>
                <div className="formgroup mb-4">
                  <label className="inpulabel block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="inputfield w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="inpulabel block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="inputfield w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="formgroup mb-4">
                  <label className="inpulabel block text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="inputfield w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="inpulabel block text-gray-700">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="custselect"
                  >
                    <option value="customer">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button type="submit" className="btn">
                  Add User
                </button>
              </form>
            </div>

            {/* User Table */}
            <div className="user-table-container">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user) => (
                    <tr key={user._id}>
                      <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{user.user?.name || user.username}</td>
                      <td className="user-cell">{user.email}</td>
                      <td className="user-cell">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          className="user-select"
                        >
                          <option value="admin">Admin</option>
                          <option value="customer">User</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Manage;
