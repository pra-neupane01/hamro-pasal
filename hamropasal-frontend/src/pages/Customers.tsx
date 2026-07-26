import { useState, useEffect, useCallback } from 'react';
import {
  FaSearch, FaPlus, FaEdit, FaTrash, FaTimes,
  FaUsers, FaExclamationTriangle, FaChevronLeft, FaChevronRight,
} from 'react-icons/fa';
import { customersApi, type Customer } from '../api/customers';

const fmt = (n: number) =>
  new Intl.NumberFormat('ne-NP', { style: 'currency', currency: 'NPR', maximumFractionDigits: 0 }).format(n);

// ── Add/Edit Modal ────────────────────────────────────────────────────────────
function CustomerModal({ customer, onClose, onSaved }: {
  customer?: Customer | null; onClose: () => void; onSaved: () => void;
}) {
  const isEdit = !!customer;
  const [form, setForm] = useState({
    fullName: customer?.fullName ?? '',
    email: customer?.email ?? '',
    phone: customer?.phone ?? '',
    address: customer?.address ?? '',
    city: customer?.city ?? '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone) { setError('Full name and phone are required.'); return; }
    setSaving(true); setError('');
    try {
      if (isEdit) {
        await customersApi.update({ id: customer!.id, ...form });
      } else {
        await customersApi.create(form);
      }
      onSaved();
    } catch (err: any) {
      setError(err.message ?? 'Save failed');
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{isEdit ? 'Edit Customer' : 'Add Customer'}</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg" aria-label="Close"><FaTimes /></button>
        </div>
        <form onSubmit={submit} className="px-6 py-5 space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
            <input value={form.fullName} onChange={set('fullName')} required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Customer full name" autoFocus />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
              <input value={form.phone} onChange={set('phone')} required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="98XXXXXXXX" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={form.email} onChange={set('email')}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="email@example.com" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input value={form.city} onChange={set('city')}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Kathmandu" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input value={form.address} onChange={set('address')}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Street address" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
            <button type="submit" disabled={saving}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg disabled:opacity-50">
              {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Customer'}
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
  const [error, setError] = useState('');
  const confirm = async () => {
    setLoading(true);
    try { await customersApi.delete(customer.id); onDeleted(); }
    catch (err: any) { setError(err.message ?? 'Delete failed'); setLoading(false); }
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <FaExclamationTriangle className="text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Delete Customer</h3>
            <p className="text-sm text-gray-500">This cannot be undone.</p>
          </div>
        </div>
        <p className="text-sm text-gray-700 mb-4">Delete <strong>{customer.fullName}</strong>?</p>
        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
          <button onClick={confirm} disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-50">
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Customers page ───────────────────────────────────────────────────────
export const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [modal, setModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Customer | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await customersApi.getAll({ search: search || undefined, page, size: 10 });
      setCustomers(res.data.content);
      setTotalPages(res.data.totalPages);
      setTotalElements(res.data.totalElements);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load customers');
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(0); }, [search]);

  const afterSave = () => { setModal(false); setEditTarget(null); load(); };
  const afterDelete = () => { setDeleteTarget(null); load(); };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-screen-xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 mt-0.5">{totalElements} customer{totalElements !== 1 ? 's' : ''} total</p>
        </div>
        <button onClick={() => setModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
          <FaPlus className="text-xs" /> Add Customer
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-5">
        <div className="relative max-w-sm">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, phone, email…"
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {error && <div className="p-4 bg-red-50 border-b border-red-200 text-red-700 text-sm">{error}</div>}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Customer</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Contact</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">City</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Total Purchases</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Points</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Status</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-4 py-3"><div className="h-4 bg-gray-200 rounded animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <FaUsers className="mx-auto text-4xl text-gray-300 mb-3" />
                    <p className="text-gray-500 font-medium">No customers found</p>
                    <p className="text-gray-400 text-xs mt-1">Add your first customer to get started.</p>
                  </td>
                </tr>
              ) : customers.map(c => (
                <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {c.fullName[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{c.fullName}</div>
                        <div className="text-xs text-gray-400">{c.email || '—'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-gray-600">{c.phone}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-500">{c.city || '—'}</td>
                  <td className="px-4 py-3 text-right hidden lg:table-cell font-medium text-gray-900">{fmt(c.totalPurchases)}</td>
                  <td className="px-4 py-3 text-center hidden lg:table-cell">
                    <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700 font-medium">
                      {c.loyaltyPoints} pts
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${c.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {c.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => { setEditTarget(c); setModal(true); }}
                        className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg" aria-label="Edit"><FaEdit /></button>
                      <button onClick={() => setDeleteTarget(c)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg" aria-label="Delete"><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
            <span className="text-sm text-gray-500">Page {page + 1} of {totalPages}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => p - 1)} disabled={page === 0}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-200 disabled:opacity-40" aria-label="Previous">
                <FaChevronLeft className="text-xs" />
              </button>
              <button onClick={() => setPage(p => p + 1)} disabled={page >= totalPages - 1}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-200 disabled:opacity-40" aria-label="Next">
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>
        )}
      </div>

      {modal && (
        <CustomerModal customer={editTarget} onClose={() => { setModal(false); setEditTarget(null); }} onSaved={afterSave} />
      )}
      {deleteTarget && (
        <DeleteConfirm customer={deleteTarget} onClose={() => setDeleteTarget(null)} onDeleted={afterDelete} />
      )}
    </div>
  );
};
