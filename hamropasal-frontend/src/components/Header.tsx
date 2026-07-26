import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaBars, FaTimes, FaBoxOpen, FaBoxes,
  FaChartLine, FaChartBar, FaUsers, FaTruck,
  FaTachometerAlt, FaCog, FaSignOutAlt, FaUserCircle,
  FaShieldAlt,
} from 'react-icons/fa';
import { FaRegBell } from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';

interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
  adminOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
  { to: '/products',  label: 'Products',  icon: FaBoxOpen,    adminOnly: true },
  { to: '/inventory', label: 'Inventory', icon: FaBoxes,      adminOnly: true },
  { to: '/sales',     label: 'Sales',     icon: FaChartLine },
  { to: '/reports',   label: 'Reports',   icon: FaChartBar,   adminOnly: true },
  { to: '/customers', label: 'Customers', icon: FaUsers },
  { to: '/suppliers', label: 'Suppliers', icon: FaTruck,      adminOnly: true },
];

const PUBLIC_PATHS = ['/', '/about', '/contact', '/login', '/register'];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;
  const isPublicPage = PUBLIC_PATHS.includes(location.pathname);

  // Filter nav items by role
  const visibleNav = NAV_ITEMS.filter(item => !item.adminOnly || isAdmin);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 flex h-16 items-center justify-between gap-4">

        {/* Logo */}
        <Link
          to={isAuthenticated ? '/dashboard' : '/'}
          className="flex items-center gap-2 flex-shrink-0 group"
        >
          <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-indigo-700 transition-colors">
            <span className="text-white font-bold text-lg leading-none">H</span>
          </div>
          <span className="font-bold text-lg text-gray-900 hidden sm:block">Hamropasal</span>
        </Link>

        {/* Desktop nav */}
        {isAuthenticated && !isPublicPage && (
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {visibleNav.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive(to)
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-indigo-700 hover:bg-indigo-50'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {isAuthenticated ? (
            <>
              {/* Notification bell */}
              <button
                className="relative p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                aria-label="Notifications"
              >
                <FaRegBell className="text-lg" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              </button>

              {/* User dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(v => !v)}
                  className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border transition-all duration-150 ${
                    userMenuOpen
                      ? 'border-indigo-300 bg-indigo-50'
                      : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
                  }`}
                  aria-label="User menu"
                  aria-expanded={userMenuOpen}
                >
                  <FaUserCircle className="text-xl text-indigo-600 flex-shrink-0" />
                  <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-24 truncate">
                    {user?.fullName?.split(' ')[0]}
                  </span>
                  <span className={`hidden md:inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold tracking-wide ${
                    isAdmin
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {isAdmin && <FaShieldAlt className="text-[10px]" />}
                    {user?.role}
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user?.fullName}</p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{user?.email}</p>
                      <span className={`inline-flex items-center gap-1 mt-1.5 text-xs px-2 py-0.5 rounded-full font-semibold ${
                        isAdmin ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {isAdmin && <FaShieldAlt className="text-[10px]" />}
                        {isAdmin ? 'Administrator' : 'Cashier'}
                      </span>
                    </div>
                    {isAdmin && (
                      <Link
                        to="/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-700 transition-colors"
                      >
                        <FaCog className="text-gray-400 flex-shrink-0" />
                        Settings
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FaSignOutAlt className="flex-shrink-0" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile hamburger — only when authenticated on app pages */}
              {!isPublicPage && (
                <button
                  onClick={() => setMobileOpen(v => !v)}
                  className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                >
                  {mobileOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
                </button>
              )}
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-indigo-700 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                Get started
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && isAuthenticated && !isPublicPage && (
        <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
          {/* Role banner */}
          <div className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-1.5 ${
            isAdmin ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'
          }`}>
            {isAdmin && <FaShieldAlt />}
            {isAdmin ? 'Logged in as Administrator' : 'Logged in as Cashier'}
          </div>
          <nav className="px-3 py-2 space-y-0.5">
            {visibleNav.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(to)
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
                }`}
              >
                <Icon className="text-base flex-shrink-0" />
                {label}
              </Link>
            ))}
          </nav>
          <div className="px-3 pb-3 pt-1 border-t border-gray-100 mt-1">
            {isAdmin && (
              <Link
                to="/settings"
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaCog className="text-base flex-shrink-0" />
                Settings
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <FaSignOutAlt className="text-base flex-shrink-0" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
