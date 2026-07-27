import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBox, FaShoppingCart, FaUsers, FaTruck, FaChartLine, FaShieldAlt,
  FaBars, FaTimes, FaPlay, FaArrowRight, FaCheck,
} from 'react-icons/fa';

// ── Logo Component ────────────────────────────────────────────────────────────
function LandingLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="6" fill="#1e293b"/>
        <path d="M8 12h16v2H8v-2zm0 4h16v2H8v-2zm0 4h12v2H8v-2z" fill="#fff"/>
        <circle cx="22" cy="22" r="3" fill="#22c55e"/>
      </svg>
      <span className="text-xl font-bold text-gray-900">Hamropasal</span>
    </div>
  );
}

// ── Nav Component ─────────────────────────────────────────────────────────────
function LandingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <LandingLogo />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
            <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">About</Link>
            <Link to="/contact" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 rounded transition-colors">
              Start Free Trial
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-200">
            <a href="#features" className="block text-sm font-medium text-gray-600 hover:text-gray-900">Features</a>
            <a href="#pricing" className="block text-sm font-medium text-gray-600 hover:text-gray-900">Pricing</a>
            <Link to="/about" className="block text-sm font-medium text-gray-600 hover:text-gray-900">About</Link>
            <Link to="/contact" className="block text-sm font-medium text-gray-600 hover:text-gray-900">Contact</Link>
            <div className="pt-3 space-y-2">
              <Link to="/login" className="block w-full px-4 py-2 text-sm font-medium text-center text-gray-700 border border-gray-300 rounded">
                Sign In
              </Link>
              <Link to="/register" className="block w-full px-4 py-2 text-sm font-medium text-center text-white bg-slate-800 rounded">
                Start Free Trial
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ── Landing Footer ────────────────────────────────────────────────────────────
function LandingFooter() {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="6" fill="#fff"/>
                <path d="M8 12h16v2H8v-2zm0 4h16v2H8v-2zm0 4h12v2H8v-2z" fill="#1e293b"/>
                <circle cx="22" cy="22" r="3" fill="#22c55e"/>
              </svg>
              <span className="text-lg font-bold text-white">Hamropasal</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Modern retail management for Nepali businesses. Inventory, sales, and customer management in one platform.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="w-8 h-8 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-sm hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-sm hover:text-white transition-colors">Pricing</a></li>
              <li><Link to="/dashboard" className="text-sm hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/sales" className="text-sm hover:text-white transition-colors">Sales POS</Link></li>
              <li><Link to="/reports" className="text-sm hover:text-white transition-colors">Reports</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Partners</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-xs text-gray-500 block mb-0.5">Location</span>
                <span className="text-sm">Kathmandu, Nepal</span>
              </li>
              <li>
                <span className="text-xs text-gray-500 block mb-0.5">Email</span>
                <a href="mailto:info@hamropasal.com" className="text-sm hover:text-white transition-colors">info@hamropasal.com</a>
              </li>
              <li>
                <span className="text-xs text-gray-500 block mb-0.5">Phone</span>
                <a href="tel:+9771234567890" className="text-sm hover:text-white transition-colors">+977 123-456-7890</a>
              </li>
              <li>
                <span className="text-xs text-gray-500 block mb-0.5">Business Hours</span>
                <span className="text-sm">Sun-Fri, 10AM-6PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© 2026 Hamropasal. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Main Landing Page ─────────────────────────────────────────────────────────
export function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNav />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Run your store, not your spreadsheets
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8">
                Complete retail management for Nepal. Inventory, sales, and customers—all in one powerful platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-white bg-slate-800 hover:bg-slate-900 rounded transition-colors">
                  Start Free Trial <FaArrowRight className="text-sm" />
                </Link>
                <button className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-gray-700 border border-gray-300 hover:border-gray-400 rounded transition-colors">
                  <FaPlay className="text-sm" /> See How It Works
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-white rounded-lg border border-gray-200 shadow-2xl overflow-hidden transform rotate-1">
                <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-400">hamropasal.com/dashboard</div>
                </div>
                <img src="/dashboard-preview.png" alt="Dashboard Preview" className="w-full" 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden bg-gradient-to-br from-slate-100 to-slate-200 aspect-video flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-lg shadow-sm flex items-center justify-center">
                      <FaChartLine className="text-2xl text-slate-600" />
                    </div>
                    <p className="text-sm text-gray-600">Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-500 mb-8">Trusted by retailers across Nepal</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-40">
            {['Store 1', 'Store 2', 'Store 3', 'Store 4'].map((name, i) => (
              <div key={i} className="text-xl font-bold text-gray-400">{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Everything you need to run your retail business</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built for Nepali retailers who need powerful tools without the complexity. Manage inventory, process sales, and grow your customer base.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: FaBox, title: 'Inventory Tracking', desc: 'Real-time stock levels, low stock alerts, and automated reordering' },
              { icon: FaShoppingCart, title: 'Sales & POS', desc: 'Fast checkout, multiple payment methods, and detailed sales history' },
              { icon: FaUsers, title: 'Customer Management', desc: 'Track purchases, loyalty points, and customer preferences' },
              { icon: FaTruck, title: 'Supplier Management', desc: 'Manage supplier relationships, payment terms, and purchase orders' },
              { icon: FaChartLine, title: 'Multi-store Reports', desc: 'Comprehensive analytics across all locations in real-time' },
              { icon: FaShieldAlt, title: 'Role-based Access', desc: 'Secure permissions for admins, cashiers, and staff members' },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                  <feature.icon className="text-xl text-slate-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">40%</div>
              <div className="text-lg text-gray-300">Faster checkout process</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">Real-time</div>
              <div className="text-lg text-gray-300">Stock alerts & synchronization</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">Multi-store</div>
              <div className="text-lg text-gray-300">Ready for business growth</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
            <p className="text-lg text-gray-600">Choose the plan that's right for your business</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1: Get Started */}
            <div className="bg-white rounded-lg border-2 border-slate-800 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">For Retailers</h3>
              <p className="text-gray-600 mb-6">Start managing your store today with our 14-day free trial. No credit card required.</p>
              <ul className="space-y-3 mb-8">
                {['All core features', 'Email support', 'Free updates', 'Training materials'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className="block w-full py-3 text-center text-white bg-slate-800 hover:bg-slate-900 rounded font-medium transition-colors">
                Start Free Trial
              </Link>
            </div>

            {/* Card 2: Enterprise */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">For Enterprises</h3>
              <p className="text-gray-600 mb-6">Custom solutions for multi-location businesses with advanced needs.</p>
              <ul className="space-y-3 mb-8">
                {['Custom integrations', 'Dedicated support', 'On-premise deployment', 'SLA guarantee'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="block w-full py-3 text-center text-slate-800 border-2 border-slate-800 hover:bg-slate-50 rounded font-medium transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
