'use client';

import { Edit2 } from 'lucide-react';
import Navbar from './Navbar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../redux/slices/authSlice';

export default function Home() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  const handleSubmit = () => {
  };

  console.log(`Current user state:`, user);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
          <p className="text-xl animate-pulse">Loading profile...</p>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
          <p className="text-xl text-red-500 font-semibold">Not authenticated. Please log in.</p>
        </div>
      </>
    );
  }


  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-md mx-auto">
          {/* Card Container */}
          <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border-2 border-red-600 p-6 sm:p-8">
            {/* Profile Image Container */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-red-600 overflow-hidden shadow-lg flex items-center justify-center bg-gray-700">
                <img
                  src={user.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"} // Safe dynamic fallback if no image exists
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* User Information */}
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              {/* Username Section */}
              <div className="text-center">
                <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-widest mb-1 sm:mb-2">
                  Username
                </p>
                <h2 className="text-white text-2xl sm:text-3xl font-bold">
                  {user.name}
                </h2>
              </div>

              {/* Email Section */}
              <div className="bg-black rounded-lg p-4 sm:p-5 border border-gray-700">
                <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-widest mb-1 sm:mb-2">
                  Email Address
                </p>
                <p className="text-red-500 text-sm sm:text-base font-medium break-all">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Update Profile Button */}
            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-red-600/50 active:scale-95"
            >
              <Edit2 className="w-5 h-5" />
              <span>Update Profile</span>
            </button>

            {/* Optional Info */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-700">
              <p className="text-gray-400 text-xs sm:text-sm text-center">
                Member since 2024
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}