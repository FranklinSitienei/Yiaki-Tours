import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typewriter from 'typewriter-effect';
import { Map, Shield, Users, Calendar } from 'lucide-react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
    // Initialize animations
    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: 'ease-in-out',
            once: true,
        });
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* Hero Section */}
                <section
                    className="relative bg-cover bg-center h-[60vh] flex items-center justify-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1600&q=80')",
                    }}
                >
                    <div className="bg-black/50 w-full h-full absolute inset-0" />
                    <h1
                        className="relative z-10 text-4xl md:text-6xl text-white font-serif font-bold text-center"
                        data-aos="fade-down"
                    >
                        <Typewriter
                            options={{
                                strings: [
                                    'Your Trip, Your Way – Personalized Just for You',
                                    'Let’s Create Unforgettable Memories Together',
                                ],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </h1>
                </section>

                {/* About Section */}
                <section className="py-16 px-6 bg-gray-100">
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

                        {/* Text Content */}
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
                                to="/contact"
                                className="inline-flex items-center gap-2 text-nature-700 font-medium hover:underline"
                            >
                                Get Started with Planning
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Founder Section */}
                <section className="py-16 px-6 bg-gradient-to-r from-green-200 via-white-300 to-green-400">
                    <div className="container mx-auto text-center" data-aos="fade-up">
                        <h2 className="text-4xl font-serif font-semibold mb-6">Meet Yiaki</h2>
                        <p className="max-w-3xl mx-auto mb-8">
                            Hi, I’m Yiaki, a passionate traveler and the founder of Travel with Yiaki. I believe in helping
                            others explore the world without stress, offering tailored experiences that suit your unique style,
                            budget, and preferences.
                        </p>

                    </div>
                </section>
                <section className="py-24 bg-gradient-to-r from-green-200 via-white-300 to-green-400">
                    <div className="text-center mb-12" data-aos="fade-up">
                        <h2 className="text-4xl font-serif font-semibold text-black mb-3">
                            Meet Our Team
                        </h2>
                        <p className="text-black max-w-3xl mx-auto">
                            Our dedicated team of adventurers, educators, and guides are here to ensure every journey is memorable.
                        </p>
                    </div>
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, index) => (
                            <div
                                key={index}
                                className="relative rounded-xl overflow-hidden shadow-lg"
                                data-aos="zoom-in"
                            >
                                <img
                                    src={`https://i.pravatar.cc/300?img=${index + 1}`}
                                    alt={`Team Member ${index + 1}`}
                                    className="w-full h-60 object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold">
                                    Team Member {index + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default AboutUs;
