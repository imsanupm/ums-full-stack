import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../api/axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Pagination & Search States
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // Matches your backend default

  // Fetch Users from Backend
  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      // Adjust URL to match your API route structure
      const response = await API.get(`/api/admin/users`, {
        params: {
          search: search,
          page: currentPage,
          limit: limit
        }
      });
      
      // Destructuring data from your controller's response
      const { users, totalPages, currentPage: backendPage } = response.data;
      setUsers(users);
      setTotalPages(totalPages);
      setCurrentPage(backendPage);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when page or search term changes
  useEffect(() => {
    fetchUsers();
  }, [currentPage, search]);

  // Handler Placeholders for Action Buttons
  const handleBlockUnblock = async (userId, isBlocked) => {
    try {
      // Example PUT/PATCH request to your backend toggling status
      // await axios.patch(`/api/admin/users/${userId}/toggle-status`);
      
      // Optimistically update local UI state
      setUsers(users.map(user => 
        user._id === userId ? { ...user, isBlocked: !isBlocked } : user
      ));
      alert(`User action successful`);
    } catch (err) {
      alert('Failed to update user status');
    }
  };

  const handleEdit = (user) => {
    alert(`Editing user: ${user.name}`);
    // Implement your edit modal trigger or navigation logic here
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-zinc-800 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-wider uppercase text-red-600">
              User Management
            </h1>
            <p className="text-zinc-400 text-sm mt-1">Manage, edit, or restrict user access profiles.</p>
          </div>
          
          {/* Search Input - linked to controller's {name: $regex} */}
          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Search by username..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // Reset to page 1 on new search
              }}
              className="w-full bg-zinc-900 border border-zinc-700 text-white rounded px-4 py-2 focus:outline-none focus:border-red-600 transition"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-600 text-red-200 p-4 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Responsive Desktop Table / Mobile Cards view */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden shadow-xl shadow-red-950/10">
          {loading ? (
            <div className="flex justify-center items-center py-20 text-red-500 font-semibold tracking-widest animate-pulse">
              LOADING USER PROTOCOLS...
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">No users found matching parameters.</div>
          ) : (
            <>
              {/* Desktop Table View (Hidden on mobile stack) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 uppercase text-xs tracking-wider">
                      <th className="py-4 px-6">Avatar</th>
                      <th className="py-4 px-6">Username</th>
                      <th className="py-4 px-6">Email</th>
                      <th className="py-4 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-zinc-900/40 transition">
                        <td className="py-4 px-6">
                          <img
                            src={user.avatarUrl || 'https://via.placeholder.com/150/18181b/ffffff?text=User'}
                            alt={user.name}
                            className="w-10 h-10 rounded-full border border-zinc-700 object-cover"
                          />
                        </td>
                        <td className="py-4 px-6 font-medium text-zinc-200">{user.name}</td>
                        <td className="py-4 px-6 text-zinc-400">{user.email}</td>
                        <td className="py-4 px-6">
                          <div className="flex justify-center items-center gap-3">
                            <button
                              onClick={() => handleEdit(user)}
                              className="px-3 py-1.5 border border-zinc-700 text-zinc-300 rounded text-sm font-medium hover:bg-white hover:text-black hover:border-white transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleBlockUnblock(user._id, user.isBlocked)}
                              className={`px-3 py-1.5 rounded text-sm font-medium transition tracking-wide ${
                                user.isBlocked
                                  ? 'bg-zinc-800 text-green-500 hover:bg-green-600 hover:text-white'
                                  : 'bg-red-600 text-white hover:bg-red-700'
                              }`}
                            >
                              {user.isBlocked ? 'Unblock' : 'Block'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card Layout (Visible only on small screens) */}
              <div className="grid grid-cols-1 divide-y divide-zinc-900 md:hidden">
                {users.map((user) => (
                  <div key={user._id} className="p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={user.avatarUrl || 'https://via.placeholder.com/150/18181b/ffffff?text=User'}
                        alt={user.name}
                        className="w-12 h-12 rounded-full border border-zinc-700 object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <h2 className="font-semibold text-zinc-200 truncate">{user.name}</h2>
                        <p className="text-zinc-400 text-sm truncate">{user.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="w-full py-2 border border-zinc-700 text-zinc-300 rounded text-sm font-medium hover:bg-white hover:text-black transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleBlockUnblock(user._id, user.isBlocked)}
                        className={`w-full py-2 rounded text-sm font-medium transition ${
                          user.isBlocked
                            ? 'bg-zinc-800 text-green-500'
                            : 'bg-red-600 text-white'
                        }`}
                      >
                        {user.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6 px-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded border border-zinc-800 bg-zinc-950 text-sm font-medium text-zinc-400 hover:text-white hover:border-zinc-600 disabled:opacity-40 disabled:hover:text-zinc-400 disabled:hover:border-zinc-800 transition"
            >
              Previous
            </button>
            
            <span className="text-xs sm:text-sm text-zinc-400 tracking-wider">
              Page <span className="text-white font-medium">{currentPage}</span> of{' '}
              <span className="text-white font-medium">{totalPages}</span>
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded border border-zinc-800 bg-zinc-950 text-sm font-medium text-zinc-400 hover:text-white hover:border-zinc-600 disabled:opacity-40 disabled:hover:text-zinc-400 disabled:hover:border-zinc-800 transition"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default UserManagement;