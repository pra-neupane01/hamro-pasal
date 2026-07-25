import { useState } from 'react';
import {
  FaChartLine,
  FaCalendarAlt,
  FaFileInvoice,
  FaUser,
  FaMoneyCheckDollar,
  faFilter,
  faSearch
} from 'react-icons/fa';
import { FaCalendarCheck, FileInvoiceDollar } from 'react-icons/fa6';

export const Sales = () => {
  const [sales, setSales] = useState([]);
  const [dateRange, setDateRange] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [loading, setLoading] = useState(false);

  // Mock sales data
  const mockSales = [
    {
      id: 'ORD-7892',
      date: '2024-01-15',
      customer: 'John Doe',
      items: 3,
      total: 89.99,
      payment: 'completed',
      status: 'delivered',
      method: 'Credit Card'
    },
    {
      id: 'ORD-7891',
      date: '2024-01-15',
      customer: 'Jane Smith',
      items: 1,
      total: 45.50,
      payment: 'pending',
      status: 'processing',
      method: 'Cash'
    },
    {
      id: 'ORD-7890',
      date: '2024-01-14',
      customer: 'Bob Wilson',
      items: 2,
      total: 120.00,
      payment: 'completed',
      status: 'shipped',
      method: 'Bank Transfer'
    },
    {
      id: 'ORD-7889',
      date: '2024-01-14',
      customer: 'Alice Brown',
      items: 4,
      total: 200.75,
      payment: 'completed',
      status: 'pending',
      method: 'Esewa'
    },
    {
      id: 'ORD-7888',
      date: '2024-01-13',
      customer: 'Charlie Davis',
      items: 1,
      total: 67.25,
      payment: 'completed',
      status: 'delivered',
      method: 'Cash'
    },
    {
      id: 'ORD-7887',
      date: '2024-01-12',
      customer: 'Eva Patel',
      items: 5,
      total: 320.00,
      payment: 'refunded',
      status: 'returned',
      method: 'Credit Card'
    },
    {
      id: 'ORD-7886',
      date: '2024-01-11',
      customer: 'Frank Maurice',
      items: 2,
      total: 95.50,
      payment: 'completed',
      status: 'delivered',
      method: 'Khalti'
    }
  ];

  // Initialize sales data
  // useEffect(() => {
  //   fetchSales();
  // }, []);

  // const fetchSales = async () => {
  //   setLoading(true);
  //   try {
  //     // Simulate API call
  //     await new Promise(resolve => setTimeout(resolve, 800));
  //     setSales(mockSales);
  //   } catch (error) {
  //     console.error('Error fetching sales:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // For now, we'll set sales directly
  // setSales(mockSales);

  // Filter and sort sales
  const filteredSales = sales
    .filter(sale => {
      const matchesSearch = sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           sale.customer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = !dateRange || sale.date >= dateRange.split(' to ')[0] && sale.date <= dateRange.split(' to ')[1];
      const matchesPayment = !paymentStatus || sale.payment === paymentStatus;
      const matchesStatus = !orderStatus || sale.status === orderStatus;
      return matchesSearch && matchesDate && matchesPayment && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'amount-asc') return a.total - b.total;
      if (sortBy === 'amount-desc') return b.total - a.total;
      return 0;
    });

  // Date ranges for quick selection
  const dateRanges = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 Days', value: 'last7days' },
    { label: 'This Month', value: 'thismonth' },
    { label: 'Last Month', value: 'lastmonth' },
    { label: 'Custom Range', value: 'custom' }
  ];

  // Payment status options
  const paymentStatusOptions = [
    { value: 'completed', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' }
  ];

  // Order status options
  const orderStatusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'returned', label: 'Returned' }
  ];

  // Sort options
  const sortOptions = [
    { value: 'date-desc', label: 'Date: Newest First' },
    { value: 'date-asc', label: 'Date: Oldest First' },
    { value: 'amount-desc', label: 'Amount: High to Low' },
    { value: 'amount-asc', label: 'Amount: Low to High' }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading state */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Sales Overview</h2>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                <FaPlus /> New Sale
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                <FaFileInvoice /> Export Sales
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="text-sm font-medium text-blue-600">Total Sales</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">$12,450</p>
              <p className="text-sm text-green-600 mt-1">↑ 12% vs last month</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <h3 className="text-sm font-medium text-green-600">Orders Today</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">42</p>
              <p className="text-sm text-green-600 mt-1">↑ 8% vs yesterday</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <h3 className="text-sm font-medium text-purple-600">Average Order</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">$45.20</p>
              <p className="text-sm text-green-600 mt-1">↑ 5% vs last month</p>
            </div>
          </div>
          <div className="h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-2 text-gray-500">Loading sales data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Sales</h2>
          <div className="flex space-x-3">
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              onClick={() => {/* Navigate to new sale form */}}
            >
              <FaPlus />
              New Sale
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              onClick={() => {/* Export functionality */}}
            >
              <FaFileInvoice />
              Export
            </button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-blue-600">Total Sales</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              ${sales.reduce((sum, sale) => sum + sale.total, 0).toFixed(2)}
            </p>
            <p className="text-sm text-green-600 mt-1">
              ↑ 12% vs last month
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-green-600">Orders Today</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {sales.filter(sale => {
                const today = new Date().toISOString().split('T')[0];
                return sale.date === today;
              }).length}
            </p>
            <p className="text-sm text-green-600 mt-1">
              ↑ 8% vs yesterday
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-purple-600">Average Order</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              ${sales.length > 0 ? (sales.reduce((sum, sale) => sum + sale.total, 0) / sales.length).toFixed(2) : '0.00'}
            </p>
            <p className="text-sm text-green-600 mt-1">
              ↑ 5% vs last month
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              >
                <option value="">Select Date Range</option>
                {dateRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="">All Payment Status</option>
              {paymentStatusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Order Status</label>
            <select
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
              className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="">All Order Status</option>
              {orderStatusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Sales</label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by order ID or customer..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">
            Showing {filteredSales.length} of {sales.length} sales
          </div>
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="ml-2 pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSales.length > 0 ? (
                filteredSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{sale.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {new Date(sale.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sale.customer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sale.items}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">$ {sale.total.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getPaymentStatusClass(sale.payment)} className="px-3 py-1 text-xs rounded-full">
                        {getPaymentStatusLabel(sale.payment)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getOrderStatusClass(sale.status)} className="px-3 py-1 text-xs rounded-full">
                        {getOrderStatusLabel(sale.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => {/* View sale details */}}
                        className="text-indigo-600 hover:text-indigo-800"
                        title="View Details"
                      >
                        <FaEye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {/* Print receipt */}}
                        className="text-green-600 hover:text-green-800"
                        title="Print Receipt"
                      >
                        <FaPrint className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                    No sales found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination would go here */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-500">
            Showing 1-{filteredSales.length > 0 ? filteredSales.length : 0} of {sales.length} sales
          </span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              1
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 ml-2">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions for status classes and labels
const getPaymentStatusClass = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    case 'refunded':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getPaymentStatusLabel = (status) => {
  switch (status) {
    case 'completed':
      return 'Paid';
    case 'pending':
      return 'Pending';
    case 'failed':
      return 'Failed';
    case 'refunded':
      return 'Refunded';
    default:
      return 'Unknown';
  }
};

const getOrderStatusClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'shipped':
      return 'bg-indigo-100 text-indigo-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'returned':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getOrderStatusLabel = (status) => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'processing':
      return 'Processing';
    case 'shipped':
      return 'Shipped';
    case 'delivered':
      return 'Delivered';
    case 'cancelled':
      return 'Cancelled';
    case 'returned':
      return 'Returned';
    default:
      return 'Unknown';
  }
};