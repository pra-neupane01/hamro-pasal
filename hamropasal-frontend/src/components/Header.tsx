import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaBars,
  FaChevronDown,
  FaHome,
  FaBoxOpen,
  FaBoxes,
  FaChartLine,
  FaChartBar,
  FaUsers,
  FaTruckLoading
} from 'react-icons/fa';
import { AiOutlineProfile, AiFillSetting } from 'react-icons/ai';
import { FaRegBell } from 'react-icons/fa6';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [cartItems, setCartItems] = useState(2);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="container-custom flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold text-xl">H</span>
            </div>
            <span className="font-bold text-xl text-primary">Hamropasal</span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-text-secondary hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-gray-50">Home</Link>
          <Link to="/products" className="text-text-secondary hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-gray-50">Products</Link>
          <Link to="/inventory" className="text-text-secondary hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-gray-50">Inventory</Link>
          <Link to="/sales" className="text-text-secondary hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-gray-50">Sales</Link>
          <Link to="/reports" className="text-text-secondary hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-gray-50">Reports</Link>
          <Link to="/customers" className="text-text-secondary hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-gray-50">Customers</Link>
          <Link to="/suppliers" className="text-text-secondary hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-gray-50">Suppliers</Link>
        </div>

        {/* User actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/60" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition-all w-40 md:w-60 placeholder:text-text-secondary/60"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <FaRegBell className="text-xl text-secondary relative" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 flex w-5 h-5 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                {notifications}
              </span>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-xl text-secondary relative" />
            {cartItems > 0 && (
              <span className="absolute -top-1 -right-1 flex w-5 h-5 items-center justify-center rounded-full bg-primary text-white text-xs">
                {cartItems}
              </span>
            )}
          </Link>

          {/* User menu */}
          <div className="relative">
            <button onClick={toggleMenu} className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors">
              <AiOutlineProfile className="h-5 w-5" />
              <span className="hidden md:inline">Admin</span>
              <FaChevronDown className="h-4 w-4" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-xl shadow-lg z-50">
                <Link to="/profile" className="flex items-center px-4 py-3 border-b border-border hover:bg-gray-50">
                  <AiFillSetting className="mr-3 h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <a href="#" className="flex items-center px-4 py-3 border-b border-border hover:bg-gray-50 text-red-600">
                  <FaRegBell className="mr-3 h-4 w-4 text-red-500" />
                  <span>Logout</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button onClick={toggleMenu} className="md:hidden">
          <FaBars className="text-xl text-secondary" />
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="bg-white border-t border-border">
            <nav className="space-y-1">
              <Link to="/" className="flex items-center px-6 py-4 text-text-secondary hover:text-primary">
                <FaHome className="mr-3" />
                Home
              </Link>
              <Link to="/products" className="flex items-center px-6 py-4 text-text-secondary hover:text-primary">
                <FaBoxOpen className="mr-3" />
                Products
              </Link>
              <Link to="/inventory" className="flex items-center px-6 py-4 text-text-secondary hover:text-primary">
                <FaBoxes className="mr-3" />
                Inventory
              </Link>
              <Link to="/sales" className="flex items-center px-6 py-4 text-text-secondary hover:text-primary">
                <FaChartLine className="mr-3" />
                Sales
              </Link>
              <Link to="/reports" className="flex items-center px-6 py-4 text-text-secondary hover:text-primary">
                <FaChartBar className="mr-3" />
                Reports
              </Link>
              <Link to="/customers" className="flex items-center px-6 py-4 text-text-secondary hover:text-primary">
                <FaUsers className="mr-3" />
                Customers
              </Link>
              <Link to="/suppliers" className="flex items-center px-6 py-4 text-text-secondary hover:text-primary">
                <FaTruckLoading className="mr-3" />
                Suppliers
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};