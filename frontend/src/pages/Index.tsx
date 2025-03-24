import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import FeaturedTours from '../components/FeaturedTours';
import TestimonialSection from '../components/TestimonialSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight, Calendar, ChevronRight, Map, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Featured Tours Section */}
        <FeaturedTours />

        {/* About Section */}
        <section className="section py-24 bg-gradient-nature">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div data-aos="fade-right" className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80"
                  alt="Beautiful nature landscape"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div data-aos="fade-left">
              <span className="inline-block py-1 px-3 mb-3 text-sm font-medium rounded-full bg-nature-100 text-nature-700">
                About Us
              </span>
              <h2 className="text-4xl font-serif font-semibold text-gray-900 mb-6">
                Your Personalized Travel Planning Experts
              </h2>
              <p className="text-gray-600 mb-6">
                At <strong>Travel with Yiaki</strong>, we believe travel is about experiencing the world in your own
                unique way. Our mission is to eliminate the stress of planning and help you create unforgettable
                memories tailored to your preferences, budget, and style. From flight bookings to handpicked
                activities, we've got you covered.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-nature-100 flex items-center justify-center text-nature-700">
                    <Map className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Expert Guides</h3>
                    <p className="text-sm text-gray-600">Knowledgeable local experts lead all tours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-nature-100 flex items-center justify-center text-nature-700">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Safety First</h3>
                    <p className="text-sm text-gray-600">Comprehensive safety protocols on all tours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-nature-100 flex items-center justify-center text-nature-700">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Small Groups</h3>
                    <p className="text-sm text-gray-600">Intimate experiences with like-minded travelers</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-nature-100 flex items-center justify-center text-nature-700">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Flexible Dates</h3>
                    <p className="text-sm text-gray-600">Multiple departure options year-round</p>
                  </div>
                </div>
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-nature-700 font-medium animated-link"
              >
                Learn More About Us
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Destinations Section */}
        <section className="section py-24 bg-gray-50">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 mb-3 text-sm font-medium rounded-full bg-nature-100 text-nature-700">
              Explore
            </span>
            <h2 className="text-section-title font-serif font-semibold text-gray-900">
              Popular Destinations
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Discover stunning locations where our tours take place, each offering unique
              landscapes and unforgettable experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alpine Mountains",
                location: "Switzerland & Austria",
                image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?auto=format&fit=crop&w=800&q=80",
                count: 5
              },
              {
                name: "Ancient Forests",
                location: "Pacific Northwest",
                image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
                count: 4
              },
              {
                name: "Desert Landscapes",
                location: "Southwest USA",
                image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?auto=format&fit=crop&w=800&q=80",
                count: 3
              }
            ].map((destination, index) => (
              <div
                key={index}
                className="group relative h-80 rounded-xl overflow-hidden shadow-sm"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-colors duration-300" />

                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                  <h3 className="text-xl font-serif font-semibold mb-1">
                    {destination.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/80">
                      {destination.location}
                    </span>
                    <span className="text-sm bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      {destination.count} Tours
                    </span>
                  </div>
                  <Link
                    to={`/destinations/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="absolute inset-0 z-10"
                    aria-label={`Explore ${destination.name}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/destinations"
              className="inline-flex items-center justify-center py-2.5 px-5 bg-nature-600 text-white rounded-md font-medium transition-colors duration-300 hover:bg-nature-700 group"
            >
              View All Destinations
              <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialSection />

        {/* Newsletter Section */}
        <section className="bg-nature-800 text-white py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-section-title font-serif font-semibold mb-3">
                Join Our Newsletter
              </h2>
              <p className="text-nature-100 mb-8">
                Subscribe to receive travel inspiration, exclusive offers, and updates on our newest adventures.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-md bg-nature-700 text-white placeholder-nature-300 flex-1 border border-nature-600 focus:outline-none focus:ring-2 focus:ring-nature-500"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-white text-nature-800 font-medium rounded-md hover:bg-gray-100 transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-nature-300 mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
