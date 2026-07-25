import { useState, useEffect } from 'react';
import {
  FaChartLine,
  FaBoxOpen,
  FaUsers,
  FaTruckLoading,
  FaChartBar,
  faTags,
  faMoneyCheckDollar,
  faUserFriends,
  faShippingFast
} from 'react-icons/fa';
import { FaCalendarAlt, FaClipboardList } from 'react-icons/fa6';

export const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [salesChartData, setSalesChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock stats data
        setStats([
          { title: 'Total Sales Today', value: '$2,450', change: '+12%', icon: <FaMoneyCheckDollar className="text-green-500" />, trend: 'up' },
          { title: 'Orders Today', value: '42', change: '+8%', icon: <FaClipboardList className="text-blue-500" />, trend: 'up' },
          { title: 'Customers Served', value: '128', change: '+5%', icon: <FaUserFriends className="text-purple-500" />, trend: 'up' },
          { title: 'Inventory Value', value: '$89,200', change: '+3%', icon: <FaBoxOpen className="text-indigo-500" />, trend: 'up' }
        ]);

        // Mock recent orders
        setRecentOrders([
          { id: 'ORD-7892', customer: 'John Doe', items: 3, total: 89.99, status: 'delivered', date: '2024-01-15' },
          { id: 'ORD-7891', customer: 'Jane Smith', items: 1, total: 45.50, status: 'processing', date: '2024-01-15' },
          { id: 'ORD-7890', customer: 'Bob Wilson', items: 2, total: 120.00, status: 'shipped', date: '2024-01-14' },
          { id: 'ORD-7889', customer: 'Alice Brown', items: 4, total: 200.75, status: 'pending', date: '2024-01-14' },
          { id: 'ORD-7888', customer: 'Charlie Davis', items: 1, total: 67.25, status: 'delivered', date: '2024-01-13' }
        ]);

        // Mock low stock items
        setLowStockItems([
          { id: 1, name: 'Basmati Rice (5kg)', sku: 'RICE-001', currentStock: 5, minStock: 10, category: 'Groceries' },
          { id: 2, name: 'Coca-Cola 500ml', sku: 'DRINK-005', currentStock: 3, minStock: 15, category: 'Beverages' },
          { id: 3, name: 'Toothpaste Colgate', sku: 'HEALTH-012', currentStock: 2, minStock: 8, category: 'Personal Care' },
          { id: 4, name: 'White Bread Loaf', sku: 'BAKERY-003', currentStock: 7, minStock: 12, category: 'Bakery' },
          { id: 5, name: 'Chicken Masala', sku: 'SPICE-008', currentStock: 4, minStock: 10, category: 'Spices' }
        ]);

        // Mock sales chart data (last 7 days)
        setSalesChartData([
          { day: 'Mon', sales: 1200 },
          { day: 'Tue', sales: 1350 },
          { day: 'Wed', sales: 980 },
          { day: 'Thu', sales: 1420 },
          { day: 'Fri', sales: 1850 },
          { day: 'Sat', sales: 2100 },
          { day: 'Sun', sales: 1650 }
        ]);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-xl p-6 border border-gray-100 animate-pulse">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-50">
                  <div className="h-6 w-6 bg-blue-200 rounded-full"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Loading...</p>
                  <p className="text-lg font-bold text-gray-900">Loading...</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-100 animate-pulse">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Order #ORD-789{item}</p>
                    <p className="text-sm text-gray-500">Customer Name</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Delivered</span>
                    <span className="text-sm font-medium">$89.99</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 animate-pulse">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Low Stock Alerts</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Product Name</p>
                    <p className="text-sm text-gray-500">Category Name</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Low Stock</span>
                    <span className="text-sm font-medium">5 pcs</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 animate-pulse">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Trend (Last 7 Days)</h3>
          <div className="h-96 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center h-full text-gray-400">Loading chart...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-indigo-50">
                {stat.icon}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center text-sm mt-1">
                  <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
            <Link to="/orders" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
              View All
            </Link>
          </div>

          {recentOrders.length > 0 ? (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={getStatusClass(order.status)} className="px-2 py-1 text-xs rounded-full">
                      {order.status}
                    </span>
                    <span className="text-sm font-medium">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">No recent orders found.</p>
          )}
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Low Stock Alerts</h3>
            <Link to="/inventory" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
              View Inventory
            </Link>
          </div>

          {lowStockItems.length > 0 ? (
            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                      Low Stock
                    </span>
                    <span className="text-sm font-medium">{item.currentStock} {item.unit || 'pcs'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">All items are well stocked!</p>
          )}
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Sales Trend (Last 7 Days)</h3>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">
              Daily
            </button>
            <button className="px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded">
              Weekly
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">
              Monthly
            </button>
          </div>
        </div>
        <div className="h-96">
          {/* In a real app, this would be a chart component like Chart.js or Recharts component */}
          <div className="relative h-full w-full">
            {/* Placeholder for chart */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-600 opacity-20"></div>
            <div className="absolute inset-0 pointer-events-none">
              {/* Chart points would go here */}
              {salesChartData.map((point, index) => (
                <div key={index} className="absolute bottom-8 left-[calc(50%_-_50%+{index*12}px)] w-2 h-2 bg-indigo-600 rounded-full" />
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-gray-500 pb-2">
              {/* X-axis labels */}
              <div className="flex justify-between px-2">
                {salesChartData.map((point, index) => (
                  <span key={index} className="w-[calc(100%/_${salesChartData.length})] text-center">{point.day}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get status class
const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'shipped':
      return 'bg-blue-100 text-blue-800';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800';
    case 'pending':
      return 'bg-gray-100 text-gray-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};