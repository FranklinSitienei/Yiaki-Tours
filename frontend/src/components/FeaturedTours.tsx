import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Tour {
  id: number;
  title: string;
  location: string;
  duration: string;
  groupSize: string;
  price: number;
  image: string;
  rating: number;
}

const FeaturedTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tours');
        const topThree = response.data.slice(0, 3); // pick top 3
        setTours(topThree);
      } catch (error) {
        console.error("Error fetching featured tours:", error);
      }
    };

    fetchTours();
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up', 'opacity-100');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [tours]);

  return (
    <section
      id="featured-tours"
      ref={sectionRef}
      className="section opacity-0 transition-opacity duration-700"
    >
      <div className="text-center mb-12">
        <span className="inline-block py-1 px-3 mb-3 text-sm font-medium rounded-full bg-nature-100 text-nature-700">
          Premium Experiences
        </span>
        <h2 className="text-section-title font-serif font-semibold text-gray-900">
          Featured Tours
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          Discover our carefully selected tours in pristine natural environments,
          designed for unforgettable experiences and lasting memories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.map((tour, index) => (
          <div
            key={tour.id}
            ref={el => cardRefs.current[index] = el}
            className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 opacity-0 transition-all duration-700"
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            {/* Tour Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

              {/* Price Tag */}
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full font-medium text-sm shadow-sm">
                ${tour.price}
              </div>

              {/* Rating */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span>{tour.rating}</span>
              </div>
            </div>

            {/* Tour Info */}
            <div className="p-6">
              <h3 className="text-xl font-serif font-semibold mb-2 text-gray-900">
                {tour.title}
              </h3>

              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mr-1 text-nature-600" />
                <span className="text-sm">{tour.location}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="flex flex-col items-center justify-center py-2 bg-gray-50 rounded-md">
                  <Clock className="w-4 h-4 text-nature-600 mb-1" />
                  <span className="text-xs text-gray-600">{tour.duration}</span>
                </div>
                <div className="flex flex-col items-center justify-center py-2 bg-gray-50 rounded-md">
                  <Users className="w-4 h-4 text-nature-600 mb-1" />
                  <span className="text-xs text-gray-600">{tour.groupSize}</span>
                </div>
                <div className="flex flex-col items-center justify-center py-2 bg-gray-50 rounded-md">
                  <Calendar className="w-4 h-4 text-nature-600 mb-1" />
                  <span className="text-xs text-gray-600">All year</span>
                </div>
              </div>

              <Link
                to={`/tour/${tour.id}`}
                className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-nature-100 text-nature-700 rounded-md font-medium text-sm transition-colors duration-300 hover:bg-nature-200 hover:text-nature-800 group/link"
              >
                Tour Details
                <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover/link:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/tours"
          className="inline-flex items-center justify-center py-2.5 px-5 bg-nature-600 text-white rounded-md font-medium transition-colors duration-300 hover:bg-nature-700 group"
        >
          View All Tours
          <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedTours;
