import React, { useState } from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

  const toggleForm = () => {
    setIsLogin(!isLogin); // Switch between Login and Signup
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-10 bg-gradient-to-r from-white via-green-300 to-nature-300">
        <div
          className={`flex w-4/5 max-w-5xl shadow-2xl rounded-lg overflow-hidden transform transition-all duration-700 mt-8 ${
            isLogin ? "animate-flipLogin" : "animate-flipSignup"
          }`}
          style={{ maxHeight: "80vh" }} // Prevents card from growing too tall
        >
          {/* Left Section with Image */}
          <div className="w-1/2 relative">
            <img
              src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80"
              alt="Nature Travel"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-10 left-10 right-10 bg-white bg-opacity-70 p-4 rounded-lg animate-slideUp">
              <h2 className="text-3xl font-bold text-blue-800">
                {isLogin ? "Capture Your Journeys" : "Join Our Community"}
              </h2>
              <p className="text-blue-600">
                {isLogin
                  ? "Record your travel experiences and memories in your personal travel journal."
                  : "Sign up to share your adventures and connect with like-minded travelers."}
              </p>
            </div>
          </div>

          {/* Right Section with Form */}
          <div className="w-1/2 bg-white flex flex-col items-center justify-center py-10 px-8 h-full">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              {isLogin ? "Login" : "Sign Up"}
            </h2>
            <form className="w-full">
              {/* Common Inputs */}
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              {!isLogin && (
                <div className="mb-4">
                  <label className="block text-gray-600 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>
              )}
              <div className="mb-6">
                <label className="block text-gray-600 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              {!isLogin && (
                <div className="mb-6">
                  <label className="block text-gray-600 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>
            <div className="flex items-center my-4">
              <div className="h-px w-full bg-gray-300"></div>
              <span className="mx-4 text-gray-500">OR</span>
              <div className="h-px w-full bg-gray-300"></div>
            </div>
            <button className="w-full flex items-center justify-center gap-3 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition transform hover:scale-105 mb-3">
              <FaGoogle />
              {isLogin ? "Login with Google" : "Sign Up with Google"}
            </button>
            <button className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition transform hover:scale-105">
              <FaApple />
              {isLogin ? "Login with Apple" : "Sign Up with Apple"}
            </button>
            <p className="mt-6 text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={toggleForm}
                className="text-blue-600 hover:text-blue-800 underline font-bold transition"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
