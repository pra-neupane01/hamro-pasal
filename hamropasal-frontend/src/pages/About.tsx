import { FaHistory, FaUsers, FaBuilding, FaLeaf, FaShieldAlt, FaChartLine } from 'react-icons/fa';

export const About = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="container-custom py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                About Hamropasal
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Hamropasal is a comprehensive retail management system designed specifically for businesses in Nepal. We understand the unique challenges faced by retailers in our market and have built a solution that addresses everything from inventory management to customer relationships.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our mission is to empower small and medium-sized businesses with enterprise-grade technology that's affordable, easy to use, and locally supported.
              </p>
              <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Get in Touch
              </Link>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=60')] bg-cover bg-center opacity-80"></div>
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center p-6">
                  <h2 className="text-2xl font-bold mb-2">Trusted by 500+ Retailers</h2>
                  <p className="text-white/90">Across Nepal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-gray-50">
        <div className="container-custom py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to becoming a trusted partner for retailers across Nepal.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <FaHistory className="text-2xl text-blue-500 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">2020 - The Beginning</h3>
                  <p className="text-gray-600">
                    Founded by a group of retail industry veterans who saw the need for better technology solutions for small businesses in Nepal.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FaUsers className="text-2xl text-green-500 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">2021 - First Customers</h3>
                  <p className="text-gray-600">
                    Launched our MVP and served our first 50 customers across Kathmandu Valley with promising results.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FaBuilding className="text-2xl text-purple-500 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">2022 - Expansion</h3>
                  <p className="text-gray-600">
                    Expanded our team and features, reaching retailers in Pokhara, Biratnagar, and other major cities.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FaShieldAlt className="text-2xl text-red-500 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">2023 - Security Focus</h3>
                  <p className="text-gray-600">
                    Implemented bank-level security measures and achieved compliance with data protection standards.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FaChartLine className="text-2xl text-indigo-500 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">2024 - Innovation</h3>
                  <p className="text-gray-600">
                    Introduced AI-powered forecasting and mobile capabilities for modern retail management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-white">
        <div className="container-custom py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals passionate about helping Nepali retailers succeed.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <FaUserCircle className="text-2xl text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Alishah Ryhar</h3>
              <p className="text-gray-600">Founder & CEO</p>
              <div className="mt-3 space-x-2 justify-center">
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                  <FaLinkedinIn className="text-xl" />
                </a>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <FaUserCircle className="text-2xl text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Srijana Joshi</h3>
              <p className="text-gray-600">CTO & Head of Development</p>
              <div className="mt-3 space-x-2 justify-center">
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  <FaLinkedinIn className="text-xl" />
                </a>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <FaUserCircle className="text-2xl text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Rajan Patel</h3>
              <p className="text-gray-600">Head of Sales & Partnerships</p>
              <div className="mt-3 space-x-2 justify-center">
                <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                  <FaLinkedinIn className="text-xl" />
                </a>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                <FaUserCircle className="text-2xl text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Anita Shah</h3>
              <p className="text-gray-600">Customer Success Lead</p>
              <div className="mt-3 space-x-2 justify-center">
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  <FaLinkedinIn className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-gray-50">
        <div className="container-custom py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Hamropasal.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
              <div className="p-4 rounded-full bg-blue-50 mb-4">
                <FaLeaf className="text-2xl text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Local Focus</h3>
              <p className="text-gray-600">
                We understand the unique challenges of Nepali retailers and tailor our solutions accordingly.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
              <div className="p-4 rounded-full bg-green-50 mb-4">
                <FaShieldAlt className="text-2xl text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Reliability</h3>
              <p className="text-gray-600">
                Our system is built to be dependable with 99.9% uptime and regular backups.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
              <div className="p-4 rounded-full bg-purple-50 mb-4">
                <FaUsers className="text-2xl text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Customer Success</h3>
              <p className="text-gray-600">
                Your success is our success. We provide dedicated support and continuous improvements.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
              <div className="p-4 rounded-full bg-orange-50 mb-4">
                <FaChartLine className="text-2xl text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously innovate to bring the latest retail technology to Nepal.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
              <div className="p-4 rounded-full bg-red-50 mb-4">
                <FaUsers className="text-2xl text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Affordability</h3>
              <p className="text-gray-600">
                                Enterprise features at prices accessible to small and medium businesses.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
              <div className="p-4 rounded-full bg-indigo-50 mb-4">
                <FaLeaf className="text-2xl text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Integrity</h3>
              <p className="text-gray-600">
                We operate with transparency and honesty in all our business dealings.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};