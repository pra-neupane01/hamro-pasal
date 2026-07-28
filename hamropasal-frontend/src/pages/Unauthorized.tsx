import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

export const Unauthorized = () => (
  <div className="min-h-[60vh] flex items-center justify-center px-4">
    <div className="text-center max-w-sm">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FaLock className="text-red-500 text-2xl" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h1>
      <p className="text-gray-500 mb-6 text-sm leading-relaxed">
        This page is only available to Admins. Contact your administrator if you need access.
      </p>
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
      >
        Back to Dashboard
      </Link>
    </div>
  </div>
);
