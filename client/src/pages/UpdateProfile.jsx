import { useState, useEffect, useRef } from "react";
import { Camera, Loader2 } from "lucide-react";
import { isPlainObject } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "../redux/slices/authSlice";
import API from "../api/axios";
import { toast } from "react-toastify";

export default function UpdateProfile() {
  const {user, loading} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserDetails());
    }
  }, [dispatch, user]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed");
        return;
      }
      
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        try {
          setUploading(true);
          await API.put("/user/profile", { profileImage: base64String });
          toast.success("Profile image updated successfully");
          dispatch(fetchUserDetails());
        } catch (error) {
          console.error("Upload error:", error);
          toast.error("Failed to update profile image");
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-red-600/40 bg-zinc-950 shadow-2xl shadow-red-900/20 p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-white text-center">
          Update <span className="text-red-500">Profile</span>
        </h2>

        <p className="text-gray-400 text-center mt-2 mb-8">
          Manage your account information
        </p>

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={user.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"}
              alt="Profile"
              className={`w-32 h-32 rounded-full object-cover border-4 border-red-600 ${uploading ? 'opacity-50' : ''}`}
            />

            <button
              onClick={handleImageClick}
              disabled={uploading}
              className="absolute bottom-0 right-0 bg-red-600 hover:bg-red-700 transition p-2 rounded-full disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 size={18} className="text-white animate-spin" />
              ) : (
                <Camera size={18} className="text-white" />
              )}
            </button>
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*" 
            className="hidden" 
          />

          <button
            onClick={handleImageClick}
            disabled={uploading}
            className="mt-4 px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-white font-medium disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Change Profile Image"}
          </button>
        </div>

        {/* User Details */}
        <div className="mt-10 space-y-6">
          <div>
            <label className="block text-red-500 text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              value={user.name}
              readOnly
              className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-3 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-red-500 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-3 text-white focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}