import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const year = new Date().getFullYear();

const LINKS = {
  product: [
    { label: 'Features',   to: '/#features' },
    { label: 'Dashboard',  to: '/dashboard' },
    { label: 'Sales POS',  to: '/sales' },
    { label: 'Reports',    to: '/reports' },
  ],
  company: [
    { label: 'About',      to: '/about' },
    { label: 'Contact',    to: '/contact' },
    { label: 'Privacy',    to: '/privacy' },
    { label: 'Terms',      to: '/terms' },
  ],
};

const SOCIALS = [
  { icon: FaFacebookF,  href: '#', label: 'Facebook' },
  { icon: FaTwitter,    href: '#', label: 'Twitter' },
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { icon: FaGithub,     href: '#', label: 'GitHub' },
];

export const Footer = () => (
  <footer className="bg-gray-900 text-gray-400">
    {/* Main grid */}
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-white font-bold text-base">Hamropasal</span>
          </div>
          <p className="text-sm leading-relaxed mb-5 max-w-xs">
            Modern retail management for Nepali businesses — inventory, sales, and analytics in one place.
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-indigo-600 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <Icon className="text-xs" />
              </a>
            ))}
          </div>
        </div>

        {/* Product */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wide">Product</h4>
          <ul className="space-y-2.5">
            {LINKS.product.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="text-sm hover:text-white transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wide">Company</h4>
          <ul className="space-y-2.5">
            {LINKS.company.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="text-sm hover:text-white transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wide">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <span className="block text-gray-500 text-xs uppercase tracking-wide mb-0.5">Location</span>
              Kathmandu, Nepal
            </li>
            <li>
              <span className="block text-gray-500 text-xs uppercase tracking-wide mb-0.5">Email</span>
              <a href="mailto:info@hamropasal.com.np" className="hover:text-white transition-colors">
                info@hamropasal.com.np
              </a>
            </li>
            <li>
              <span className="block text-gray-500 text-xs uppercase tracking-wide mb-0.5">Phone</span>
              +977 1-4001234
            </li>
            <li>
              <span className="block text-gray-500 text-xs uppercase tracking-wide mb-0.5">Hours</span>
              Mon–Sat, 9 AM – 6 PM
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-gray-800">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <p>© {year} Hamropasal. All rights reserved.</p>
        <p>Built for Nepali businesses 🇳🇵</p>
      </div>
    </div>
  </footer>
);
