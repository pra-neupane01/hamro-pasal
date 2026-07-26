import { useState, useEffect, useCallback } from 'react';
import {
  FaChartBar, FaChartLine, FaDownload, FaSyncAlt, FaBoxes,
  FaUsers, FaTruck, FaExclamationTriangle, FaShoppingCart, FaMoneyBillWave,
} from 'react-icons/fa';
import { salesApi, type Sale } from '../api/sales';
import { reportsApi, type DashboardStats } from '../api/reports';

// ── helpers ───────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  new Intl.NumberFormat('ne-NP', { style: 'currency', currency: 'NPR', maximumFractionDigits: 0 }).format(n);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Build monthly aggregates from sales array
function buildMonthlyData(sales: Sale[]) {
  const now = new Date();
  const year = now.getFullYear();
  const data: { month: string; revenue: number; count: number }[] = MONTHS.map((m, i) => ({
    month: m,
    revenue: 0,
    count: 0,
  }));
  sales.forEach(s => {
    const d = new Date(s.createdAt);
    if (d.getFullYear() === year) {
      data[d.getMonth()].revenue += s.netAmount;
      data[d.getMonth()].count += 1;
    }
  });
  return data;
}

// ── Simple SVG bar chart ──────────────────────────────────────────────────────
function BarChart({ data }: { data: { month: string; value: number }[] }) {
  const max = Math.max(...data.map(d => d.value), 1);
  const H = 180;
  const barW = 24;
  const gap = 12;
  const width = data.length * (barW + gap);

  return (
    <div className="overflow-x-auto">
      <svg width={width} height={H + 28} className="min-w-full">
        {data.map((d, i) => {
          const barH = Math.max(4, (d.value / max) * H);
          const x = i * (barW + gap);
          const y = H - barH;
          return (
            <g key={d.month}>
              <rect x={x} y={y} width={barW} height={barH} rx={4}
                fill={d.value > 0 ? '#6366f1' : '#e5e7eb'} />
              <text x={x + barW / 2} y={H + 16} textAnchor="middle"
                className="text-xs" fill="#9ca3af" fontSize={10}>
                {d.month}
              </text>
              {d.value > 0 && (
                <title>{d.month}: {fmt(d.value)}</title>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Simple stat card ─────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, color, sub }: {
  label: string; value: string | number; icon: React.ElementType;
  color: string; sub?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon className="text-white text-base" />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ── Export CSV of sales ───────────────────────────────────────────────────────
function exportCSV(sales: Sale[]) {
  const rows = [
    ['ID', 'Date', 'Cashier', 'Items', 'Total', 'Tax', 'Net', 'Payment'],
    ...sales.map(s => [
      s.id,
      new Date(s.createdAt).toLocaleDateString(),
      s.cashierName,
      s.items.length,
      s.totalAmount.toFixed(2),
      s.taxAmount.toFixed(2),
      s.netAmount.toFixed(2),
      s.paymentMethod,
    ]),
  ];
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `hamropasal-report-${Date.now()}.csv`; a.click();
  URL.revokeObjectURL(url);
}

// ── Payment breakdown ─────────────────────────────────────────────────────────
function PaymentBreakdown({ sales }: { sales: Sale[] }) {
  const totals: Record<string, number> = {};
  sales.forEach(s => { totals[s.paymentMethod] = (totals[s.paymentMethod] ?? 0) + s.netAmount; });
  const total = Object.values(totals).reduce((a, b) => a + b, 0) || 1;
  const colors: Record<string, string> = { CASH: 'bg-green-500', ESEWA: 'bg-purple-500', BANKING: 'bg-blue-500' };
  const labels: Record<string, string> = { CASH: 'Cash', ESEWA: 'eSewa', BANKING: 'Banking' };

  return (
    <div className="space-y-3">
      {Object.entries(totals).sort((a, b) => b[1] - a[1]).map(([method, amount]) => (
        <div key={method}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-700 font-medium">{labels[method] ?? method}</span>
            <span className="text-gray-500">{fmt(amount)} ({((amount / total) * 100).toFixed(1)}%)</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className={`h-2 rounded-full ${colors[method] ?? 'bg-gray-400'}`}
              style={{ width: `${(amount / total) * 100}%` }} />
          </div>
        </div>
      ))}
      {Object.keys(totals).length === 0 && (
        <p className="text-sm text-gray-400">No sales data yet</p>
      )}
    </div>
  );
}

// ── Main Reports page ─────────────────────────────────────────────────────────
export const Reports = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [chartType, setChartType] = useState<'revenue' | 'count'>('revenue');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const [salesRes, statsRes] = await Promise.allSettled([
        salesApi.getAll(),
        reportsApi.getDashboardStats(),
      ]);
      if (salesRes.status === 'fulfilled') setSales(salesRes.value.data);
      if (statsRes.status === 'fulfilled') setStats(statsRes.value.data);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load reports');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const monthly = buildMonthlyData(sales);
  const chartData = monthly.map(d => ({
    month: d.month,
    value: chartType === 'revenue' ? d.revenue : d.count,
  }));

  const totalRevenue = sales.reduce((s, x) => s + x.netAmount, 0);
  const totalTax = sales.reduce((s, x) => s + x.taxAmount, 0);
  const avgSale = sales.length > 0 ? totalRevenue / sales.length : 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-sm text-gray-500 mt-0.5">Business performance overview</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => exportCSV(sales)}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors">
            <FaDownload className="text-xs" /> Export CSV
          </button>
          <button onClick={load}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors">
            <FaSyncAlt className={`text-xs ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}

      {/* Stat cards from API */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Products" value={stats.totalProducts} icon={FaBoxes} color="bg-indigo-500" />
          <StatCard label="Total Customers" value={stats.totalCustomers} icon={FaUsers} color="bg-blue-500" />
          <StatCard label="Total Suppliers" value={stats.totalSuppliers} icon={FaTruck} color="bg-teal-500" />
          <StatCard label="Low Stock" value={stats.lowStockProducts}
            icon={FaExclamationTriangle} color={stats.lowStockProducts > 0 ? 'bg-red-500' : 'bg-green-500'}
            sub={stats.lowStockProducts > 0 ? 'Needs attention' : 'All stocked'} />
        </div>
      )}

      {/* Sales summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Transactions" value={sales.length} icon={FaShoppingCart} color="bg-violet-500" />
        <StatCard label="Total Revenue" value={fmt(totalRevenue)} icon={FaMoneyBillWave} color="bg-green-500" />
        <StatCard label="Total Tax" value={fmt(totalTax)} icon={FaChartLine} color="bg-orange-500" />
        <StatCard label="Avg Transaction" value={fmt(avgSale)} icon={FaChartBar} color="bg-pink-500" />
      </div>

      {/* Monthly chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Monthly Performance ({new Date().getFullYear()})</h2>
            <div className="flex rounded-lg border border-gray-300 overflow-hidden text-xs">
              <button onClick={() => setChartType('revenue')}
                className={`px-3 py-1.5 font-medium transition-colors ${chartType === 'revenue' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
                Revenue
              </button>
              <button onClick={() => setChartType('count')}
                className={`px-3 py-1.5 font-medium transition-colors ${chartType === 'count' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
                Transactions
              </button>
            </div>
          </div>
          {loading ? (
            <div className="h-48 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <BarChart data={chartData} />
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Payment Methods</h2>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => <div key={i} className="h-8 bg-gray-200 rounded animate-pulse" />)}
            </div>
          ) : (
            <PaymentBreakdown sales={sales} />
          )}
        </div>
      </div>

      {/* Top transactions */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Recent Transactions</h2>
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map(i => <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />)}
          </div>
        ) : sales.length === 0 ? (
          <div className="py-8 text-center text-gray-400">
            <FaChartBar className="mx-auto text-3xl mb-2" />
            <p className="text-sm">No transactions yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">#</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium hidden sm:table-cell">Date</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Cashier</th>
                  <th className="text-center py-2 px-3 text-gray-500 font-medium">Items</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">Amount</th>
                  <th className="text-center py-2 px-3 text-gray-500 font-medium hidden sm:table-cell">Payment</th>
                </tr>
              </thead>
              <tbody>
                {sales.slice(0, 10).map(s => (
                  <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2.5 px-3 text-gray-700">#{s.id}</td>
                    <td className="py-2.5 px-3 text-gray-500 hidden sm:table-cell text-xs">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2.5 px-3 text-gray-700">{s.cashierName}</td>
                    <td className="py-2.5 px-3 text-center text-gray-600">{s.items.length}</td>
                    <td className="py-2.5 px-3 text-right font-medium text-gray-900">{fmt(s.netAmount)}</td>
                    <td className="py-2.5 px-3 text-center hidden sm:table-cell">
                      <span className="text-xs text-gray-500">{s.paymentMethod}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
