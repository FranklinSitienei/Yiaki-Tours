import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, Calendar, Heart, Edit } from "lucide-react";
import { allTours } from "./ToursData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("bookmarks");

  // Dummy user data
  const user = {
    name: "Dennis Mutungwo",
    email: "dennismutungwo@gmail.com",
    avatar: "https://i.pravatar.cc/300?",
  };

  const renderCards = (filterKey) => {
    const filteredTours = allTours.filter((tour) => filterKey.includes(tour.id));
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTours.map((tour) => (
          <motion.div
            key={tour.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition relative"
          >
            <img
              src={tour.image}
              alt={tour.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{tour.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{tour.location}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-blue-600 font-semibold">${tour.price}</span>
                <span className="text-yellow-500">⭐ {tour.rating}</span>
              </div>
            </div>
            <div
              className={`absolute top-2 right-2 p-2 rounded-full text-white shadow-lg ${
                activeTab === "bookmarks"
                  ? "bg-blue-500"
                  : activeTab === "bookings"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {activeTab === "bookmarks" ? <Bookmark /> : activeTab === "bookings" ? <Calendar /> : <Heart />}
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "bookmarks":
        return renderCards([1, 2]); // Replace with bookmarked tour IDs
      case "bookings":
        return renderCards([3, 4]); // Replace with booked tour IDs
      case "liked":
        return renderCards([5, 6]); // Replace with liked tour IDs
      default:
        return null;
    }
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
              filter: "brightness(0.6)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
          <div className="relative h-full flex flex-col justify-end px-6 pb-4">
            <div className="flex items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-md mr-4"
              />
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-bold">{user.name}</h1>
                <p className="text-lg text-white/90">{user.email}</p>
              </div>
            </div>
            <button
              className="absolute bottom-4 right-6 bg-nature-900 text-white py-2 px-4 rounded-lg flex items-center shadow-lg hover:bg-transparent"
            >
              <Edit className="w-5 h-5 mr-2" />
            </button>
          </div>
        </section>
        
        {/* Bottom Navbar */}
        <nav className="flex justify-around items-center bg-white p-4 shadow-inner sticky top-0 z-50">
          <motion.button
            onClick={() => setActiveTab("bookmarks")}
            whileHover={{ scale: 1.1 }}
            className={`flex flex-col items-center ${
              activeTab === "bookmarks" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <Bookmark className="w-6 h-6 mb-1" />
            <span className="text-sm">Bookmarks</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveTab("bookings")}
            whileHover={{ scale: 1.1 }}
            className={`flex flex-col items-center ${
              activeTab === "bookings" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <Calendar className="w-6 h-6 mb-1" />
            <span className="text-sm">Bookings</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveTab("liked")}
            whileHover={{ scale: 1.1 }}
            className={`flex flex-col items-center ${
              activeTab === "liked" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <Heart className="w-6 h-6 mb-1" />
            <span className="text-sm">Liked</span>
          </motion.button>
        </nav>

        {/* Content Area */}
        <div className="flex-grow p-6 overflow-y-auto">{renderContent()}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
