import React, { useState } from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = isLogin
      ? "https://yiaki-tours.onrender.com/users/login"
      : "https://yiaki-tours.onrender.com/users/register";

    const payload = isLogin
      ? {
        email: formData.email,
        password: formData.password,
      }
      : {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Something went wrong.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/"); // redirect after login
    } catch (error) {
      console.error("Auth error:", error);
      alert("Authentication failed.");
    }
  };

  const handleOAuthLogin = (provider: "google" | "apple") => {
    window.location.href = `https://yiaki-tours.onrender.com/users/auth/${provider}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-10 bg-gradient-to-r from-white via-green-300 to-nature-300">
        <div
          className={`flex flex-col md:flex-row w-11/12 max-w-6xl shadow-2xl rounded-lg overflow-hidden transform transition-all duration-700 mt-8 ${isLogin ? "animate-flipLogin" : "animate-flipSignup"
            }`}
        >

          {/* Left Image */}
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

          {/* Right Form */}
          <div className="w-1/2 bg-white flex flex-col items-center justify-center py-10 px-8 h-full">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              {isLogin ? "Login" : "Sign Up"}
            </h2>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>

              {!isLogin && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-600 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                  </div>
                </>
              )}

              <div className="mb-6">
                <label className="block text-gray-600 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>

              {!isLogin && (
                <div className="mb-6">
                  <label className="block text-gray-600 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
              <div className="h-px w-full bg-gray-300" />
              <span className="mx-4 text-gray-500">OR</span>
              <div className="h-px w-full bg-gray-300" />
            </div>

            <button
              onClick={() => handleOAuthLogin("google")}
              className="w-full flex items-center justify-center gap-3 bg-gray-50 text-black py-2 rounded-lg hover:bg-gray-200 transition transform hover:scale-105 mb-3"
            >
              <FcGoogle />
              {isLogin ? "Login with Google" : "Sign Up with Google"}
            </button>

            <button
              onClick={() => handleOAuthLogin("apple")}
              className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition transform hover:scale-105"
            >
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
