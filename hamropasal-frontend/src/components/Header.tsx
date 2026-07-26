import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaBars, FaTimes, FaHome, FaBoxOpen, FaBoxes,
  FaChartLine, FaChartBar, FaUsers, FaTruck,
  FaTachometerAlt, FaCog, FaSignOutAlt, FaUserCircle,
} from 'react-icons/fa';
import { FaRegBell } from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
  { to: '/products',  label: 'Products',  icon: FaBoxOpen },
  { to: '/inventory', label: 'Inventory', icon: FaBoxes },
  { to: '/sales',     label: 'Sales',     icon: FaChartLine },
  { to: '/reports',   label: 'Reports',   icon: FaChartBar },
  { to: '/customers', label: 'Customers', icon: FaUsers },
  { to: '/suppliers', label: 'Suppliers', icon: FaTruck },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  // Public pages don't show the full app nav
  const isPublicPage = ['/', '/about', '/contact', '/login', '/register'].includes(location.pathname);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-screen-xl mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center space-x-2 flex-shrink-0">
          <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <span className="font-bold text-lg text-gray-900">Hamropasal</span>
        </Link>

        {/* Desktop nav — only when authenticated and not on public pages */}
        {isAuthenticated && !isPublicPage && (
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(to)
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg" aria-label="Notifications">
                <FaRegBell className="text-lg" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* User dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="User menu"
                >
                  <FaUserCircle className="text-xl text-indigo-600" />
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user?.fullName?.split(' ')[0]}
                  </span>
                  <span className={`hidden md:block text-xs px-1.5 py-0.5 rounded font-medium ${
                    user?.role === 'ADMIN' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {user?.role}
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-1">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user?.fullName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
                    </div>
                    <Link
                      to="/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <FaCog className="mr-3 text-gray-400" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      <FaSignOutAlt className="mr-3" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
              >
                Get started
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && isAuthenticated && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-2 space-y-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(to)
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="mr-3 text-base" />
                {label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
            >
              <FaSignOutAlt className="mr-3" />
              Sign out
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
