import { FaBoxOpen, FaChartLine, FaUsers, FaTruckLoading, FaShoppingCart, FaBox, FaDollarSign, FaExclamationTriangle, FaUserPlus, FaChartBar, FaShieldAlt, FaQuoteLeft, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Link } from 'react-router-dom';
import {
  FaBoxOpen,
  FaChartLine,
  FaUsers,
  FaTruckLoading,
  FaShoppingCart,
  FaBox,
  FaDollarSign,
  FaExclamationTriangle,
  FaUserPlus,
  FaChartBar,
  FaShieldAlt,
  FaQuoteLeft,
  FaUserCircle
} from 'react-icons/fa';

export const Home = () => {
  const stats = [
    { icon: <FaBoxOpen className="text-2xl" />, label: "Total Products", value: "1,247", change: "+12%" },
    { icon: <FaChartLine className="text-2xl" />, label: "Today's Sales", value: "$2,450", change: "+8%" },
    { icon: <FaUsers className="text-2xl" />, label: "Active Customers", value: "892", change: "+5%" },
    { icon: <FaTruckLoading className="text-2xl" />, label: "Pending Orders", value: "23", change: "-3%" }
  ];

  const recentActivities = [
    {
      id: 1,
      title: "New order received",
      description: "Order #ORD-7892 from Kathmandu Mall",
      time: "2 min ago",
      icon: <FaShoppingCart className="text-blue-500" />,
      type: "order"
    },
    {
      id: 2,
      title: "Inventory updated",
      description: "Stock levels updated for 15 products",
      time: "15 min ago",
      icon: <FaBox className="text-green-500" />,
      type: "inventory"
    },
    {
      id: 3,
      title: "Low stock alert",
      description: "Running low on rice stock (5kg bags)",
      time: "1 hour ago",
      icon: <FaExclamationTriangle className="text-orange-500" />,
      type: "alert"
    },
    {
      id: 4,
      title: "New customer registered",
      description: "Welcome to our store, Mr. Sharma!",
      time: "2 hours ago",
      icon: <FaUserPlus className="text-purple-500" />,
      type: "customer"
    }
  ];

  const quickStats = [
    { label: "Total Revenue", value: "$124,500", icon: <FaDollarSign className="text-green-500" /> },
    { label: "Profit Margin", value: "23.5%", icon: <FaChartLine className="text-blue-500" /> },
    { label: "Inventory Value", value: "$89,200", icon: <FaBox className="text-purple-500" /> },
    { label: "Average Order", value: "$45.20", icon: <FaShoppingCart className="text-orange-500" /> }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="container-custom py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome to Hamropasal
              </h1>
              <p className="text-gray-600 mb-6">
                Streamline your retail operations with our comprehensive management system designed specifically for Nepali businesses.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Get Started
                </Link>
                <Link to="/demo" className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
                  Request Demo
                </Link>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="p-3 rounded-full bg-blue-50">
                      {stat.icon}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className={stat.change.startsWith('-') ? 'text-red-500' : 'text-green-500'}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50">
        <div className="container-custom py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Powerful Features for Your Business</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience comprehensive retail management with features designed to streamline every aspect of your business operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow transform hover:-translate-y-1">
              <div className="flex items-start mb-4">
                <div className="p-3 rounded-full bg-blue-50">
                  <FaBoxOpen className="text-2xl text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-xl font-semibold text-gray-800">Inventory Management</h3>
                  <p className="text-gray-600 mt-2">
                    Track stock levels in real-time, set automatic reorder points, and manage multiple warehouses effortlessly.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow transform hover:-translate-y-1">
              <div className="flex items-start mb-4">
                <div className="p-3 rounded-full bg-green-50">
                  <FaChartLine className="text-2xl text-green-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-xl font-semibold text-gray-800">Sales & POS</h3>
                  <p className="text-gray-600 mt-2">
                    Process sales quickly with our intuitive point-of-sale system, supporting multiple payment methods and receipt printing.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow transform hover:-translate-y-1">
              <div className="flex items-start mb-4">
                <div className="p-3 rounded-full bg-purple-50">
                  <FaUsers className="text-2xl text-purple-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-xl font-semibold text-gray-800">Customer Management</h3>
                  <p className="text-gray-600 mt-2">
                    Build lasting customer relationships with detailed profiles, purchase history, and loyalty programs.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow transform hover:-translate-y-1">
              <div className="flex items-start mb-4">
                <div className="p-3 rounded-full bg-orange-50">
                  <FaTruckLoading className="text-2xl text-orange-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-xl font-semibold text-gray-800">Supplier Management</h3>
                  <p className="text-gray-600 mt-2">
                    Manage supplier relationships, track purchase orders, and optimize your supply chain operations.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow transform hover:-translate-y-1">
              <div className="flex items-start mb-4">
                <div className="p-3 rounded-full bg-red-50">
                  <FaChartBar className="text-2xl text-red-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-xl font-semibold text-gray-800">Reports & Analytics</h3>
                  <p className="text-gray-600 mt-2">
                    Gain valuable insights with customizable reports, sales trends, and performance dashboards.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow transform hover:-translate-y-1">
              <div className="flex items-start mb-4">
                <div className="p-3 rounded-full bg-indigo-50">
                  <FaShieldAlt className="text-2xl text-indigo-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-xl font-semibold text-gray-800">Security & Compliance</h3>
                  <p className="text-gray-600 mt-2">
                    Bank-level security with role-based access control, audit trails, and regular data backups.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white">
        <div className="container-custom py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from successful retailers who have transformed their businesses with Hamropasal.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <FaQuoteLeft className="text-2xl text-blue-500" />
              </div>
              <p className="text-gray-600 italic mb-4">
                "Hamropasal has revolutionized how we manage our grocery store. Inventory tracking is now effortless and our sales have increased by 30% since implementation."
              </p>
              <div className="flex items-center mt-4">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                  <FaUserCircle className="text-blue-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Sanjay Sharma</h4>
                  <p className="text-sm text-gray-500">Owner, Kathmandu Grocers</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <FaQuoteLeft className="text-2xl text-blue-500" />
              </div>
              <p className="text-gray-600 italic mb-4">
                "The POS system is incredibly fast and reliable. Our checkout times have reduced by half, leading to happier customers and increased sales."
              </p>
              <div className="flex items-center mt-4">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                  <FaUserCircle className="text-blue-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Priya Patel</h4>
                  <p className="text-sm text-gray-500">Manager, Patan Fashion Boutique</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <FaQuoteLeft className="text-2xl text-blue-500" />
              </div>
              <p className="text-gray-600 italic mb-4">
                "Real-time inventory alerts have prevented countless stockouts. We can now focus on growing our business instead of worrying about stock levels."
              </p>
              <div className="flex items-center mt-4">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                  <FaUserCircle className="text-blue-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Ramesh Thapa</h4>
                  <p className="text-sm text-gray-500">Owner, Biratnagar Electronics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container-custom py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Retail Business?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful retailers who have streamlined their operations with Hamropasal. Start your free trial today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="bg-white hover:bg-gray-50 text-blue-600 hover:text-blue-700 px-8 py-4 rounded-lg font-semibold transition-colors">
              Start Free Trial
            </Link>
            <Link to="/demo" className="border border-white/20 hover:border-white/30 text-white hover:text-white/90 px-8 py-4 rounded-lg font-semibold transition-colors">
              Request Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};