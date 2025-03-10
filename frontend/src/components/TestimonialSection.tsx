
import React, { useState, useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    quote: "The Alpine Wilderness Trek was life-changing! The guides were knowledgeable and the landscapes were beyond breathtaking. I'll never forget watching the sunrise over those majestic peaks.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Vancouver, Canada",
    quote: "I was amazed by how thoughtfully the Ancient Forest Expedition was planned. Every detail was perfect, from the sustainable camping to the hidden viewpoints. It reconnected me with nature in ways I didn't expect.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Barcelona, Spain",
    quote: "The Desert Canyon Adventure pushed me outside my comfort zone in the best way possible. The guides were supportive, and experiencing the canyon's majesty up close was worth every step of the journey.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
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
          entry.target.classList.add('animate-fade-in', 'opacity-100');
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="relative section py-24 opacity-0 transition-opacity duration-700 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-nature-100 rounded-full opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-nature-100 rounded-full opacity-30 blur-3xl translate-x-1/3 translate-y-1/3"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 mb-3 text-sm font-medium rounded-full bg-nature-100 text-nature-700">
            Experiences
          </span>
          <h2 className="text-section-title font-serif font-semibold text-gray-900">
            What Our Travelers Say
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Read the stories and experiences shared by adventurers who have embarked on our nature journeys.
          </p>
        </div>
        
        <div className="relative">
          {/* Quote Icon */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-nature-200">
            <Quote className="w-20 h-20" />
          </div>
          
          {/* Testimonials Carousel */}
          <div className="relative h-80 md:h-64">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 flex flex-col md:flex-row items-center gap-8 transition-all duration-700 ${
                  index === activeIndex 
                    ? 'opacity-100 translate-x-0 z-10' 
                    : index < activeIndex 
                      ? 'opacity-0 -translate-x-full z-0' 
                      : 'opacity-0 translate-x-full z-0'
                }`}
              >
                {/* Testimonial Image */}
                <div className="shrink-0">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Testimonial Content */}
                <div className="text-center md:text-left">
                  <p className="text-lg md:text-xl text-gray-700 font-serif italic mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-nature-600 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
