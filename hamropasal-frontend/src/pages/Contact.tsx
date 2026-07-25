import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

export const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend API
    alert('Thank you for your message! We will get back to you soon.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="container-custom py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Contact Us
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help. Reach out to us through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="bg-gray-50">
        <div className="container-custom py-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-6">
                Whether you're interested in learning more about Hamropasal, need technical support, or want to discuss partnership opportunities, our team is ready to assist you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <FaMapMarkerAlt className="text-2xl text-blue-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Our Office</h3>
                    <p className="text-gray-600">
                      Hamropasal Headquarters<br />
                      Kathmandu Metropolitan City<br />
                      Ward No. 10, Balaju<br />
                      Kathmandu, Nepal 44600
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FaPhone className="text-2xl text-green-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Phone Support</h3>
                    <p className="text-gray-600">
                      <span className="block">Main Office: +977 1-4001234</span>
                      <span className="block">Support Hotline: +977 9851234567</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FaEnvelope className="text-2xl text-orange-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">
                      <span className="block">info@hamropasal.com.np</span>
                      <span className="block">support@hamropasal.com.np</span>
                      <span className="block">sales@hamropasal.com.np</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FaClock className="text-2xl text-purple-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Business Hours</h3>
                    <p className="text-gray-600">
                      <span className="block">Monday - Friday: 9:00 AM - 6:00 PM</span>
                      <span className="block">Saturday: 10:00 AM - 4:00 PM</span>
                      <span className="block">Sunday: Closed</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-6">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales & Pricing</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                    placeholder="Type your message here..."
                  />
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors hover:shadow-md">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white">
        <div className="container-custom py-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Find Us</h2>
          <div className="border-rounded-xl overflow-hidden shadow-lg border border-gray-200">
            {/* In a real app, this would be an actual Google Maps embed */}
            <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <FaMapMarkerAlt className="text-4xl mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">Hamropasal Headquarters</h3>
                <p className="text-gray-600">Kathmandu, Nepal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="bg-gray-50">
        <div className="container-custom py-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Connect With Us</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Stay updated with our latest news, features, and promotions by following us on social media.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors transform hover:scale-105">
              <FaFacebookF className="text-xl" />
            </a>
            <a href="#" className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors transform hover:scale-105">
              <FaTwitter className="text-xl" />
            </a>
            <a href="#" className="flex items-center justify-center w-12 h-12 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-colors transform hover:scale-105">
              <FaInstagram className="text-xl" />
            </a>
            <a href="#" className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors transform hover:scale-105">
              <FaLinkedinIn className="text-xl" />
            </a>
            <a href="#" className="flex items-center justify-center w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors transform hover:scale-105">
              <FaYoutube className="text-xl" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};