import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();


  // On mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
  
        const res = await fetch("http://localhost:3000/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch user in navbar:", err);
      }
    };
  
    fetchUser();
  }, []);  

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

  const handleLogout = () => {
    setIsLoggedIn(false); // Simulating logout action
    setShowAccountDropdown(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/90 backdrop-blur-md shadow-sm py-2'
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

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold uppercase">
                      {user.firstName?.[0]}
                    </div>
                  )}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showAccountDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-nature-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.clear();
                        setUser(null);
                        setShowAccountDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-nature-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isScrolled ? 'text-gray-700 hover:text-nature-700' : 'text-black hover:bg-white/10'
                  }`}
              >
                Login/Signup
              </Link>
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
        className={`md:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
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
              <Link
                to="/login"
                className="px-4 py-2 w-full text-center text-lg rounded-md font-medium text-black hover:bg-white/10"
              >
                Login/Signup
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
