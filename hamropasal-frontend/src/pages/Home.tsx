import { Link } from 'react-router-dom';
import {
  FaBoxOpen, FaChartLine, FaUsers, FaTruck, FaShieldAlt,
  FaArrowRight, FaCheckCircle, FaStar, FaQuoteLeft,
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const features = [
  {
    icon: FaBoxOpen,
    title: 'Product Management',
    desc: 'Full catalog with categories, SKU, barcode scanning, and bulk operations.',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    icon: FaChartLine,
    title: 'Sales & POS',
    desc: 'Fast checkout, multiple payment methods (Cash, eSewa, Banking), printed receipts.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: FaBoxOpen,
    title: 'Inventory Control',
    desc: 'Real-time stock tracking, low-stock alerts, reorder thresholds, and warehouse locations.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: FaChartLine,
    title: 'Analytics & Reports',
    desc: 'Monthly revenue charts, payment breakdowns, and CSV export for all transactions.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: FaUsers,
    title: 'Customer Management',
    desc: 'Customer profiles with loyalty points, purchase history, and contact details.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: FaTruck,
    title: 'Supplier Management',
    desc: 'Manage suppliers, payment terms, and track total supplied value per vendor.',
    color: 'bg-teal-100 text-teal-600',
  },
];

const testimonials = [
  {
    name: 'Ramesh Shrestha',
    role: 'Owner, Shrestha General Store, Kathmandu',
    text: 'Hamropasal halved the time we spend on stock counting. The low-stock alerts alone saved us from two stockouts this quarter.',
    rating: 5,
  },
  {
    name: 'Sita Tamang',
    role: 'Manager, Tamang Mart, Lalitpur',
    text: 'The POS system is so fast. Our cashiers love it — eSewa and cash on one screen, receipt prints instantly.',
    rating: 5,
  },
  {
    name: 'Bikash Karki',
    role: 'Owner, Karki Electronics, Bhaktapur',
    text: "The reports module shows me exactly where my money is going. I can export everything to Excel with one click.",
    rating: 5,
  },
];

const benefits = [
  'Real-time inventory updates across all devices',
  'Role-based access for Admin and Cashier staff',
  'Supports Cash, eSewa, and Banking payments',
  'Low-stock alerts with configurable thresholds',
  'CSV export for all reports and sales data',
  'Fast, mobile-friendly POS interface',
];

export const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Built for Nepali businesses
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
              Run your shop smarter with{' '}
              <span className="text-indigo-200">Hamropasal</span>
            </h1>
            <p className="text-lg sm:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              All-in-one retail management — inventory, sales POS, customer tracking, supplier management, and analytics. Built for the way Nepali businesses work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-colors text-base">
                  Go to Dashboard <FaArrowRight />
                </Link>
              ) : (
                <>
                  <Link to="/register"
                    className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-colors text-base">
                    Get started free <FaArrowRight />
                  </Link>
                  <Link to="/login"
                    className="inline-flex items-center justify-center px-8 py-3.5 border border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-base backdrop-blur-sm">
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Wave */}
        <div className="h-12 bg-gray-50" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 60\'%3E%3Cpath d=\'M0,30 C300,60 900,0 1200,30 L1200,60 L0,60 Z\' fill=\'%23f9fafb\'/%3E%3C/svg%3E")',
          backgroundSize: '100% 100%',
          marginTop: '-1px',
        }} />
      </section>

      {/* Benefits strip */}
      <section className="bg-gray-50 py-6 border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {benefits.map(b => (
              <div key={b} className="flex items-start gap-2 text-sm text-gray-700">
                <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Everything your store needs</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Six powerful modules that work together to give you full visibility and control over your retail business.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow border border-gray-100">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                  <f.icon className="text-xl" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Trusted by Nepali retailers</h2>
            <p className="text-gray-500 text-lg">Real feedback from shop owners and managers using Hamropasal daily.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <FaQuoteLeft className="text-indigo-200 text-3xl mb-4" />
                <p className="text-gray-700 leading-relaxed mb-5 text-sm">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FaStar key={i} className="text-amber-400 text-sm" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to modernise your store?
          </h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-xl mx-auto">
            Join Hamropasal today. Free to try — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register"
              className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-colors text-base">
              Create free account <FaArrowRight />
            </Link>
            <Link to="/login"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-base">
              Sign in
            </Link>
          </div>
          <p className="text-indigo-200 text-sm mt-6">
            Demo credentials: <code className="bg-white/10 px-2 py-0.5 rounded text-white">admin@hamropasal.com</code> / <code className="bg-white/10 px-2 py-0.5 rounded text-white">admin123</code>
          </p>
        </div>
      </section>
    </div>
  );
};
