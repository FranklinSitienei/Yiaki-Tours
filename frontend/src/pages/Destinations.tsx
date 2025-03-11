import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { allTours } from "./ToursData";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const DestinationPage = () => {
  const handleCountryClick = (geo) => {
    alert(`You clicked on ${geo.properties.name}`);
  };

  return (
    <div className="bg-gray-100 text-gray-800">
      <Navbar />
      <main className="flex-grow">
        {/* Header Section */}
        <section className="relative h-80 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80')",
              filter: "brightness(0.7)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
          <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 animate-fade-in">
              Choose Your Destinations
            </h1>
            <p
              className="max-w-2xl text-lg text-white/90 mb-6 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Discover Your Next Adventure
            </p>
          </div>
        </section>

        {/* Categories */}
        <div className="py-16 px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Explore Different Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {allTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                className="destination-card overflow-hidden rounded-2xl shadow-lg bg-white"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{tour.title}</h3>
                  <p className="text-sm text-gray-600">
                    {tour.location} • {tour.duration}
                  </p>
                  <p className="text-lg font-semibold text-green-600 mt-2">
                    ${tour.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Destinations Carousel */}
        <div className="py-16 px-8 bg-white">
          <h2 className="text-3xl font-bold text-center mb-8">
            Top Destinations
          </h2>
          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {allTours.map((tour) => (
              <SwiperSlide key={tour.id}>
                <motion.div
                  className="rounded-2xl overflow-hidden shadow-md bg-white"
                  whileHover={{ scale: 1.1 }}
                >
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-48 object-cover"
                  />
                  <h3 className="text-lg font-semibold p-4">{tour.title}</h3>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Interactive Map */}
        <div className="py-16 px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Interactive Map
          </h2>
          <div className="w-full h-96">
            <ComposableMap>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <motion.g
                      key={geo.rsmKey}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleCountryClick(geo)}
                    >
                      <Geography
                        geography={geo}
                        style={{
                          default: { fill: "#D6D6DA" },
                          hover: { fill: "#F53" },
                          pressed: { fill: "#E42" },
                        }}
                      />
                    </motion.g>
                  ))
                }
              </Geographies>
            </ComposableMap>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DestinationPage;
