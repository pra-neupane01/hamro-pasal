import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBoxOpen, FaUsers, FaTruck, FaExclamationTriangle,
  FaShoppingCart, FaMoneyBillWave, FaChartLine, FaArrowRight,
  FaSyncAlt, FaBoxes,
} from 'react-icons/fa';
import { reportsApi, type DashboardStats } from '../api/reports';
import { salesApi, type Sale } from '../api/sales';
import { inventoryApi, type InventoryItem } from '../api/inventory';
import { useAuth } from '../context/AuthContext';

const fmt = (n: number) =>
  new Intl.NumberFormat('ne-NP', { style: 'currency', currency: 'NPR', maximumFractionDigits: 0 }).format(n);

const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-NP', { month: 'short', day: 'numeric' });

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon: Icon, color, to }: {
  label: string; value: string | number; sub?: string;
  icon: React.ElementType; color: string; to: string;
}) {
  return (
    <Link to={to} className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4 hover:shadow-sm transition-shadow group">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon className="text-white text-base" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5 truncate">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
      <FaArrowRight className="text-gray-300 group-hover:text-gray-500 mt-1 flex-shrink-0 transition-colors" />
    </Link>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentSales, setRecentSales] = useState<Sale[]>([]);
  const [lowStock, setLowStock] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const load = useCallback(async () => {
    setLoading(true); setError('');
    const [statsRes, salesRes, inventoryRes] = await Promise.allSettled([
      reportsApi.getDashboardStats(),
      salesApi.getAll(),
      inventoryApi.getAll(),
    ]);

    if (statsRes.status === 'fulfilled') setStats(statsRes.value.data);
    else setError('Could not load dashboard stats. Is the backend running?');

    if (salesRes.status === 'fulfilled') {
      setRecentSales(salesRes.value.data.slice(0, 6));
    }

    if (inventoryRes.status === 'fulfilled') {
      setLowStock(inventoryRes.value.data.filter(i => i.lowStock).slice(0, 5));
    }

    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{greeting}, {user?.fullName?.split(' ')[0]} 👋</h1>
          <p className="text-sm text-gray-500 mt-0.5">Here's what's happening with your store today.</p>
        </div>
        <button onClick={load}
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors self-start sm:self-auto">
          <FaSyncAlt className={`text-xs ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 h-24 animate-pulse">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                  <div className="h-6 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <StatCard label="Monthly Revenue" value={fmt(stats?.monthlyRevenue ?? 0)}
              sub="This month" icon={FaMoneyBillWave} color="bg-green-500" to="/reports" />
            <StatCard label="Today's Sales" value={fmt(stats?.todaySales ?? 0)}
              sub={`${stats?.todayTransactions ?? 0} transactions`} icon={FaShoppingCart} color="bg-indigo-500" to="/sales" />
            <StatCard label="Total Products" value={stats?.totalProducts ?? 0}
              sub="In catalog" icon={FaBoxOpen} color="bg-violet-500" to="/products" />
            <StatCard label="Low Stock Alerts" value={stats?.lowStockProducts ?? 0}
              sub={stats?.lowStockProducts ? 'Needs reorder' : 'All stocked'}
              icon={FaExclamationTriangle}
              color={stats?.lowStockProducts ? 'bg-red-500' : 'bg-green-500'} to="/inventory" />
          </>
        )}
      </div>

      {/* Second row cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 h-24 animate-pulse">
              <div className="flex gap-4"><div className="w-10 h-10 bg-gray-200 rounded-lg" /><div className="flex-1 space-y-2"><div className="h-3 bg-gray-200 rounded w-3/4" /><div className="h-6 bg-gray-200 rounded w-1/2" /></div></div>
            </div>
          ))
        ) : (
          <>
            <StatCard label="Total Customers" value={stats?.totalCustomers ?? 0}
              icon={FaUsers} color="bg-blue-500" to="/customers" />
            <StatCard label="Total Suppliers" value={stats?.totalSuppliers ?? 0}
              icon={FaTruck} color="bg-teal-500" to="/suppliers" />
            <StatCard label="Inventory Value" value={fmt(stats?.totalInventoryValue ?? 0)}
              icon={FaBoxes} color="bg-orange-500" to="/inventory" />
          </>
        )}
      </div>

      {/* Bottom two panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <FaChartLine className="text-indigo-500" /> Recent Sales
            </h2>
            <Link to="/sales" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
              View all <FaArrowRight className="text-xs" />
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : recentSales.length === 0 ? (
            <div className="py-8 text-center text-gray-400">
              <FaShoppingCart className="mx-auto text-3xl mb-2" />
              <p className="text-sm">No sales yet. <Link to="/sales" className="text-indigo-600">Create the first one</Link></p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentSales.map(sale => (
                <div key={sale.id} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Sale #{sale.id}</p>
                    <p className="text-xs text-gray-400">{fmtDate(sale.createdAt)} · {sale.cashierName} · {sale.items.length} item{sale.items.length !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{fmt(sale.netAmount)}</p>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                      sale.paymentMethod === 'CASH' ? 'bg-green-100 text-green-700' :
                      sale.paymentMethod === 'ESEWA' ? 'bg-purple-100 text-purple-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>{sale.paymentMethod}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <FaExclamationTriangle className="text-red-500" /> Low Stock Alerts
            </h2>
            <Link to="/inventory" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
              View all <FaArrowRight className="text-xs" />
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : lowStock.length === 0 ? (
            <div className="py-8 text-center text-gray-400">
              <FaBoxes className="mx-auto text-3xl mb-2 text-green-400" />
              <p className="text-sm text-green-600 font-medium">All products are well stocked!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {lowStock.map(item => (
                <div key={item.inventoryId} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.productName}</p>
                    <p className="text-xs text-gray-400 font-mono">{item.sku} · {item.categoryName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-red-600">{item.quantityInStock} left</p>
                    <p className="text-xs text-gray-400">threshold: {item.lowStockThreshold}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
