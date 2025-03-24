// src/pages/Payment.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaMoneyCheckAlt,
  FaMobileAlt,
  FaUniversity,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const paymentOptions = [
  { id: "visa", label: "Visa", icon: <FaCcVisa className="text-blue-600 text-3xl" /> },
  { id: "mastercard", label: "MasterCard", icon: <FaCcMastercard className="text-red-600 text-3xl" /> },
  { id: "paypal", label: "PayPal", icon: <FaPaypal className="text-blue-700 text-3xl" /> },
  { id: "mpesa", label: "M-Pesa", icon: <FaMobileAlt className="text-green-600 text-3xl" /> },
  { id: "bank", label: "Bank Transfer", icon: <FaUniversity className="text-gray-700 text-3xl" /> },
];

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("visa");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // Retrieve price from sessionStorage or backend
    const storedPrice = sessionStorage.getItem("totalPrice");
    if (storedPrice) {
      setPrice(parseFloat(storedPrice));
    } else {
      setPrice(999); // fallback price
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Payment method "${selectedMethod}" submitted successfully.`);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Header Section */}
        <section className="relative h-80 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80')",
              filter: "brightness(0.7)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
          <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 animate-fade-in">
              Explore Our Tours
            </h1>
            <p className="max-w-2xl text-lg text-white/90 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Discover handcrafted travel experiences that connect you with the world's most breathtaking natural environments.
            </p>
          </div>
        </section>
        <motion.div
          className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-6">Select Payment Method</h2>
          <p className="text-center text-gray-600 mb-10">Total Amount: <span className="text-xl font-semibold">${price.toFixed(2)}</span></p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {paymentOptions.map((option, i) => (
              <motion.button
                key={option.id}
                onClick={() => setSelectedMethod(option.id)}
                className={`flex flex-col items-center justify-center p-4 border rounded-xl transition-all duration-300 shadow-sm ${
                  selectedMethod === option.id ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white"
                }`}
                variants={fadeIn}
                custom={i}
                initial="hidden"
                animate="show"
              >
                {option.icon}
                <span className="mt-2 text-sm font-medium">{option.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Animated Form Area */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {["visa", "mastercard", "bank"].includes(selectedMethod) && (
              <>
                <motion.div variants={fadeIn} initial="hidden" animate="show">
                  <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                  <input
                    required
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                    placeholder="John Doe"
                  />
                </motion.div>
                <motion.div variants={fadeIn} initial="hidden" animate="show">
                  <label className="block text-sm font-medium mb-1">Card Number</label>
                  <input
                    required
                    type="text"
                    maxLength={16}
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                    placeholder="1234 5678 9012 3456"
                  />
                </motion.div>
                <div className="flex gap-4">
                  <motion.div className="flex-1" variants={fadeIn} initial="hidden" animate="show">
                    <label className="block text-sm font-medium mb-1">Expiry</label>
                    <input
                      required
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-4 py-2"
                      placeholder="MM/YY"
                    />
                  </motion.div>
                  <motion.div className="flex-1" variants={fadeIn} initial="hidden" animate="show">
                    <label className="block text-sm font-medium mb-1">CVV</label>
                    <input
                      required
                      type="password"
                      maxLength={4}
                      className="w-full border border-gray-300 rounded-md px-4 py-2"
                      placeholder="•••"
                    />
                  </motion.div>
                </div>
              </>
            )}

            {selectedMethod === "paypal" && (
              <motion.div variants={fadeIn} initial="hidden" animate="show">
                <label className="block text-sm font-medium mb-1">PayPal Email</label>
                <input
                  required
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                  placeholder="you@example.com"
                />
              </motion.div>
            )}

            {selectedMethod === "mpesa" && (
              <motion.div variants={fadeIn} initial="hidden" animate="show">
                <label className="block text-sm font-medium mb-1">M-Pesa Mobile Number</label>
                <input
                  required
                  type="tel"
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                  placeholder="+2547XXXXXXX"
                />
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <Button type="submit" className="w-full mt-4">
                Confirm & Pay ${price.toFixed(2)}
              </Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
