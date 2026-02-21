import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaQuoteRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Ahmed Khan",
      role: "Professional Athlete",
      content: "CORE Karachi transformed my performance. The equipment and trainers are world-class, and the view from Ocean Tower is unmatched.",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Ahmed",
      role: "Fitness Enthusiast",
      content: "The elite atmosphere and premium facilities make every workout feel like a luxury. The 14th floor sanctuary is exactly what I needed.",
      rating: 5
    },
    {
      id: 3,
      name: "Mehdi Hassan",
      role: "Corporate Executive",
      content: "Incredible attention to detail and world-class conditioning. The team here understands what it means to demand excellence.",
      rating: 5
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-black/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 uppercase italic tracking-wider">What Our Members Say</h2>
          <p className="text-xl text-core-gray-300 max-w-3xl mx-auto">Real stories from the elite performers who call CORE Karachi home</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-core-gray-800/50 border border-core-gray-700 rounded-lg p-8 relative overflow-hidden group hover:border-2 hover:border-brand-primary hover:shadow-[0_0_25px_rgba(255,102,0,0.6)] hover:bg-brand-primary/10 transition-all duration-500">
                    {/* Decorative quote */}
                    <div className="absolute top-4 right-6 opacity-10">
                      <FaQuoteLeft className="w-16 h-16 text-core-red" />
                    </div>

                    <div className="relative z-10">
                      {/* Rating stars */}
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-core-orange" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      <div className="flex items-start mb-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-6 border-2 border-core-gray-700" aria-label={`${testimonial.name} - ${testimonial.role}`} role="img">
                          <div className="w-full h-full bg-gradient-to-br from-core-red to-core-orange flex items-center justify-center text-white font-bold text-xl">
                            {testimonial.name.charAt(0)}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white">{testimonial.name}</h4>
                          <p className="text-core-orange italic">{testimonial.role}</p>
                        </div>
                      </div>

                      <div className="relative">
                        <FaQuoteLeft className="w-6 h-6 text-core-red mb-3" aria-hidden="true" />
                        <p className="text-core-gray-300 text-lg italic leading-relaxed">
                          "{testimonial.content}"
                        </p>
                        <FaQuoteRight className="w-6 h-6 text-core-red mt-3 ml-auto" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-core-gray-800 hover:bg-core-red border border-core-gray-700 hover:border-core-red text-white p-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300 z-20"
            aria-label="Previous testimonial"
            title="Previous testimonial"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-core-gray-800 hover:bg-core-red border border-core-gray-700 hover:border-core-red text-white p-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300 z-20"
            aria-label="Next testimonial"
            title="Next testimonial"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-core-red' : 'bg-core-gray-700'
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

export default Testimonials;