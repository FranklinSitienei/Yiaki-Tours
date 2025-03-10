
import React, { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      
      const scrollPosition = window.scrollY;
      const opacity = Math.max(0, 1 - scrollPosition / 700);
      const translateY = scrollPosition * 0.4;
      
      heroRef.current.style.opacity = opacity.toString();
      heroRef.current.style.transform = `translateY(${translateY}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToContent = () => {
    const contentElement = document.getElementById('featured-tours');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80')",
          filter: "brightness(0.8)",
        }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-nature-900/20" />
      
      {/* Hero Content */}
      <div 
        ref={heroRef}
        className="relative h-full flex flex-col justify-center items-center px-6 text-center text-white"
      >
        <div className="animate-slide-down opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <span className="inline-block py-1 px-3 mb-4 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            Discover the world's natural wonders
          </span>
        </div>
        
        <h1 className="text-hero-title font-serif font-bold mb-6 max-w-4xl animate-slide-down opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          Experience the Beauty of <span className="hero-text-gradient">Nature's Finest Destinations</span>
        </h1>
        
        <p className="max-w-2xl mb-8 text-lg text-white/80 animate-slide-down opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          Handcrafted journeys to the world's most breathtaking landscapes, 
          from dense forests to mountain peaks and pristine waters.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <Link
            to="/tours"
            className="px-6 py-3 rounded-md bg-nature-600 text-white font-medium hover:bg-nature-700 transition-all duration-300 flex items-center gap-2 group"
          >
            Explore Tours
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          
          <Link
            to="/destinations"
            className="px-6 py-3 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300"
          >
            View Destinations
          </Link>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <button 
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </div>
  );
};

export default Hero;
