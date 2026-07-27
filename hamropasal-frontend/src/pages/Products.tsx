import { useState, useEffect, useCallback } from 'react';
import {
  FaSearch, FaPlus, FaEdit, FaTrash, FaTimes, FaChevronLeft, FaChevronRight,
  FaBoxOpen, FaExclamationTriangle, FaLock,
} from 'react-icons/fa';
import { productsApi, type Product, type Category } from '../api/products';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../lib/format';

const stockBadge = (qty: number) => {
  if (qty === 0) return { label: 'Out of Stock', cls: 'bg-red-100 text-red-700' };
  if (qty <= 10)  return { label: 'Low Stock',    cls: 'bg-yellow-100 text-yellow-700' };
  return { label: 'In Stock', cls: 'bg-green-100 text-green-700' };
};

// ── Product Modal ─────────────────────────────────────────────────────────────
function ProductModal({ mode, product, categories, onClose, onSaved }: {
  mode: 'add' | 'edit'; product?: Product | null; categories: Category[];
  onClose: () => void; onSaved: () => void;
}) {
  const [form, setForm] = useState({
    name:               product?.productName ?? '',
    description:        product?.description ?? '',
    sku:                product?.sku ?? '',
    barcode:            product?.barcode ?? '',
    price:              product?.price?.toString() ?? '',
    categoryId:         categories.find(c => c.name === product?.categoryName)?.id?.toString() ?? '',
    quantity:           product?.quantity?.toString() ?? '',
    warehouseLocation:  '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.sku || !form.barcode || !form.price || !form.categoryId) {
      setError('All required fields must be filled.');
      return;
    }
    setSaving(true);
    try {
      if (mode === 'add') {
        await productsApi.create({
          name: form.name, description: form.description, sku: form.sku,
          barcode: form.barcode, price: parseFloat(form.price),
          categoryId: parseInt(form.categoryId),
          quantity: parseInt(form.quantity) || 0,
          warehouseLocation: form.warehouseLocation,
        });
      } else {
        await productsApi.update({
          productId: product!.productId, name: form.name, description: form.description,
          sku: form.sku, barcode: form.barcode, price: parseFloat(form.price),
        });
      }
      onSaved();
    } catch (err: any) {
      setError(err.message ?? 'Failed to save product.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded shadow-xl w-full max-w-lg my-4 sm:my-0" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{mode === 'add' ? 'Add Product' : 'Edit Product'}</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100" aria-label="Close">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={submit} className="px-4 py-4 space-y-3">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3 text-sm">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
              <input value={form.name} onChange={set('name')} required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Product name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU <span className="text-red-500">*</span></label>
              <input value={form.sku} onChange={set('sku')} required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="PROD-001" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Barcode <span className="text-red-500">*</span></label>
              <input value={form.barcode} onChange={set('barcode')} required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="1234567890123" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (NPR) <span className="text-red-500">*</span></label>
              <input type="number" min="0.01" step="0.01" value={form.price} onChange={set('price')} required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
              <select value={form.categoryId} onChange={set('categoryId')} required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white">
                <option value="">Select category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            {mode === 'add' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Initial Quantity</label>
                  <input type="number" min="0" value={form.quantity} onChange={set('quantity')}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Warehouse Location</label>
                  <input value={form.warehouseLocation} onChange={set('warehouseLocation')}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="e.g. Aisle B-3" />
                </div>
              </>
            )}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={form.description} onChange={set('description')} rows={3}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 resize-none"
                placeholder="Optional description" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={onClose}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="px-3 py-1.5 text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 rounded transition-colors disabled:opacity-50">
              {saving ? 'Saving…' : mode === 'add' ? 'Add Product' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Delete confirm ────────────────────────────────────────────────────────────
function DeleteConfirm({ product, onClose, onDeleted }: {
  product: Product; onClose: () => void; onDeleted: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const confirm = async () => {
    setLoading(true);
    try { await productsApi.delete(product.productId); onDeleted(); }
    catch (err: any) { setError(err.message ?? 'Delete failed.'); setLoading(false); }
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded shadow-xl w-full max-w-sm p-5" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <FaExclamationTriangle className="text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Delete Product</h3>
            <p className="text-sm text-gray-500">This action cannot be undone.</p>
          </div>
        </div>
        <p className="text-sm text-gray-700 mb-4">Delete <strong>{product.productName}</strong>?</p>
        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded">Cancel</button>
          <button onClick={confirm} disabled={loading}
            className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded disabled:opacity-50">
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export const Products = () => {
  const { isAdmin } = useAuth();
  const [products, setProducts]       = useState<Product[]>([]);
  const [categories, setCategories]   = useState<Category[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [search, setSearch]           = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [minPrice, setMinPrice]       = useState('');
  const [maxPrice, setMaxPrice]       = useState('');
  const [pageNo, setPageNo]           = useState(0);
  const pageSize                      = 10;
  const [totalPages, setTotalPages]   = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [modal, setModal]             = useState<null | 'add' | 'edit'>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await productsApi.getAll({
        productName: search || undefined, categoryName: categoryFilter || undefined,
        minPrice: minPrice || undefined, maxPrice: maxPrice || undefined,
        pageNo, pageSize,
      });
      const paged = res.data;
      setProducts(paged.content);
      setTotalPages(paged.totalPages);
      setTotalElements(paged.totalElements);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load products.');
    } finally {
      setLoading(false);
    }
  }, [search, categoryFilter, minPrice, maxPrice, pageNo, pageSize]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { productsApi.getCategories().then(r => setCategories(r.data)).catch(() => {}); }, []);
  useEffect(() => { setPageNo(0); }, [search, categoryFilter, minPrice, maxPrice]);

  const closeModal = () => { setModal(null); setEditProduct(null); };
  const afterSave  = () => { closeModal(); load(); };
  const afterDelete = () => { setDeleteTarget(null); load(); };

  return (
    <div className="p-4 sm:p-6 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {totalElements > 0 ? `${totalElements} product${totalElements !== 1 ? 's' : ''}` : 'Manage your catalog'}
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setModal('add')}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 active:bg-black text-white text-sm font-medium rounded transition-colors shadow-sm self-start sm:self-auto"
          >
            <FaPlus className="text-xs" /> Add Product
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded border border-gray-200 p-3 mb-4">
        <div className="flex flex-col sm:flex-row flex-wrap gap-2">
          <div className="relative flex-1 min-w-0 sm:min-w-[200px]">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, SKU, barcode…"
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-slate-500" />
          </div>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 min-w-[140px]">
            <option value="">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <div className="flex gap-2">
            <input type="number" placeholder="Min price" value={minPrice} onChange={e => setMinPrice(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-slate-500" />
            <input type="number" placeholder="Max price" value={maxPrice} onChange={e => setMaxPrice(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-slate-500" />
          </div>
          {(search || categoryFilter || minPrice || maxPrice) && (
            <button onClick={() => { setSearch(''); setCategoryFilter(''); setMinPrice(''); setMaxPrice(''); }}
              className="inline-flex items-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
              <FaTimes className="text-xs" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded border border-gray-200 overflow-hidden">
        {error && <div className="p-3 bg-red-50 border-b border-red-200 text-red-700 text-sm">{error}</div>}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[540px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Product</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">SKU</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Category</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">Price</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Stock</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Status</th>
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
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 7 : 6} className="py-16 text-center">
                    <FaBoxOpen className="mx-auto text-4xl text-gray-300 mb-3" />
                    <p className="text-gray-500 font-medium">No products found</p>
                    <p className="text-gray-400 text-xs mt-1">Try adjusting your filters or add a new product.</p>
                  </td>
                </tr>
              ) : (
                products.map(p => {
                  const badge = stockBadge(p.quantity);
                  return (
                    <tr key={p.productId} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{p.productName}</div>
                        {p.description && <div className="text-xs text-gray-400 mt-0.5 truncate max-w-[200px]">{p.description}</div>}
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell text-gray-500 font-mono text-xs">{p.sku}</td>
                      <td className="px-4 py-3 hidden md:table-cell text-gray-600">{p.categoryName}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(p.price)}</td>
                      <td className="px-4 py-3 text-center text-gray-700">{p.quantity}</td>
                      <td className="px-4 py-3 text-center hidden sm:table-cell">
                        <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${badge.cls}`}>{badge.label}</span>
                      </td>
                      {isAdmin && (
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => { setEditProduct(p); setModal('edit'); }}
                              className="p-2 text-slate-700 hover:bg-slate-100 rounded transition-colors" aria-label="Edit">
                              <FaEdit className="text-sm" />
                            </button>
                            <button onClick={() => setDeleteTarget(p)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors" aria-label="Delete">
                              <FaTrash className="text-sm" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3 border-t border-gray-200 bg-gray-50">
            <span className="text-sm text-gray-500">Page {pageNo + 1} of {totalPages}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPageNo(p => p - 1)} disabled={pageNo === 0}
                className="p-2 rounded text-gray-500 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors" aria-label="Previous">
                <FaChevronLeft className="text-xs" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pg = Math.max(0, Math.min(pageNo - 2, totalPages - 5)) + i;
                return (
                  <button key={pg} onClick={() => setPageNo(pg)}
                    className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                      pg === pageNo ? 'bg-slate-800 text-white' : 'text-gray-600 hover:bg-gray-200'
                    }`}>
                    {pg + 1}
                  </button>
                );
              })}
              <button onClick={() => setPageNo(p => p + 1)} disabled={pageNo >= totalPages - 1}
                className="p-2 rounded text-gray-500 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors" aria-label="Next">
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cashier read-only notice */}
      {!isAdmin && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-200 rounded px-4 py-3">
          <FaLock className="text-gray-400 flex-shrink-0" />
          Products are read-only for Cashiers. Contact an Admin to make changes.
        </div>
      )}

      {(modal === 'add' || modal === 'edit') && (
        <ProductModal mode={modal} product={modal === 'edit' ? editProduct : null}
          categories={categories} onClose={closeModal} onSaved={afterSave} />
      )}
      {deleteTarget && (
        <DeleteConfirm product={deleteTarget} onClose={() => setDeleteTarget(null)} onDeleted={afterDelete} />
      )}
    </div>
  );
};
