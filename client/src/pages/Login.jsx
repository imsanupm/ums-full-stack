import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import API from '../api/axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        try {
            const response = await API.post('/user/login',{
            email:formData.email,
            password:formData.password
        });

        dispatch(setCredentials({
            token: response.data.accessToken,
            user: response.data.user || null
        }));

        toast.success("Login sucessfull")
        navigate('/')
        } catch (error) {
            console.log(error)
        }

        

    };

    return (
        <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8">
            {/* Animated gradient background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
            </div>

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(0deg, transparent 24%, rgba(230, 30, 30, 0.05) 25%, rgba(230, 30, 30, 0.05) 26%, transparent 27%, transparent 74%, rgba(230, 30, 30, 0.05) 75%, rgba(230, 30, 30, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(230, 30, 30, 0.05) 25%, rgba(230, 30, 30, 0.05) 26%, transparent 27%, transparent 74%, rgba(230, 30, 30, 0.05) 75%, rgba(230, 30, 30, 0.05) 76%, transparent 77%, transparent)',
                    backgroundSize: '50px 50px',
                }}
            ></div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-md">
                <div className="text-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <h1 className="text-5xl sm:text-6xl font-black text-white mb-3">
                        <span className="text-red-600">R</span>eadify
                    </h1>
                    <p className="text-gray-400 text-base sm:text-lg">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    {/* Email Field */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <label className="block text-white text-sm font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50 transition placeholder-gray-500"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <label className="block text-white text-sm font-medium mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-3 pr-12 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50 transition placeholder-gray-500"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600 transition"
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                        <path d="M15.171 11.586a4 4 0 111.414-1.414l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.121z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>




                    {/* Sign In Button */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold py-3 px-4 rounded-lg transition duration-300 mt-8 text-base animate-fade-in-up hover:shadow-lg hover:shadow-red-600/50"
                        style={{ animationDelay: '0.5s' }}
                    >
                        Sign In
                    </button>
                </form>

                {/* Footer Links */}
                <div className="mt-8 space-y-4 text-center text-gray-400 text-sm animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                   
                    <p>
                        Don&apos;t have an account?{' '}
                        <Link
                            to="/register"
                            className="text-red-600 hover:text-red-500 font-semibold transition"
                        >
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>

            <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
        </div>
    );
}