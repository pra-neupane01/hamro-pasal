import { useState, useEffect, useCallback } from 'react';
import {
  FaSearch, FaPlus, FaEdit, FaTrash, FaTimes,
  FaTruck, FaExclamationTriangle,
} from 'react-icons/fa';
import { suppliersApi, type Supplier } from '../api/suppliers';
import { useAuth } from '../context/AuthContext';

const fmt = (n: number) =>
  new Intl.NumberFormat('ne-NP', { style: 'currency', currency: 'NPR', maximumFractionDigits: 0 }).format(n);

// ── Modal ─────────────────────────────────────────────────────────────────────
function SupplierModal({ supplier, onClose, onSaved }: {
  supplier?: Supplier | null; onClose: () => void; onSaved: () => void;
}) {
  const isEdit = !!supplier;
  const [form, setForm] = useState({
    companyName:    supplier?.companyName ?? '',
    contactPerson:  supplier?.contactPerson ?? '',
    email:          supplier?.email ?? '',
    phone:          supplier?.phone ?? '',
    address:        supplier?.address ?? '',
    city:           supplier?.city ?? '',
    paymentTerms:   supplier?.paymentTerms ?? '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName || !form.phone || !form.contactPerson) {
      setError('Company name, contact person and phone are required.'); return;
    }
    setSaving(true); setError('');
    try {
      if (isEdit) { await suppliersApi.update(supplier!.id, form); }
      else        { await suppliersApi.create(form); }
      onSaved();
    } catch (err: any) { setError(err.message ?? 'Save failed'); setSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg my-4 sm:my-0" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{isEdit ? 'Edit Supplier' : 'Add Supplier'}</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg" aria-label="Close"><FaTimes /></button>
        </div>
        <form onSubmit={submit} className="px-5 py-5 space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name <span className="text-red-500">*</span></label>
              <input value={form.companyName} onChange={set('companyName')} required autoFocus
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person <span className="text-red-500">*</span></label>
              <input value={form.contactPerson} onChange={set('contactPerson')} required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
              <input value={form.phone} onChange={set('phone')} required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="98XXXXXXXX" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={form.email} onChange={set('email')}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
              <select value={form.paymentTerms} onChange={set('paymentTerms')}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Select terms</option>
                <option value="COD">Cash on Delivery</option>
                <option value="Net 15">Net 15</option>
                <option value="Net 30">Net 30</option>
                <option value="Net 60">Net 60</option>
                <option value="Prepaid">Prepaid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input value={form.city} onChange={set('city')}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Kathmandu" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input value={form.address} onChange={set('address')}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-1">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
            <button type="submit" disabled={saving}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg disabled:opacity-50">
              {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Supplier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Delete confirm ────────────────────────────────────────────────────────────
function DeleteConfirm({ supplier, onClose, onDeleted }: {
  supplier: Supplier; onClose: () => void; onDeleted: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const confirm = async () => {
    setLoading(true);
    try { await suppliersApi.delete(supplier.id); onDeleted(); }
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
            <h3 className="font-semibold text-gray-900">Delete Supplier</h3>
            <p className="text-sm text-gray-500">This cannot be undone.</p>
          </div>
        </div>
        <p className="text-sm text-gray-700 mb-4">Delete <strong>{supplier.companyName}</strong>?</p>
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

// ── Main ──────────────────────────────────────────────────────────────────────
export const Suppliers = () => {
  const { isAdmin } = useAuth();
  const [suppliers, setSuppliers]     = useState<Supplier[]>([]);
  const [filtered, setFiltered]       = useState<Supplier[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [search, setSearch]           = useState('');
  const [modal, setModal]             = useState(false);
  const [editTarget, setEditTarget]   = useState<Supplier | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Supplier | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { const res = await suppliersApi.getAll(); setSuppliers(res.data); }
    catch (err: any) { setError(err.message ?? 'Failed to load suppliers'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!search) { setFiltered(suppliers); return; }
    const q = search.toLowerCase();
    setFiltered(suppliers.filter(s =>
      s.companyName.toLowerCase().includes(q) || s.contactPerson.toLowerCase().includes(q) ||
      s.phone.includes(q) || (s.city ?? '').toLowerCase().includes(q)
    ));
  }, [suppliers, search]);

  const afterSave   = () => { setModal(false); setEditTarget(null); load(); };
  const afterDelete = () => { setDeleteTarget(null); load(); };

  return (
    <div className="p-4 sm:p-6 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
          <p className="text-sm text-gray-500 mt-0.5">{filtered.length} supplier{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        {isAdmin && (
          <button onClick={() => setModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm self-start sm:self-auto">
            <FaPlus className="text-xs" /> Add Supplier
          </button>
        )}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-5">
        <div className="relative max-w-sm">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search suppliers…"
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {error && <div className="p-4 bg-red-50 border-b border-red-200 text-red-700 text-sm">{error}</div>}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Company</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Contact</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">City</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Payment Terms</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Total Supplied</th>
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
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 7 : 6} className="py-16 text-center">
                    <FaTruck className="mx-auto text-4xl text-gray-300 mb-3" />
                    <p className="text-gray-500 font-medium">No suppliers found</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {search ? 'No results for your search.' : 'Add your first supplier to get started.'}
                    </p>
                  </td>
                </tr>
              ) : filtered.map(s => (
                <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {s.companyName[0].toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 truncate">{s.companyName}</div>
                        <div className="text-xs text-gray-400 truncate">{s.email || '—'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="text-gray-700">{s.contactPerson}</div>
                    <div className="text-xs text-gray-400">{s.phone}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-500">{s.city || '—'}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {s.paymentTerms
                      ? <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">{s.paymentTerms}</span>
                      : '—'}
                  </td>
                  <td className="px-4 py-3 text-right hidden lg:table-cell font-medium text-gray-900">{fmt(s.totalSupplied)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${s.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {s.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => { setEditTarget(s); setModal(true); }}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" aria-label="Edit">
                          <FaEdit className="text-sm" />
                        </button>
                        <button onClick={() => setDeleteTarget(s)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" aria-label="Delete">
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
      </div>

      {modal && (
        <SupplierModal supplier={editTarget} onClose={() => { setModal(false); setEditTarget(null); }} onSaved={afterSave} />
      )}
      {deleteTarget && (
        <DeleteConfirm supplier={deleteTarget} onClose={() => setDeleteTarget(null)} onDeleted={afterDelete} />
      )}
    </div>
  );
};
