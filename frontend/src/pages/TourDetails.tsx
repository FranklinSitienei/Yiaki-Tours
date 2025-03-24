import React, { useState, useEffect } from "react";
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
} from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaWhatsapp, FaTiktok, FaInstagram, FaSnapchat, FaFacebook } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [liked, setLiked] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState("plane");
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`http://localhost:3000/tours/${id}`);
        const data = await res.json();
        setTour(data);
      } catch (err) {
        console.error("Failed to fetch tour:", err);
      }
    };

    fetchTour();
  }, [id]);

  const transportOptions = {
    plane: { label: "Airplane", cost: 300, icon: <FaPlane /> },
    ship: { label: "Cruise Ship", cost: 200, icon: <FaShip /> },
    bus: { label: "Bus", cost: 100, icon: <FaBus /> },
    train: { label: "Train", cost: 150, icon: <FaTrain /> },
  };

  const handleBooking = async () => {
    try {
      const res = await fetch(`http://localhost:3000/tours/${id}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // if using cookies/auth
      });

      if (res.ok) {
        setBooked(true);
        navigate("/payment");
      } else {
        const error = await res.json();
        alert(`Booking failed: ${error.message}`);
      }
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  if (!tour) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl font-semibold">Loading tour details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const totalPrice = parseFloat(tour.price) + transportOptions[selectedTransport].cost;

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
      <main className="flex-grow p-4 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="rounded-2xl shadow-lg">
            <img src={tour.image} alt={tour.title} className="rounded-t-2xl w-full h-64 object-cover" />
            <CardContent className="p-6">
              <h2 className="text-3xl font-bold mb-4">{tour.title}</h2>
              <p className="text-gray-600 mb-4">{tour.description || "No description available."}</p>

              <div className="mb-4">
                <p className="font-semibold">Select Transport:</p>
                <div className="flex space-x-4 mt-2">
                  {Object.entries(transportOptions).map(([key, option]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedTransport(key)}
                      className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${
                        selectedTransport === key ? "bg-blue-100 border-blue-500" : "bg-gray-100"
                      }`}
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <p className="text-lg font-semibold">Total Price: ${totalPrice.toFixed(2)}</p>
                <Button
                  onClick={handleBooking}
                  disabled={booked}
                  className={booked ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {booked ? "Booked" : "Book Now"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      </main>
      <Footer />
    </div>
  );
};

export default TourDetails;
