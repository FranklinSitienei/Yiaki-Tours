
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-nature-900 text-white">
      <div className="section pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - About */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-semibold mb-6">
              <MapPin className="text-nature-300" />
              <span className="font-serif text-white">NatureTrek</span>
            </Link>
            <p className="text-nature-100 mb-6">
              Connecting adventurers with the world's most breathtaking natural environments 
              through sustainable, immersive travel experiences.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="text-nature-200 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="text-nature-200 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" className="text-nature-200 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" className="text-nature-200 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/tours" className="text-nature-100 hover:text-white transition-colors inline-block animated-link">
                  Tours
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-nature-100 hover:text-white transition-colors inline-block animated-link">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-nature-100 hover:text-white transition-colors inline-block animated-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-nature-100 hover:text-white transition-colors inline-block animated-link">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#" className="text-nature-100 hover:text-white transition-colors inline-block animated-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-nature-100 hover:text-white transition-colors inline-block animated-link">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Popular Tours */}
          <div>
            <h3 className="text-lg font-medium mb-6">Popular Tours</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-nature-100 hover:text-white transition-colors inline-block animated-link">
                  Alpine Wilderness Trek
                </Link>
              </li>
              <li>
                <Link to="#" className="text-nature-100 hover:text-white transition-colors inline-block animated-link">
                  Ancient Forest Expedition
                </Link>
              </li>
              <li>
                <Link to="#" className="text-nature-100 hover:text-white transition-colors inline-block animated-link">
                  Desert Canyon Adventure
                </Link>
              </li>
              <li>
                <Link to="#" className="text-nature-100 hover:text-white transition-colors inline-block animated-link">
                  Coastal Wilderness Journey
                </Link>
              </li>
              <li>
                <Link to="#" className="text-nature-100 hover:text-white transition-colors inline-block animated-link">
                  Tropical Rainforest Discovery
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-lg font-medium mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-nature-300 shrink-0 mt-1" />
                <span className="text-nature-100">
                  Nairobi,<br /> Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-nature-300 shrink-0" />
                <a href="tel:+1-555-123-4567" className="text-nature-100 hover:text-white transition-colors">
                  0712345678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-nature-300 shrink-0" />
                <a href="mailto:info@naturetrek.com" className="text-nature-100 hover:text-white transition-colors">
                  info@yiakitours.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-nature-800 py-6">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-nature-300 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Yiaki Tours. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-nature-300 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <span className="text-nature-600">•</span>
            <a href="#" className="text-nature-300 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <span className="text-nature-600">•</span>
            <a href="#" className="text-nature-300 hover:text-white text-sm transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
