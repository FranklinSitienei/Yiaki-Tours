import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FaPlane, FaShip, FaBus, FaTrain } from "react-icons/fa";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShareAlt,
  AiOutlineLink,
} from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaWhatsapp, FaTiktok, FaInstagram, FaSnapchat, FaFacebook } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TourDetails = ({ tours }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTransport, setSelectedTransport] = useState("plane");
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const tour = tours.find((tour) => tour.id.toString() === id);

  if (!tour) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-grow">
          <p className="text-xl font-semibold">Tour not found</p>
          <Button className="mt-4" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2" /> Go Back
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedTours = tours.filter(
    (relatedTour) =>
      relatedTour.category === tour.category && relatedTour.id !== tour.id
  );

  const transportOptions = {
    plane: { icon: <FaPlane className="text-blue-600 text-xl" />, label: "Airplane", cost: 300 },
    ship: { icon: <FaShip className="text-blue-600 text-xl" />, label: "Cruise Ship", cost: 200 },
    bus: { icon: <FaBus className="text-blue-600 text-xl" />, label: "Bus", cost: 100 },
    train: { icon: <FaTrain className="text-blue-600 text-xl" />, label: "Train", cost: 150 },
  };

  const calculatePrice = () => tour.basePrice + transportOptions[selectedTransport].cost;

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
              Such a nice pick you selected!
            </h1>
            <p className="max-w-2xl text-lg text-white/90 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Get Ready to experience travels that connect you with the world's most breathtaking natural environments.
            </p>
          </div>
        </section>
      <motion.div
        className="p-4 max-w-4xl mx-auto flex-grow"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="rounded-2xl shadow-lg relative">
          <motion.img
            src={tour.image}
            alt={tour.title}
            className="rounded-t-2xl w-full h-64 object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute top-4 left-4 cursor-pointer"
            whileTap={{ scale: 0.8 }}
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-8 h-8 bg-white rounded-full p-1 shadow-md text-gray-800" />
          </motion.div>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">{tour.title}</h2>
            <p className="text-gray-600 mb-4">{tour.description}</p>
            <div className="mb-4">
              <p className="text-lg font-semibold mb-2">Select Transport:</p>
              <div className="flex space-x-4">
                {Object.keys(transportOptions).map((key) => (
                  <button
                    key={key}
                    className={`flex items-center space-x-2 border px-4 py-2 rounded-lg ${
                      selectedTransport === key ? "bg-blue-100 border-blue-500" : "bg-gray-100"
                    }`}
                    onClick={() => setSelectedTransport(key)}
                  >
                    {transportOptions[key].icon}
                    <span>{transportOptions[key].label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="text-lg font-semibold">Price: ${calculatePrice()}</p>
              <Button className="px-6 py-2">Book Now</Button>
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <motion.div
                className="cursor-pointer"
                whileTap={{ scale: 0.8 }}
                onClick={() => setLiked(!liked)}
              >
                {liked ? (
                  <AiFillHeart className="text-red-600 w-6 h-6" />
                ) : (
                  <AiOutlineHeart className="text-gray-600 w-6 h-6" />
                )}
              </motion.div>
              <motion.div
                className="cursor-pointer"
                whileTap={{ scale: 0.8 }}
                onClick={() => setBookmarked(!bookmarked)}
              >
                {bookmarked ? (
                  <BsBookmarkFill className="text-blue-600 w-6 h-6" />
                ) : (
                  <BsBookmark className="text-gray-600 w-6 h-6" />
                )}
              </motion.div>
              <div className="relative">
                <motion.div
                  className="cursor-pointer"
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setShowShareMenu(!showShareMenu)}
                >
                  <AiOutlineShareAlt className="text-gray-600 w-6 h-6" />
                </motion.div>
                {showShareMenu && (
                  <motion.div
                    className="absolute top-8 left-0 bg-white shadow-lg rounded-lg p-3 flex flex-col space-y-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button className="flex items-center space-x-2">
                      <FaWhatsapp className="text-green-500 w-5 h-5" />
                      <span>WhatsApp</span>
                    </button>
                    <button className="flex items-center space-x-2">
                      <FaTiktok className="text-black w-5 h-5" />
                      <span>TikTok</span>
                    </button>
                    <button className="flex items-center space-x-2">
                      <FaInstagram className="text-pink-500 w-5 h-5" />
                      <span>Instagram</span>
                    </button>
                    <button className="flex items-center space-x-2">
                      <FaSnapchat className="text-yellow-500 w-5 h-5" />
                      <span>Snapchat</span>
                    </button>
                    <button className="flex items-center space-x-2">
                      <FaFacebook className="text-blue-600 w-5 h-5" />
                      <span>Facebook</span>
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Related Tours</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTours.map((relatedTour) => (
              <motion.div
                key={relatedTour.id}
                whileHover={{ scale: 1.05 }}
                className="shadow-lg rounded-2xl overflow-hidden"
              >
                <img
                  src={relatedTour.image}
                  alt={relatedTour.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold">{relatedTour.title}</h4>
                  <p className="text-gray-600">{relatedTour.category}</p>
                  <Button
                    className="mt-2"
                    onClick={() => navigate(`/tour/${relatedTour.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default TourDetails;
