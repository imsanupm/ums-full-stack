'use client';

import { LogOut } from 'lucide-react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    if (onLogout) {
      onLogout();
    } else {
      try {
        await API.get('/user/logout');

        console.log('Logout successful');
        localStorage.removeItem('accessToken');

        navigate('/login');

      } catch (error) {
        console.error('Error during logout:', error.response?.data || error.message);
      }
    }
  };

  return (
    <nav className="w-full bg-black border-b-4 border-red-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center">
            <h1 className="text-white text-xl sm:text-2xl font-bold">
              <span className="text-red-600">Brand</span>
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 ease-in-out"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
