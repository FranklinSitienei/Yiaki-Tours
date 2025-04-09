import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, Calendar, MapPin, Users, Clock, ArrowUpDown, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Tours = () => {
  const [tours, setTours] = useState([]);
const [displayedTours, setDisplayedTours] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    difficulty: [] as string[],
    category: [] as string[],
    priceRange: { min: 0, max: 3000 }
  });
  const [sortBy, setSortBy] = useState<string>("price-low");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch tours from backend
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("https://yiaki-tours.onrender.com/tours");
        if (!response.ok) throw new Error(`Error fetching tours: ${response.statusText}`);
        const data = await response.json();
        setTours(data);
        setDisplayedTours(data); // also store initial unfiltered data
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      }
    };
  
    fetchTours();
  }, []);
  

  // Filter and sort tours
  useEffect(() => {
    let filtered = [...tours];
  
    if (searchTerm) {
      filtered = filtered.filter(tour =>
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    if (filters.difficulty.length > 0) {
      filtered = filtered.filter(tour =>
        filters.difficulty.includes(tour.difficulty)
      );
    }
  
    if (filters.category.length > 0) {
      filtered = filtered.filter(tour =>
        filters.category.includes(tour.category)
      );
    }
  
    filtered = filtered.filter(tour =>
      tour.price >= filters.priceRange.min && tour.price <= filters.priceRange.max
    );
  
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "duration") {
      filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    }
  
    setDisplayedTours(filtered);
  }, [searchTerm, filters, sortBy, tours]);
  

  const toggleFilter = (type: 'difficulty' | 'category', value: string) => {
    setFilters(prev => {
      const current = [...prev[type]];
      if (current.includes(value)) {
        return {
          ...prev,
          [type]: current.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [type]: [...current, value]
        };
      }
    });
  };

  const handlePriceChange = (min: number, max: number) => {
    setFilters(prev => ({
      ...prev,
      priceRange: { min, max }
    }));
  };

  const clearFilters = () => {
    setFilters({
      difficulty: [],
      category: [],
      priceRange: { min: 0, max: 3000 }
    });
    setSearchTerm("");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
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
        
        {/* Search and Filter Section */}
        <section className="py-8 bg-white shadow-sm sticky top-0 z-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full md:w-auto md:flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search tours by name or location..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nature-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                {/* Sort Dropdown */}
                <div className="relative w-1/2 md:w-auto">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="appearance-none w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-nature-500 focus:border-transparent"
                  >
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                    <option value="duration">Duration</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ArrowUpDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                {/* Filter Button (Mobile) */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2 w-1/2 md:w-auto justify-center bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </button>
              </div>
            </div>
            
            {/* Active Filters */}
            {(filters.difficulty.length > 0 || filters.category.length > 0 || searchTerm) && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                
                {filters.difficulty.map(diff => (
                  <span key={diff} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-nature-100 text-nature-700">
                    {diff}
                    <button
                      onClick={() => toggleFilter('difficulty', diff)}
                      className="ml-1 focus:outline-none"
                      aria-label={`Remove ${diff} filter`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                
                {filters.category.map(cat => (
                  <span key={cat} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-nature-100 text-nature-700">
                    {cat}
                    <button
                      onClick={() => toggleFilter('category', cat)}
                      className="ml-1 focus:outline-none"
                      aria-label={`Remove ${cat} filter`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                
                {searchTerm && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-nature-100 text-nature-700">
                    "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm("")}
                      className="ml-1 focus:outline-none"
                      aria-label="Clear search"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                
                <button
                  onClick={clearFilters}
                  className="text-sm text-nature-700 hover:text-nature-800 font-medium hover:underline ml-2"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </section>
        
        {/* Tours Grid Section */}
        <section className="section py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar (Desktop) */}
            <aside className={`lg:w-72 shrink-0 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-32 bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium">Filters</h3>
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-nature-700 hover:text-nature-800 font-medium"
                  >
                    Reset
                  </button>
                </div>
                
                {/* Difficulty Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Difficulty</h4>
                  <div className="space-y-2">
                    {['Easy', 'Moderate', 'Challenging'].map(level => (
                      <label key={level} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.difficulty.includes(level)}
                          onChange={() => toggleFilter('difficulty', level)}
                          className="rounded border-gray-300 text-nature-600 shadow-sm focus:border-nature-300 focus:ring focus:ring-nature-200 focus:ring-opacity-50"
                        />
                        <span className="ml-2 text-gray-700">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Category</h4>
                  <div className="space-y-2">
                    {['Hiking', 'Wildlife', 'Photography', 'Cultural'].map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.category.includes(category)}
                          onChange={() => toggleFilter('category', category)}
                          className="rounded border-gray-300 text-nature-600 shadow-sm focus:border-nature-300 focus:ring focus:ring-nature-200 focus:ring-opacity-50"
                        />
                        <span className="ml-2 text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Price Range Filter */}
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <label className="text-xs text-gray-500">Min</label>
                      <input
                        type="number"
                        min="0"
                        max={filters.priceRange.max}
                        value={filters.priceRange.min}
                        onChange={e => handlePriceChange(Number(e.target.value), filters.priceRange.max)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Max</label>
                      <input
                        type="number"
                        min={filters.priceRange.min}
                        max="10000"
                        value={filters.priceRange.max}
                        onChange={e => handlePriceChange(filters.priceRange.min, Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    step="100"
                    value={filters.priceRange.max}
                    onChange={e => handlePriceChange(filters.priceRange.min, Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>$0</span>
                    <span>$3,000+</span>
                  </div>
                </div>
              </div>
            </aside>
            
            {/* Tours Grid */}
            <div className="flex-1">
            {displayedTours.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium mb-2">No tours found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-nature-600 text-white rounded-md hover:bg-nature-700 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayedTours.map((tour, index) => (
                    <div 
                      key={tour.id}
                      className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md"
                    >
                      {/* Tour Image */}
                      <div className="relative h-48 overflow-hidden">
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
                        
                        {/* Difficulty Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={`
                            text-xs font-medium px-2 py-1 rounded-full 
                            ${tour.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                              tour.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'}
                          `}>
                            {tour.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      {/* Tour Info */}
                      <div className="p-5">
                        <h3 className="text-lg font-serif font-semibold mb-2 text-gray-900">
                          {tour.title}
                        </h3>
                        
                        <div className="flex items-center text-gray-600 mb-4">
                          <MapPin className="w-4 h-4 mr-1 text-nature-600" />
                          <span className="text-sm">{tour.location}</span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 mb-5">
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
                            <span className="text-xs text-gray-600">{tour.category}</span>
                          </div>
                        </div>
                        
                        <Link 
                          to={`/tour/${tour.id}`} 
                          className="block w-full py-2.5 text-center bg-nature-600 text-white rounded-md font-medium transition-colors duration-300 hover:bg-nature-700"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tours;
