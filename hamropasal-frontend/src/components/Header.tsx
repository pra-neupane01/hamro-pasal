import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaBars, FaTimes, FaBoxOpen, FaBoxes,
  FaChartLine, FaChartBar, FaUsers, FaTruck,
  FaTachometerAlt, FaCog, FaSignOutAlt, FaUserCircle,
} from 'react-icons/fa';
import { FaRegBell } from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';
import { Logo, LogoIcon } from './Logo';

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

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;
  const isPublicPage = PUBLIC_PATHS.includes(location.pathname);
  const visibleNav = NAV_ITEMS.filter(item => !item.adminOnly || isAdmin);

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-screen-xl mx-auto px-3 sm:px-4 flex h-14 items-center justify-between gap-3">

        {/* Logo */}
        <Link
          to={isAuthenticated ? '/dashboard' : '/'}
          className="flex items-center gap-2 flex-shrink-0 text-slate-900 hover:text-slate-700 transition-colors"
        >
          <LogoIcon className="w-7 h-7 hidden sm:block" />
          <span className="font-semibold text-base">Hamropasal</span>
        </Link>

        {/* Desktop nav */}
        {isAuthenticated && !isPublicPage && (
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {visibleNav.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  isActive(to)
                    ? 'bg-slate-800 text-white'
                    : 'text-gray-600 hover:text-slate-900 hover:bg-gray-100'
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
                className="relative p-2 text-gray-500 hover:text-slate-900 hover:bg-gray-100 rounded transition-colors"
                aria-label="Notifications"
              >
                <FaRegBell className="text-base" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
              </button>

              {/* User dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(v => !v)}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded border transition-colors ${
                    userMenuOpen
                      ? 'border-slate-300 bg-slate-50'
                      : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
                  }`}
                  aria-label="User menu"
                  aria-expanded={userMenuOpen}
                >
                  <FaUserCircle className="text-lg text-slate-600 flex-shrink-0" />
                  <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-24 truncate">
                    {user?.fullName?.split(' ')[0]}
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border rounded shadow-lg py-1 z-50">
                    <div className="px-3 py-2 border-b">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user?.fullName}</p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email}</p>
                      <span className="inline-block mt-1.5 text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wide font-semibold bg-slate-100 text-slate-700">
                        {user?.role}
                      </span>
                    </div>
                    {isAdmin && (
                      <Link
                        to="/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <FaCog className="text-gray-400 flex-shrink-0 text-xs" />
                        Settings
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <FaSignOutAlt className="flex-shrink-0 text-xs" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile hamburger */}
              {!isPublicPage && (
                <button
                  onClick={() => setMobileOpen(v => !v)}
                  className="lg:hidden p-2 rounded text-gray-500 hover:bg-gray-100"
                  aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                >
                  {mobileOpen ? <FaTimes className="text-base" /> : <FaBars className="text-base" />}
                </button>
              )}
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-slate-900 px-3 py-1.5 rounded hover:bg-gray-100"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold text-white bg-slate-800 hover:bg-slate-900 px-3 py-1.5 rounded"
              >
                Get started
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && isAuthenticated && !isPublicPage && (
        <div className="lg:hidden border-t bg-white shadow-lg">
          <div className="px-2.5 py-2 text-[10px] font-semibold flex items-center gap-1.5 bg-slate-50 text-slate-600 uppercase tracking-wide">
            {isAdmin ? 'Administrator' : 'Cashier'}
          </div>
          <nav className="px-2 py-2 space-y-0.5">
            {visibleNav.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2.5 px-3 py-2 rounded text-sm font-medium ${
                  isActive(to)
                    ? 'bg-slate-800 text-white'
                    : 'text-gray-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="text-sm flex-shrink-0" />
                {label}
              </Link>
            ))}
          </nav>
          <div className="px-2 pb-2 pt-1 border-t">
            {isAdmin && (
              <Link
                to="/settings"
                className="flex items-center gap-2.5 px-3 py-2 rounded text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <FaCog className="text-sm flex-shrink-0" />
                Settings
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2.5 w-full px-3 py-2 rounded text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <FaSignOutAlt className="text-sm flex-shrink-0" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
