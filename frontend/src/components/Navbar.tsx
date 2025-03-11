import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tours', path: '/tours' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogin = () => {
    setIsLoggedIn(true); // Simulating login action
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Simulating logout action
    setShowAccountDropdown(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-2 ' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-lg md:text-xl font-semibold transition-transform duration-300 hover:scale-105"
          >
            <MapPin className="text-nature-600" />
            <span className={`font-serif ${isScrolled ? 'text-nature-900' : 'text-nature-900'}`}>
              Yiaki Tours
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 
                  ${location.pathname === link.path 
                    ? 'text-nature-700 bg-nature-50/50' 
                    : isScrolled 
                      ? 'text-gray-700 hover:text-nature-700 hover:bg-nature-50/50' 
                      : 'text-black hover:text-white/90 hover:bg-white/10'
                  }
                `}
              >
                {link.name}
              </Link>
            ))}

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                  className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
                    isScrolled ? 'text-gray-700 hover:text-nature-700' : 'text-black hover:bg-white/10'
                  }`}
                >
                  Account
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showAccountDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md py-2">
                    <Link 
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-white/10"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-white/10"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isScrolled ? 'text-gray-700 hover:text-nature-700' : 'text-black hover:bg-white/10'
                  }`}
                >
                  Login
                </button>
                <Link
                  to="/signup"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isScrolled ? 'text-gray-700 hover:text-nature-700' : 'text-black hover:bg-white/10'
                  }`}
                >
                  Signup
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? 'text-gray-800' : 'text-black'} />
            ) : (
              <Menu className={isScrolled ? 'text-gray-800' : 'text-black'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-800"
              aria-label="Close menu"
            >
              <X />
            </button>
          </div>

          <nav className="flex flex-col items-center justify-center flex-1 space-y-6 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 w-full text-center text-lg rounded-md font-medium transition-colors
                  ${location.pathname === link.path 
                    ? 'text-nature-700 bg-nature-50' 
                    : 'text-gray-800 hover:text-nature-700 hover:bg-nature-50'
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="px-4 py-2 w-full text-center text-lg rounded-md font-medium text-gray-800 hover:bg-white/10"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 w-full text-center text-lg rounded-md font-medium text-gray-800 hover:bg-white/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 w-full text-center text-lg rounded-md font-medium text-black hover:bg-white/10"
                >
                  Login
                </button>
                <Link
                  to="/signup"
                  className="px-4 py-2 w-full text-center text-lg rounded-md font-medium text-black hover:bg-white/10"
                >
                  Signup
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;