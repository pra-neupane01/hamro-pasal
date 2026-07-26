import { useState, useEffect, useCallback } from 'react';
import {
  FaSearch, FaTimes, FaExclamationTriangle, FaBoxes,
  FaArrowUp, FaCog, FaSyncAlt, FaLock,
} from 'react-icons/fa';
import { inventoryApi, type InventoryItem } from '../api/inventory';
import { useAuth } from '../context/AuthContext';

// ── Restock Modal ─────────────────────────────────────────────────────────────
function RestockModal({ item, onClose, onDone }: { item: InventoryItem; onClose: () => void; onDone: () => void }) {
  const [qty, setQty]       = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseInt(qty);
    if (!n || n < 1) { setError('Enter a valid quantity (min 1)'); return; }
    setLoading(true);
    try { await inventoryApi.restock(item.productId, n); onDone(); }
    catch (err: any) { setError(err.message ?? 'Restock failed'); setLoading(false); }
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
        <h3 className="font-semibold text-gray-900 mb-1">Restock — {item.productName}</h3>
        <p className="text-sm text-gray-500 mb-4">Current stock: <strong>{item.quantityInStock}</strong></p>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity to add</label>
            <input type="number" min="1" value={qty} onChange={e => setQty(e.target.value)} required autoFocus
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
            <button type="submit" disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg disabled:opacity-50">
              {loading ? 'Restocking…' : 'Restock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Threshold Modal ───────────────────────────────────────────────────────────
function ThresholdModal({ item, onClose, onDone }: { item: InventoryItem; onClose: () => void; onDone: () => void }) {
  const [threshold, setThreshold] = useState(item.lowStockThreshold.toString());
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseInt(threshold);
    if (isNaN(n) || n < 0) { setError('Enter a valid threshold (min 0)'); return; }
    setLoading(true);
    try { await inventoryApi.updateThreshold(item.productId, n); onDone(); }
    catch (err: any) { setError(err.message ?? 'Update failed'); setLoading(false); }
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
        <h3 className="font-semibold text-gray-900 mb-1">Set Threshold — {item.productName}</h3>
        <p className="text-sm text-gray-500 mb-4">Current: <strong>{item.lowStockThreshold}</strong></p>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New threshold</label>
            <input type="number" min="0" value={threshold} onChange={e => setThreshold(e.target.value)} required autoFocus
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
            <button type="submit" disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg disabled:opacity-50">
              {loading ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export const Inventory = () => {
  const { isAdmin } = useAuth();
  const [items, setItems]       = useState<InventoryItem[]>([]);
  const [filtered, setFiltered] = useState<InventoryItem[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [search, setSearch]     = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'low' | 'ok'>('all');
  const [restockItem, setRestockItem]   = useState<InventoryItem | null>(null);
  const [thresholdItem, setThresholdItem] = useState<InventoryItem | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { const res = await inventoryApi.getAll(); setItems(res.data); }
    catch (err: any) { setError(err.message ?? 'Failed to load inventory'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    let list = [...items];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(i =>
        i.productName.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q) ||
        (i.categoryName ?? '').toLowerCase().includes(q));
    }
    if (statusFilter === 'low') list = list.filter(i => i.lowStock);
    if (statusFilter === 'ok')  list = list.filter(i => !i.lowStock);
    setFiltered(list);
  }, [items, search, statusFilter]);

  const lowStockCount = items.filter(i => i.lowStock).length;
  const totalUnits    = items.reduce((s, i) => s + i.quantityInStock, 0);
  const afterAction   = () => { setRestockItem(null); setThresholdItem(null); load(); };

  return (
    <div className="p-4 sm:p-6 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="text-sm text-gray-500 mt-0.5">Monitor stock levels and reorder thresholds</p>
        </div>
        <button onClick={load}
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors self-start sm:self-auto">
          <FaSyncAlt className={`text-xs ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Total SKUs</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{items.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Total Units</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalUnits.toLocaleString()}</p>
        </div>
        <div className={`rounded-xl border p-4 ${lowStockCount > 0 ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}>
          <p className="text-xs text-gray-500 mb-1">Low Stock</p>
          <p className={`text-xl sm:text-2xl font-bold ${lowStockCount > 0 ? 'text-red-600' : 'text-gray-900'}`}>{lowStockCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, SKU or category…"
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="flex rounded-lg border border-gray-300 overflow-hidden text-sm self-start">
            {(['all', 'low', 'ok'] as const).map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 font-medium transition-colors ${statusFilter === s ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
                {s === 'all' ? 'All' : s === 'low' ? 'Low Stock' : 'In Stock'}
              </button>
            ))}
          </div>
          {(search || statusFilter !== 'all') && (
            <button onClick={() => { setSearch(''); setStatusFilter('all'); }}
              className="inline-flex items-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors self-start">
              <FaTimes className="text-xs" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {error && <div className="p-4 bg-red-50 border-b border-red-200 text-red-700 text-sm">{error}</div>}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Product</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Category</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Stock</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Threshold</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Location</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Status</th>
                {isAdmin && <th className="text-center px-4 py-3 font-semibold text-gray-600">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    {Array.from({ length: isAdmin ? 7 : 6 }).map((_, j) => (
                      <td key={j} className="px-4 py-3"><div className="h-4 bg-gray-200 rounded animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 7 : 6} className="py-16 text-center">
                    <FaBoxes className="mx-auto text-4xl text-gray-300 mb-3" />
                    <p className="text-gray-500 font-medium">No inventory items found</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {search || statusFilter !== 'all' ? 'Try adjusting your filters.' : 'Add products to see inventory here.'}
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map(item => (
                  <tr key={item.inventoryId} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{item.productName}</div>
                      <div className="text-xs text-gray-400 font-mono">{item.sku}</div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-gray-600">{item.categoryName}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-semibold text-base ${item.lowStock ? 'text-red-600' : 'text-gray-900'}`}>
                        {item.quantityInStock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center hidden md:table-cell text-gray-500">{item.lowStockThreshold}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-gray-500 text-xs">{item.warehouseLocation || '—'}</td>
                    <td className="px-4 py-3 text-center">
                      {item.lowStock ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 font-medium">
                          <FaExclamationTriangle className="text-xs" /> Low
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 font-medium">OK</span>
                      )}
                    </td>
                    {isAdmin && (
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => setRestockItem(item)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Restock" aria-label="Restock">
                            <FaArrowUp className="text-sm" />
                          </button>
                          <button onClick={() => setThresholdItem(item)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Set threshold" aria-label="Set threshold">
                            <FaCog className="text-sm" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {!isAdmin && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-xl px-4 py-3">
          <FaLock className="text-gray-400 flex-shrink-0" />
          Inventory is view-only for Cashiers. Only Admins can restock or change thresholds.
        </div>
      )}

      {restockItem   && <RestockModal   item={restockItem}   onClose={() => setRestockItem(null)}   onDone={afterAction} />}
      {thresholdItem && <ThresholdModal item={thresholdItem} onClose={() => setThresholdItem(null)} onDone={afterAction} />}
    </div>
  );
};
