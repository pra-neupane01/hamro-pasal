export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 border-t border-gray-700">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-4">Hamropasal</h3>
            <p className="text-gray-300 mb-4">
              Modern retail management system designed to streamline your business operations.
              From inventory management to sales tracking, we've got you covered.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaFacebookF className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaLinkedinIn className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                Products
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-bold mb-4">Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <FaCheckCircle text-green-1 text-400>
                Inventory Management
              </li>
              <li className="flex items-center text-gray-">
                <FaCheckCircle className="h-4 w-4 text-green-400 mr-2" />
                <span>Sales & POS</span>
              </li>
              <li className="flex items-center text-gray-">
                <FaCheckCircle className="h-4 w-4 text-green-400 mr-2" />
                <span>Customer Management</span>
              </li>
              <li className="flex items-center text-gray-">
                <FaCheckCircle className="h-4 w-4 text-green-400 mr-2" />
                <span>Supplier Management</span>
              </li>
              <li className="flex items-center text-gray-">
                <FaCheckCircle className="h-4 w-4 text-green-400 mr-2" />
                <span>Reporting & Analytics</span>
              </li>
              <li className="flex items-center text-gray-">
                <FaCheckCircle className="h-4 w-4 text-green-400 mr-2" />
                <span>Multi-store Support</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="h-4 w-4 text-green-400 mt-1" />
                <div>
                  <span className="block text-gray-300">Kathmandu, Nepal</span>
                  <span className="block text-xs text-gray-400">Box: 12345</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FaPhone className="h-4 w-4 text-green-400 mt-1" />
                <span className="block text-gray-300">+977 1-4001234</span>
              </div>
              <div className="flex items-start space-x-3">
                <FaEnvelope className="h-4 w-4 text-green-400 mt-1" />
                <span className="block text-gray-300">info@hamropasal.com.np</span>
              </div>
              <div className="flex items-start space-x-3">
                <FaClock className="h-4 w-4 text-green-400 mt-1" />
                <span className="block text-gray-300">Mon-Sat: 9AM-6PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          &copy; <span id="year"></span> Hamropasal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};