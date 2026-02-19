'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from "@/components/Button";
import Card from "@/components/Card";
import Testimonials from "@/components/Testimonials";
import ReCAPTCHA from "react-google-recaptcha";
import { FaWhatsapp, FaMapMarkerAlt, FaClock, FaUser, FaEnvelope, FaPhone, FaBars, FaTimes, FaFacebook, FaInstagram, FaFacebookMessenger, FaMap } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

// Static imports for images
import heroImg from '../../public/images/hero.jpg';
import service1Img from '../../public/images/service1.jpg';
import service2Img from '../../public/images/service2.jpg';
import service3Img from '../../public/images/service3.jpg';
import service4Img from '../../public/images/service4.jpg';
import trainer1Img from '../../public/images/trainer1.jpg';
import trainer2Img from '../../public/images/trainer2.jpg';
import trainer3Img from '../../public/images/trainer3.jpg';
import trainer4Img from '../../public/images/trainer4.jpg';
import why1 from '../../public/images/why1.jpg';
import why2 from '../../public/images/why2.jpg';
import why3 from '../../public/images/why3.jpg';
import logoImg from '../../public/images/logo.png';

export default function Home() {
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  // EmailJS service and template configuration
  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_cdapukd';
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_attlpl6';
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your-public-key-here';

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    // Check reCAPTCHA
    if (!recaptchaValue) {
      setSubmitMessage({ type: 'error', text: 'Please verify that you are not a robot.' });
      setIsSubmitting(false);
      return;
    }

    const form = e.currentTarget;

    // Create data object with keys that match your template variables
    const templateParams = {
      from_name: (form.elements.namedItem('user_name') as HTMLInputElement)?.value,
      from_email: (form.elements.namedItem('user_email') as HTMLInputElement)?.value,
      phone: (form.elements.namedItem('user_phone') as HTMLInputElement)?.value,
      program: (form.elements.namedItem('preferred_program') as HTMLSelectElement)?.value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement)?.value,
      'g-recaptcha-response': recaptchaValue, // Include reCAPTCHA token for server-side validation
    };

    // Log the data being sent for debugging (remove in production)
    console.log('Sending data to EmailJS:', {
      ...templateParams,
      'g-recaptcha-response': '***HIDDEN***' // Hide the actual token in logs
    });

    // Validate that required fields are filled
    const name = (form.elements.namedItem('user_name') as HTMLInputElement)?.value;
    const email = (form.elements.namedItem('user_email') as HTMLInputElement)?.value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value;

    if (!name || !email || !message) {
      setSubmitMessage({ type: 'error', text: 'Please fill in all required fields.' });
      setIsSubmitting(false);
      return;
    }

    // Additional client-side validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitMessage({ type: 'error', text: 'Please enter a valid email address.' });
      setIsSubmitting(false);
      return;
    }

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(
        (result) => {
          console.log('EmailJS result:', result.text);
          setSubmitMessage({ type: 'success', text: 'Message sent successfully! We\'ll get back to you soon.' });
          form.reset(); // Clear the form after successful submission
          if (window.grecaptcha) {
            window.grecaptcha.reset(); // Reset the reCAPTCHA widget
          }
          setRecaptchaValue(null); // Reset reCAPTCHA value
        },
        (error) => {
          console.error('EmailJS error:', error.text);
          setSubmitMessage({ type: 'error', text: 'Error sending message. Please try again or contact us directly.' });
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Define valid section IDs
  type SectionId = 'home' | 'about' | 'services' | 'trainers' | 'schedule' | 'membership' | 'contact';

  // Scroll to section function
  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    // Close mobile menu after clicking
    setIsMobileMenuOpen(false);
  };

  // Services Section data
  const services = [
    {
      title: "Strength Training",
      description: "Forge your foundation with our comprehensive strength training programs designed to build functional muscle and enhance performance.",
      image: service1Img,
      icon: (
        <svg className="w-8 h-8 text-core-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      )
    },
    {
      title: "Athletic Conditioning",
      description: "Train like a pro with our specialized conditioning programs that enhance speed, agility, and overall athletic performance.",
      image: service2Img,
      icon: (
        <svg className="w-8 h-8 text-core-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      )
    },
    {
      title: "Personal Training",
      description: "Precision coaching tailored to your unique goals with one-on-one sessions from our elite certified trainers.",
      image: service3Img,
      icon: (
        <svg className="w-8 h-8 text-core-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
        </svg>
      )
    },
    {
      title: "Nutrition",
      description: "Fuel your transformation with our personalized nutrition plans crafted by certified dietitians and nutritionists.",
      image: service4Img,
      icon: (
        <svg className="w-8 h-8 text-core-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
        </svg>
      )
    }
  ];

  const whyChooseUs = [
    {
      title: "International Standards",
      description: "State-of-the-art equipment and facilities that meet global fitness industry standards.",
      image: why1,
      icon: (
        <svg className="w-8 h-8 text-core-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
        </svg>
      )
    },
    {
      title: "High-Performance Community",
      description: "Join an elite community of like-minded individuals who push boundaries and exceed expectations.",
      image: why2,
      icon: (
        <svg className="w-8 h-8 text-core-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      )
    },
    {
      title: "Sanctuary in the Sky",
      description: "Experience world-class conditioning 14 stories above the city at Ocean Tower - a haven for performance.",
      image: why3,
      icon: (
        <svg className="w-8 h-8 text-core-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    }
  ];

  const membershipPlans = [
    {
      title: "Basic",
      price: "Rs. 3,999",
      features: [
        "Access to gym facilities",
        "Cardio equipment",
        "Free parking",
        "Locker facilities"
      ]
    },
    {
      title: "Premium",
      price: "Rs. 6,999",
      features: [
        "All Basic features",
        "Personal training session (2/month)",
        "Nutrition consultation",
        "Sauna access",
        "Towel service"
      ],
      popular: true
    },
    {
      title: "Elite",
      price: "Rs. 9,999",
      features: [
        "All Premium features",
        "Unlimited personal training",
        "Group classes",
        "Vitamin supplements",
        "Spa access",
        "Priority booking"
      ]
    }
  ];

  const workoutPlans = [
    {
      title: "Strength Training",
      description: "Build muscle mass and increase strength with our expert-designed programs",
      duration: "45-60 min",
      calories: "400-600 cals"
    },
    {
      title: "HIIT Cardio",
      description: "High-intensity interval training to maximize fat burn and endurance",
      duration: "30-45 min",
      calories: "500-700 cals"
    },
    {
      title: "Yoga & Flexibility",
      description: "Improve flexibility, balance, and mental well-being with our yoga sessions",
      duration: "60 min",
      calories: "200-300 cals"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-core-gray-900 via-black to-core-gray-900">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-core-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">
                <span className="text-core-red">CORE</span> <span className="text-core-orange">KARACHI</span>
              </h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="text-white hover:text-core-red transition-colors text-sm font-medium uppercase tracking-wider" aria-label="Go to home section">Home</a>
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="text-white hover:text-core-red transition-colors text-sm font-medium uppercase tracking-wider" aria-label="Go to about section">About</a>
              <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="text-white hover:text-core-red transition-colors text-sm font-medium uppercase tracking-wider" aria-label="Go to services section">Services</a>
              <a href="#trainers" onClick={(e) => { e.preventDefault(); scrollToSection('trainers'); }} className="text-white hover:text-core-red transition-colors text-sm font-medium uppercase tracking-wider" aria-label="Go to trainers section">Trainers</a>
              <a href="#schedule" onClick={(e) => { e.preventDefault(); scrollToSection('schedule'); }} className="text-white hover:text-core-red transition-colors text-sm font-medium uppercase tracking-wider" aria-label="Go to schedule section">Schedule</a>
              <a href="#membership" onClick={(e) => { e.preventDefault(); scrollToSection('membership'); }} className="text-white hover:text-core-red transition-colors text-sm font-medium uppercase tracking-wider" aria-label="Go to membership section">Membership</a>
            </div>
            <div className="md:hidden">
              <button className="text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
              </button>
            </div>
            {isMobileMenuOpen && (
              <div className="md:hidden absolute top-16 left-0 right-0 bg-core-gray-900 border-b border-core-gray-800 z-50">
                <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                  <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="text-white hover:text-core-red transition-colors py-2 uppercase text-sm font-medium" aria-label="Go to home section">Home</a>
                  <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="text-white hover:text-core-red transition-colors py-2 uppercase text-sm font-medium" aria-label="Go to about section">About</a>
                  <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="text-white hover:text-core-red transition-colors py-2 uppercase text-sm font-medium" aria-label="Go to services section">Services</a>
                  <a href="#trainers" onClick={(e) => { e.preventDefault(); scrollToSection('trainers'); }} className="text-white hover:text-core-red transition-colors py-2 uppercase text-sm font-medium" aria-label="Go to trainers section">Trainers</a>
                  <a href="#schedule" onClick={(e) => { e.preventDefault(); scrollToSection('schedule'); }} className="text-white hover:text-core-red transition-colors py-2 uppercase text-sm font-medium" aria-label="Go to schedule section">Schedule</a>
                  <a href="#membership" onClick={(e) => { e.preventDefault(); scrollToSection('membership'); }} className="text-white hover:text-core-red transition-colors py-2 uppercase text-sm font-medium" aria-label="Go to membership section">Membership</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative py-28 md:py-40 overflow-hidden mt-16 h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
                  <Image
                    src={heroImg.src}
                    alt="CORE Karachi - Elite Fitness Performance Center"
                    fill
                    priority={true}
                    className="object-cover"
                  />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight uppercase italic">
              <span className="text-core-red">ELITE PERFORMANCE.</span> <br/> <span className="text-core-orange">ELEVATED.</span>
            </h1>
            <p className="text-xl md:text-2xl text-core-gray-300 mb-10 max-w-3xl mx-auto">
              CORE Karachi is more than a gym &mdash; it&apos;s a sanctuary for those who demand more from themselves. Experience world-class conditioning 14 stories above the city at Ocean Tower.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" onClick={() => scrollToSection('contact')} aria-label="Book a tour">Book a Tour</Button>
              <Button variant="outline-red" size="lg" onClick={() => scrollToSection('membership')} aria-label="View membership plans">View Plans</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 uppercase italic tracking-wider">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center p-8 bg-core-gray-800/50 border-core-red/20 hover:border-core-red/40 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 z-0">
                  <Image src={service.image} alt={`${service.title} - ${service.description}`} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors z-10"></div>
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-core-red/10 rounded-full flex items-center justify-center mx-auto mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3 uppercase">{service.title}</h3>
                  <p className="text-core-gray-400 text-sm leading-relaxed">{service.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programs & Schedule */}
      <section id="schedule" className="py-20 bg-black/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 uppercase italic tracking-wider">Programs & Schedule</h2>
            <p className="text-xl text-core-gray-300 max-w-3xl mx-auto">Structured training programs designed for peak performance and results</p>
          </div>

          {/* Weekly Schedule Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <div className="bg-core-gray-800/50 border border-core-gray-700 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4 text-center uppercase">Monday - Friday</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-core-gray-700">
                  <div>
                    <h4 className="font-bold text-core-red">Strength Training</h4>
                    <p className="text-sm text-core-gray-400">Morning Session</p>
                  </div>
                  <span className="bg-core-red/10 text-core-red px-3 py-1 rounded-full text-sm font-medium">7AM - 10AM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-core-gray-700">
                  <div>
                    <h4 className="font-bold text-core-orange">Athletic Performance</h4>
                    <p className="text-sm text-core-gray-400">Evening Session</p>
                  </div>
                  <span className="bg-core-orange/10 text-core-orange px-3 py-1 rounded-full text-sm font-medium">5PM - 8PM</span>
                </div>
              </div>
            </div>

            <div className="bg-core-gray-800/50 border border-core-gray-700 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4 text-center uppercase">Saturday - Sunday</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-core-gray-700">
                  <div>
                    <h4 className="font-bold text-core-red">Strength Training</h4>
                    <p className="text-sm text-core-gray-400">Morning Session</p>
                  </div>
                  <span className="bg-core-red/10 text-core-red px-3 py-1 rounded-full text-sm font-medium">8AM - 11AM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-core-gray-700">
                  <div>
                    <h4 className="font-bold text-core-orange">Athletic Performance</h4>
                    <p className="text-sm text-core-gray-400">Evening Session</p>
                  </div>
                  <span className="bg-core-orange/10 text-core-orange px-3 py-1 rounded-full text-sm font-medium">4PM - 7PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button variant="primary" size="lg" className="uppercase font-bold tracking-widest" aria-label="Download workout schedule">
              Download Schedule
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 uppercase italic tracking-wider">About CORE Karachi</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="text-center p-8 bg-core-gray-800/50 border-core-red/20 hover:border-core-red/40 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 z-0">
                  <Image src={item.image.src} alt={`${item.title} - ${item.description}`} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors z-10"></div>
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-core-red/10 rounded-full flex items-center justify-center mx-auto mb-6">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3 uppercase">{item.title}</h3>
                  <p className="text-core-gray-400">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section id="membership" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 uppercase italic tracking-wider">Membership Plans</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {membershipPlans.map((plan, index) => (
              <div key={index} className={`text-center p-8 rounded-lg transition-all duration-300 relative overflow-hidden border ${plan.popular ? 'border-core-red shadow-lg shadow-core-red/20 scale-105' : 'bg-core-gray-800/50 border-core-gray-700'}`}>
                <div className="relative z-10">
                  {plan.popular && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2"><span className="bg-core-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Most Popular</span></div>}
                  <h3 className="text-2xl font-bold text-white mb-2 uppercase">{plan.title}</h3>
                  <div className="mt-4"><span className="text-4xl font-bold text-white">{plan.price}</span><span className="text-core-gray-400">/month</span></div>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f, i) => <li key={i} className="flex items-center text-core-gray-300 text-sm"><svg className="w-5 h-5 text-core-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>{f}</li>)}
                  </ul>
                  <div className="mt-8">
                    <Button variant={plan.popular ? 'primary' : 'outline-red'} className="w-full" aria-label={`Join ${plan.title} membership plan`}>Join Now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section id="trainers" className="py-20 bg-black/40">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-16 uppercase italic tracking-wider">Meet Our Elite Trainers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Coach Zaid', specialty: 'Strength Specialist', image: trainer1Img },
              { name: 'Coach Sarah', specialty: 'Athletic Conditioning', image: trainer2Img },
              { name: 'Coach Ahmed', specialty: 'Personal Training', image: trainer3Img },
              { name: 'Coach Maria', specialty: 'Nutrition Expert', image: trainer4Img }
            ].map((trainer, index) => (
              <Card key={index} className="p-6 bg-core-gray-800/50 border border-core-gray-700 hover:border-core-red/50 transition-all relative overflow-hidden group">
                <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden relative z-10 border-2 border-core-gray-700 group-hover:border-core-red transition-colors">
                  <Image src={trainer.image.src} alt={`${trainer.name} - ${trainer.specialty}`} width={128} height={128} className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <h3 className="text-2xl font-bold text-white relative z-10 uppercase">{trainer.name}</h3>
                <p className="text-core-orange relative z-10 mb-4 font-medium italic">{trainer.specialty}</p>
                <Button variant="outline-red" size="sm" onClick={() => scrollToSection('contact')} className="relative z-10 uppercase text-xs" aria-label="Book a training session">Book Session</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="p-8 bg-core-gray-800/50 border border-core-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6 uppercase italic">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" name="user_name" id="user_name" className="w-full bg-core-gray-700 border border-core-gray-600 rounded-lg py-3 px-4 text-white focus:border-core-red outline-none transition-all" placeholder="Full Name" required aria-label="Full Name" />
                <input type="email" name="user_email" id="user_email" className="w-full bg-core-gray-700 border border-core-gray-600 rounded-lg py-3 px-4 text-white focus:border-core-red outline-none transition-all" placeholder="Email Address" required aria-label="Email Address" />
                <input type="tel" name="user_phone" id="user_phone" className="w-full bg-core-gray-700 border border-core-gray-600 rounded-lg py-3 px-4 text-white focus:border-core-red outline-none transition-all" placeholder="Phone Number" required aria-label="Phone Number" />
                <select name="preferred_program" id="preferred_program" className="w-full bg-core-gray-700 border border-core-gray-600 rounded-lg py-3 px-4 text-white focus:border-core-red outline-none transition-all" required aria-label="Preferred Program">
                  <option value="">Select Preferred Program</option>
                  <option value="strength">Strength Training</option>
                  <option value="athletic">Athletic Performance</option>
                  <option value="personal">Personal Training</option>
                  <option value="nutrition">Nutrition</option>
                </select>
                <textarea name="message" id="message" rows={4} className="w-full bg-core-gray-700 border border-core-gray-600 rounded-lg py-3 px-4 text-white focus:border-core-red outline-none transition-all" placeholder="Your Message" required aria-label="Your Message"></textarea>
                <div className="flex justify-center">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "your-site-key-here"}
                    onChange={setRecaptchaValue}
                    onErrored={() => {
                      setSubmitMessage({ type: 'error', text: 'reCAPTCHA error. Please refresh and try again.' });
                      console.error('reCAPTCHA error occurred');
                    }}
                    onExpired={() => {
                      setRecaptchaValue(null);
                      console.warn('reCAPTCHA token expired');
                    }}
                  />
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  className="w-full uppercase font-bold tracking-widest"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
                {submitMessage && (
                  <div className={`p-4 rounded-lg text-center ${submitMessage.type === 'success' ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-red-900/30 text-red-400 border border-red-800'}`}>
                    {submitMessage.text}
                  </div>
                )}
              </form>
            </Card>
            <div className="space-y-8 text-center lg:text-left">
              <Card className="p-8 bg-core-gray-800/50 border border-core-gray-700 relative overflow-hidden">
                <div className="relative z-10 text-white">
                  <h3 className="text-2xl font-bold mb-6 uppercase italic">Location</h3>
                  <div className="space-y-4">
                    <p><FaMapMarkerAlt className="inline mr-2 text-core-red" /> 14th Floor, Ocean Tower, Clifton, Karachi</p>
                    <p><FaPhone className="inline mr-2 text-core-red" /> +92 300 1234567</p>
                    <p><FaClock className="inline mr-2 text-core-red" /> 5:00 AM - 11:00 PM</p>
                  </div>
                  <div className="mt-6 h-64 rounded-lg overflow-hidden border border-core-gray-600">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.350891154776!2d67.02284431507681!3d24.86011138402874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e065b0d7def%3A0x9f1d55e35b11e431!2sOcean%20Tower%2C%20Karachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000&z=15&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="CORE Karachi Location Map"
                    />
                  </div>
                  <div className="flex justify-center lg:justify-start space-x-6 mt-6">
                    <a href="https://facebook.com/corekarachi" target="_blank" className="hover:text-core-red transition-colors"><FaFacebook size={24} /></a>
                    <a href="https://instagram.com/corekarachi" target="_blank" className="hover:text-core-red transition-colors"><FaInstagram size={24} /></a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 pt-20 pb-16 border-t border-core-gray-800 text-gray-400">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10 mb-12">
            {/* Brand Column */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white uppercase tracking-wide">CORE <span className="text-core-red">KARACHI</span></h3>
              <p className="text-base italic text-core-gray-300">Elite Performance Sanctuary</p>
              <p className="text-base text-core-gray-300 leading-relaxed">14th Floor, Ocean Tower, Clifton, Karachi</p>
            </div>

            {/* Explore Column */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white uppercase tracking-wide">Explore</h4>
              <ul className="space-y-4">
                <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="block hover:text-core-red transition-colors duration-300 text-base leading-relaxed" aria-label="Go to home section">Home</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="block hover:text-core-red transition-colors duration-300 text-base leading-relaxed" aria-label="Go to about section">About</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="block hover:text-core-red transition-colors duration-300 text-base leading-relaxed" aria-label="Go to services section">Services</a></li>
                <li><a href="#trainers" onClick={(e) => { e.preventDefault(); scrollToSection('trainers'); }} className="block hover:text-core-red transition-colors duration-300 text-base leading-relaxed" aria-label="Go to trainers section">Trainers</a></li>
                <li><a href="#membership" onClick={(e) => { e.preventDefault(); scrollToSection('membership'); }} className="block hover:text-core-red transition-colors duration-300 text-base leading-relaxed" aria-label="Go to membership section">Membership</a></li>
              </ul>
            </div>

            {/* Social Column */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white uppercase tracking-wide">Follow Us</h4>
              <div className="flex space-x-7">
                <a href="https://facebook.com/corekarachi" target="_blank" rel="noopener noreferrer" className="hover:text-core-red transition-colors duration-300 transform hover:scale-110">
                  <FaFacebook size={32} />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="https://instagram.com/corekarachi" target="_blank" rel="noopener noreferrer" className="hover:text-core-red transition-colors duration-300 transform hover:scale-110">
                  <FaInstagram size={32} />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>

            {/* Connect Column */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white uppercase tracking-wide">Connect</h4>
              <div className="space-y-5">
                <p className="flex items-start text-base leading-relaxed">
                  <FaPhone className="mr-4 text-core-red flex-shrink-0 mt-1" />
                  +92 21 35140836
                </p>
                <p className="flex items-start text-base leading-relaxed">
                  <FaEnvelope className="mr-4 text-core-red flex-shrink-0 mt-1" />
                  info@corekarachi.com
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-core-gray-800 pt-10 mt-8 text-center">
            <p className="text-sm uppercase tracking-widest text-core-gray-500">© 2026 CORE KARACHI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a href="https://wa.me/923001234567" className="fixed bottom-6 right-6 bg-core-green p-4 rounded-full text-white shadow-lg hover:scale-110 transition-transform z-50" aria-label="Contact us on WhatsApp">
        <FaWhatsapp size={24} />
      </a>
    </div>
  );
}