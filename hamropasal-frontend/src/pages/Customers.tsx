import { useState, useEffect, useCallback } from 'react';
import {
  FaSearch, FaPlus, FaEdit, FaTrash, FaTimes,
  FaUsers, FaExclamationTriangle, FaChevronLeft, FaChevronRight, FaLock,
} from 'react-icons/fa';
import { customersApi, type Customer } from '../api/customers';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../lib/format';

// ── Add/Edit Modal ────────────────────────────────────────────────────────────
function CustomerModal({ customer, onClose, onSaved }: {
  customer?: Customer | null; onClose: () => void; onSaved: () => void;
}) {
  const isEdit = !!customer;
  const [form, setForm] = useState({
    fullName: customer?.fullName ?? '', email: customer?.email ?? '',
    phone: customer?.phone ?? '', address: customer?.address ?? '', city: customer?.city ?? '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone) { setError('Full name and phone are required.'); return; }
    setSaving(true); setError('');
    try {
      if (isEdit) { await customersApi.update({ id: customer!.id, ...form }); }
      else        { await customersApi.create(form); }
      onSaved();
    } catch (err: any) { setError(err.message ?? 'Save failed'); setSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded shadow-xl w-full max-w-md my-4 sm:my-0" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{isEdit ? 'Edit Customer' : 'Add Customer'}</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100" aria-label="Close"><FaTimes /></button>
        </div>
        <form onSubmit={submit} className="px-4 py-4 space-y-3">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3 text-sm">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
            <input value={form.fullName} onChange={set('fullName')} required autoFocus
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
              <input value={form.phone} onChange={set('phone')} required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="98XXXXXXXX" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={form.email} onChange={set('email')}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input value={form.city} onChange={set('city')}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Kathmandu" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input value={form.address} onChange={set('address')}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={onClose} className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors">Cancel</button>
            <button type="submit" disabled={saving}
              className="px-3 py-1.5 text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 rounded transition-colors disabled:opacity-50">
              {saving ? 'Saving…' : isEdit ? 'Save' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Delete confirm ────────────────────────────────────────────────────────────
function DeleteConfirm({ customer, onClose, onDeleted }: {
  customer: Customer; onClose: () => void; onDeleted: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const confirm = async () => {
    setLoading(true);
    try { await customersApi.delete(customer.id); onDeleted(); }
    catch (err: any) { setError(err.message ?? 'Delete failed'); setLoading(false); }
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded shadow-xl w-full max-w-sm p-5" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <FaExclamationTriangle className="text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Delete Customer</h3>
            <p className="text-sm text-gray-500">This action cannot be undone.</p>
          </div>
        </div>
        <p className="text-sm text-gray-700 mb-4">Delete <strong>{customer.fullName}</strong>?</p>
        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded">Cancel</button>
          <button onClick={confirm} disabled={loading} className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded disabled:opacity-50">
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export const Customers = () => {
  const { isAdmin } = useAuth();
  const [customers, setCustomers]     = useState<Customer[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [search, setSearch]           = useState('');
  const [page, setPage]               = useState(0);
  const [totalPages, setTotalPages]   = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [modal, setModal]             = useState(false);
  const [editTarget, setEditTarget]   = useState<Customer | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await customersApi.getAll({ search: search || undefined, page, size: 10 });
      const data = res.data;
      
      // Defensive: ensure content exists and is an array
      if (!data || !Array.isArray(data.content)) {
        throw new Error('Invalid response format from server');
      }
      
      setCustomers(data.content);
      setTotalPages(data.totalPages ?? 0);
      setTotalElements(data.totalElements ?? 0);
    } catch (err: any) {
      console.error('Customer load error:', err);
      setError(err.message ?? 'Failed to load customers');
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(0); }, [search]);

  const afterSave   = () => { setModal(false); setEditTarget(null); load(); };
  const afterDelete = () => { setDeleteTarget(null); load(); };

  return (
    <div className="p-4 sm:p-6 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 mt-0.5">{totalElements} customer{totalElements !== 1 ? 's' : ''}</p>
        </div>
        {isAdmin && (
          <button onClick={() => setModal(true)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium rounded transition-colors shadow-sm self-start sm:self-auto">
            <FaPlus className="text-xs" /> Add Customer
          </button>
        )}
      </div>

      {/* Search */}
      <div className="bg-white rounded border border-gray-200 p-3 mb-4">
        <div className="relative max-w-sm">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, phone, email…"
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-slate-500" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded border border-gray-200 overflow-hidden">
        {error && <div className="p-3 bg-red-50 border-b border-red-200 text-red-700 text-sm">{error}</div>}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Customer</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Contact</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">City</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Purchases</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Points</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Status</th>
                {isAdmin && <th className="text-center px-4 py-3 font-semibold text-gray-600">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    {Array.from({ length: isAdmin ? 7 : 6 }).map((_, j) => (
                      <td key={j} className="px-4 py-3"><div className="h-4 bg-gray-200 rounded animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 7 : 6} className="py-16 text-center">
                    <FaUsers className="mx-auto text-4xl text-gray-300 mb-3" />
                    <p className="text-gray-500 font-medium">No customers found</p>
                    {search && <p className="text-gray-400 text-xs mt-1">Try a different search</p>}
                  </td>
                </tr>
              ) : customers.map(c => (
                <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {c.fullName?.[0]?.toUpperCase() ?? '?'}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 truncate">{c.fullName}</div>
                        {c.email && <div className="text-xs text-gray-400 truncate">{c.email}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-gray-600">{c.phone}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-500">{c.city || '—'}</td>
                  <td className="px-4 py-3 text-right hidden lg:table-cell font-medium text-gray-900">
                    {formatCurrency(c.totalPurchases ?? 0)}
                  </td>
                  <td className="px-4 py-3 text-center hidden lg:table-cell">
                    <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700 font-medium">
                      {c.loyaltyPoints ?? 0}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${
                      c.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {c.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => { setEditTarget(c); setModal(true); }}
                          className="p-2 text-slate-700 hover:bg-slate-100 rounded transition-colors" aria-label="Edit">
                          <FaEdit className="text-sm" />
                        </button>
                        <button onClick={() => setDeleteTarget(c)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors" aria-label="Delete">
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3 border-t border-gray-200 bg-gray-50">
            <span className="text-sm text-gray-500">Page {page + 1} of {totalPages}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => p - 1)} disabled={page === 0}
                className="p-2 rounded text-gray-500 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors" aria-label="Previous">
                <FaChevronLeft className="text-xs" />
              </button>
              <button onClick={() => setPage(p => p + 1)} disabled={page >= totalPages - 1}
                className="p-2 rounded text-gray-500 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors" aria-label="Next">
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>
        )}
      </div>

      {!isAdmin && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-200 rounded px-4 py-3">
          <FaLock className="text-gray-400 flex-shrink-0" />
          Customer records are read-only for Cashiers.
        </div>
      )}

      {modal && (
        <CustomerModal customer={editTarget} onClose={() => { setModal(false); setEditTarget(null); }} onSaved={afterSave} />
      )}
      {deleteTarget && (
        <DeleteConfirm customer={deleteTarget} onClose={() => setDeleteTarget(null)} onDeleted={afterDelete} />
      )}
    </div>
  );
};
