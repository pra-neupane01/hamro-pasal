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
import { formatCurrency, formatDate } from '../lib/format';

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, to }: {
  label: string; value: string | number; sub?: string; to: string;
}) {
  return (
    <Link to={to} className="bg-white border rounded p-3 hover:shadow-sm transition-shadow group">
      <div className="flex items-start justify-between mb-1.5">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
        <FaArrowRight className="text-gray-300 group-hover:text-gray-500 text-xs transition-colors flex-shrink-0" />
      </div>
      <p className="text-2xl font-bold text-gray-900 truncate">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
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
    <div className="p-3 sm:p-4 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{greeting}, {user?.fullName?.split(' ')[0]}</h1>
          <p className="text-xs text-gray-500 mt-0.5">Here's your store overview</p>
        </div>
        <button onClick={load}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded">
          <FaSyncAlt className={`text-xs ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      {error && (
        <div className="mb-3 px-3 py-2 bg-amber-50 border border-amber-200 text-amber-800 rounded text-sm">
          {error}
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white border rounded p-3 h-20 animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-5 bg-gray-200 rounded w-1/2" />
            </div>
          ))
        ) : (
          <>
            <StatCard label="Monthly Revenue" value={formatCurrency(stats?.monthlyRevenue ?? 0)}
              sub="This month" to="/reports" />
            <StatCard label="Today's Sales" value={formatCurrency(stats?.todaySales ?? 0)}
              sub={`${stats?.todayTransactions ?? 0} transactions`} to="/sales" />
            <StatCard label="Products" value={stats?.totalProducts ?? 0}
              sub="In catalog" to="/products" />
            <StatCard label="Low Stock" value={stats?.lowStockProducts ?? 0}
              sub={stats?.lowStockProducts ? 'Needs reorder' : 'All stocked'} to="/inventory" />
          </>
        )}
      </div>

      {/* Second row cards */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white border rounded p-3 h-20 animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-5 bg-gray-200 rounded w-1/2" />
            </div>
          ))
        ) : (
          <>
            <StatCard label="Customers" value={stats?.totalCustomers ?? 0} to="/customers" />
            <StatCard label="Suppliers" value={stats?.totalSuppliers ?? 0} to="/suppliers" />
            <StatCard label="Inventory Value" value={formatCurrency(stats?.totalInventoryValue ?? 0)} to="/inventory" />
          </>
        )}
      </div>

      {/* Bottom two panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Recent Sales */}
        <div className="bg-white border rounded p-3">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
              <FaChartLine className="text-slate-600 text-xs" /> Recent Sales
            </h2>
            <Link to="/sales" className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1">
              View all <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-11 bg-gray-100 rounded animate-pulse" />
              ))}
            </div>
          ) : recentSales.length === 0 ? (
            <div className="py-8 text-center text-gray-400">
              <FaShoppingCart className="mx-auto text-2xl mb-1.5 text-gray-300" />
              <p className="text-xs">No sales yet</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {recentSales.map(sale => (
                <div key={sale.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Sale #{sale.id}</p>
                    <p className="text-xs text-gray-400">{formatDate(sale.createdAt)} · {sale.cashierName} · {sale.items.length} items</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{formatCurrency(sale.netAmount)}</p>
                    <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
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
        <div className="bg-white border rounded p-3">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
              <FaExclamationTriangle className="text-red-600 text-xs" /> Low Stock Alerts
            </h2>
            <Link to="/inventory" className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1">
              View all <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-11 bg-gray-100 rounded animate-pulse" />
              ))}
            </div>
          ) : lowStock.length === 0 ? (
            <div className="py-8 text-center">
              <FaBoxes className="mx-auto text-2xl mb-1.5 text-green-500" />
              <p className="text-xs text-green-600 font-medium">All products well stocked</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {lowStock.map(item => (
                <div key={item.inventoryId} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.productName}</p>
                    <p className="text-xs text-gray-400 font-mono">{item.sku} · {item.categoryName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-red-600">{item.quantityInStock}</p>
                    <p className="text-xs text-gray-400">min: {item.lowStockThreshold}</p>
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
