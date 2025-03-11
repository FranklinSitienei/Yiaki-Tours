import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TourDetails = ({ tours }) => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.div
        className="p-4 max-w-4xl mx-auto flex-grow"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <Button className="mb-4 mt-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2" /> Back to Tours
        </Button>
        <Card className="rounded-2xl shadow-lg">
          <motion.img
            src={tour.image}
            alt={tour.title}
            className="rounded-t-2xl w-full h-64 object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">{tour.title}</h2>
            <p className="text-gray-600 mb-4">{tour.description}</p>
            <div className="flex justify-between items-center mt-4">
              <p className="text-lg font-semibold">Price: ${tour.price}</p>
              <Button className="px-6 py-2">Book Now</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <Footer />
    </div>
  );
};

export default TourDetails;
