'use client';

import { useState, useEffect } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Button from './Button';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import images (using hero.jpg as fallback since specific hero images don't exist yet)
import hero1Img from '../../public/images/slider1.jpg';
import hero2Img from '../../public/images/slider2.jpg';
import hero3Img from '../../public/images/slider3.jpg';

const Hero = ({ scrollToSection }) => {
  // List of images for the slider with corresponding text content
  const heroSlides = [
    {
      id: 1,
      image: hero1Img,
      alt: "CORE Karachi - Elite Fitness Performance Center",
      heading: 'CORE KARACHI: ELITE PERFORMANCE. ELEVATED.',
      subheading: 'Karachi’s most premium fitness destination.'
    },
    {
      id: 2,
      image: hero2Img,
      alt: "CORE Karachi - Premium Gym Equipment",
      heading: 'WHAT’S YOUR CORE?',
      subheading: 'Push your limits with our world-class trainers and equipment.'
    },
    {
      id: 3,
      image: hero3Img,
      alt: "CORE Karachi - Professional Training",
      heading: 'SHAPE YOUR BODY, SHAPE YOUR LIFE',
      subheading: 'Join the community that redefines fitness in Pakistan.'
    },
  ];

  return (
    <section className="relative overflow-hidden mt-16 h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
          }}
          effect="fade"
          className="h-full w-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full w-full">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={true}
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Slide-specific content */}
                <div className="container mx-auto px-4 absolute inset-0 flex items-center">
                  <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight uppercase italic">
                      {slide.heading}
                    </h1>
                    <p className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto">
                      {slide.subheading}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => scrollToSection('contact')}
                        aria-label="Join Now"
                        className="animate-fade-in-up"
                      >
                        Join Now
                      </Button>
                      <Button
                        variant="outline-orange"
                        size="lg"
                        onClick={() => scrollToSection('membership')}
                        aria-label="View Membership Plans"
                        className="animate-fade-in-up"
                      >
                        View Plans
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom pagination container */}
        <div className="custom-pagination absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex justify-center space-x-2"></div>
      </div>
    </section>
  );
};

export default Hero;