import React from 'react';
import { useGetUserQuery } from '../redux/features/auth/authApi';

const Team = () => {
  const { data: users = [], isLoading, isError } = useGetUserQuery();
  const [searchTerm, setSearchTerm] = React.useState('');

  // eslint-disable-next-line no-unused-vars
  const handleDelete = (id) => {
    console.log('Delete user with id:', id);
    // Add your delete logic here
  };

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="tablewrer conner">
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching users</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar searchs search-input mb-4 p-2 border rounded"
          />
          <table className="producttable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user._id}>
                    <td>{user.username || ''}</td>
                    <td>{user.email || ''}</td>
                    <td>{user.role || 'user'}</td>
                    {/* <td>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete user ${user.username}?`)) {
                            handleDelete(user._id);
                          }
                        }}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Team;
