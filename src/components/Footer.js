import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] pt-16 pb-6">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* About CORE Column */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-wide">About CORE</h3>
            <p className="text-base text-gray-400 leading-relaxed">
              Founded by Sheema Sultan, CORE Karachi is a premium fitness destination located at Ocean Tower, Clifton, Karachi. We offer world-class facilities and expert trainers dedicated to helping you achieve your fitness goals.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              <a
                href="https://facebook.com/corekarachi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#FF6600] rounded-full flex items-center justify-center text-white hover:bg-[#e55a00] transition-colors duration-300"
                aria-label="Follow us on Facebook"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="https://twitter.com/corekarachi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#FF6600] rounded-full flex items-center justify-center text-white hover:bg-[#e55a00] transition-colors duration-300"
                aria-label="Follow us on Twitter"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="https://instagram.com/corekarachi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#FF6600] rounded-full flex items-center justify-center text-white hover:bg-[#e55a00] transition-colors duration-300"
                aria-label="Follow us on Instagram"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Sitemap Column */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-wide">Sitemap</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-base text-gray-400 hover:text-[#FF6600] transition-colors duration-300">Home</a></li>
              <li><a href="#about" className="text-base text-gray-400 hover:text-[#FF6600] transition-colors duration-300">About Us</a></li>
              <li><a href="#schedule" className="text-base text-gray-400 hover:text-[#FF6600] transition-colors duration-300">Timings</a></li>
              <li><a href="#services" className="text-base text-gray-400 hover:text-[#FF6600] transition-colors duration-300">Classes</a></li>
              <li><a href="#membership" className="text-base text-gray-400 hover:text-[#FF6600] transition-colors duration-300">Pricing</a></li>
              <li><a href="#contact" className="text-base text-gray-400 hover:text-[#FF6600] transition-colors duration-300">Contact Us</a></li>
            </ul>
          </div>

          {/* Gym Timings Column */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-wide">Gym Timings</h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-base text-gray-400">Monday - Friday</span>
                <span className="text-base text-[#FF6600] font-semibold">7am - 10pm</span>
              </li>
              <li className="flex justify-between">
                <span className="text-base text-gray-400">Saturday</span>
                <span className="text-base text-[#FF6600] font-semibold">8am - 8pm</span>
              </li>
              <li className="flex justify-between">
                <span className="text-base text-gray-400">Sunday</span>
                <span className="text-base text-[#FF6600] font-semibold">11am - 7pm</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-lg font-bold text-white mb-2">Off peak</h4>
              <p className="text-base text-gray-400">
                Monday - Friday: 10am - 4pm<br />
                Saturday - Sunday: 10am - 4pm
              </p>
            </div>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-wide">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-[#FF6600] flex-shrink-0 mt-1 mr-3" size={18} aria-hidden="true" />
                <span className="text-base text-gray-400">Ocean Tower, 14th Floor, Clifton, Karachi</span>
              </div>
              <div className="flex items-start">
                <FaEnvelope className="text-[#FF6600] flex-shrink-0 mt-1 mr-3" size={18} aria-hidden="true" />
                <span className="text-base text-[#FF6600]">corekarachi@gmail.com</span>
              </div>
              <div className="flex items-start">
                <FaPhone className="text-[#FF6600] flex-shrink-0 mt-1 mr-3" size={18} aria-hidden="true" />
                <span className="text-base text-[#FF6600]">+92 300 1234567</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="bg-[#000000] py-4">
        <div className="container mx-auto px-6">
          <p className="text-center text-white text-sm font-medium">
            © Copyright CORE 2022. All Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;