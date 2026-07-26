import { useState, useEffect, useCallback, useRef } from 'react';
import {
  FaSearch, FaPlus, FaTimes, FaReceipt, FaPrint,
  FaDownload, FaChartLine, FaChevronDown, FaChevronUp,
} from 'react-icons/fa';
import { salesApi, type Sale, type PaymentMethod } from '../api/sales';
import { productsApi, type Product } from '../api/products';

// ── helpers ───────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  new Intl.NumberFormat('ne-NP', { style: 'currency', currency: 'NPR' }).format(n);

const fmtDate = (d: string) =>
  new Date(d).toLocaleString('en-NP', { dateStyle: 'medium', timeStyle: 'short' });

const paymentLabel: Record<PaymentMethod, string> = {
  CASH: 'Cash', ESEWA: 'eSewa', BANKING: 'Banking',
};

const paymentColors: Record<PaymentMethod, string> = {
  CASH: 'bg-green-100 text-green-700',
  ESEWA: 'bg-purple-100 text-purple-700',
  BANKING: 'bg-blue-100 text-blue-700',
};

// ── CSV export ────────────────────────────────────────────────────────────────
function exportCSV(sales: Sale[]) {
  const rows = [
    ['ID', 'Date', 'Cashier', 'Items', 'Total', 'Tax', 'Net', 'Payment'],
    ...sales.map(s => [
      s.id, fmtDate(s.createdAt), s.cashierName,
      s.items.length,
      s.totalAmount.toFixed(2), s.taxAmount.toFixed(2), s.netAmount.toFixed(2),
      s.paymentMethod,
    ]),
  ];
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `sales-${Date.now()}.csv`; a.click();
  URL.revokeObjectURL(url);
}

// ── Receipt modal ─────────────────────────────────────────────────────────────
function ReceiptModal({ sale, onClose }: { sale: Sale; onClose: () => void }) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const print = () => {
    const content = receiptRef.current?.innerHTML ?? '';
    const win = window.open('', '_blank', 'width=400,height=600');
    if (!win) return;
    win.document.write(`<html><head><title>Receipt</title>
      <style>body{font-family:monospace;font-size:12px;padding:16px}
      table{width:100%}td{padding:2px 4px}hr{border:1px dashed #ccc}</style>
      </head><body>${content}</body></html>`);
    win.document.close();
    win.print();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Receipt #{sale.id}</h3>
          <div className="flex gap-2">
            <button onClick={print} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg" aria-label="Print">
              <FaPrint />
            </button>
            <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg" aria-label="Close">
              <FaTimes />
            </button>
          </div>
        </div>
        <div ref={receiptRef} className="p-5 font-mono text-xs space-y-3">
          <div className="text-center">
            <p className="font-bold text-base">Hamropasal</p>
            <p className="text-gray-500">Receipt #{sale.id}</p>
            <p className="text-gray-500">{fmtDate(sale.createdAt)}</p>
            <p className="text-gray-500">Cashier: {sale.cashierName}</p>
          </div>
          <hr className="border-dashed border-gray-300" />
          <table className="w-full">
            <thead>
              <tr className="text-gray-500">
                <th className="text-left">Item</th>
                <th className="text-right">Qty</th>
                <th className="text-right">Price</th>
                <th className="text-right">Sub</th>
              </tr>
            </thead>
            <tbody>
              {sale.items.map(item => (
                <tr key={item.id}>
                  <td className="py-0.5 max-w-24 truncate">{item.productName}</td>
                  <td className="text-right">{item.quantity}</td>
                  <td className="text-right">{item.unitPrice.toFixed(2)}</td>
                  <td className="text-right">{item.subtotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr className="border-dashed border-gray-300" />
          <div className="space-y-1">
            <div className="flex justify-between"><span>Subtotal</span><span>NPR {sale.totalAmount.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>NPR {sale.taxAmount.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold border-t border-gray-300 pt-1 text-sm">
              <span>Total</span><span>NPR {sale.netAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500"><span>Payment</span><span>{paymentLabel[sale.paymentMethod]}</span></div>
          </div>
          <p className="text-center text-gray-400">Thank you for your purchase!</p>
        </div>
      </div>
    </div>
  );
}

// ── New Sale Modal ────────────────────────────────────────────────────────────
interface CartLine { product: Product; quantity: number; }

function NewSaleModal({ onClose, onCreated }: { onClose: () => void; onCreated: (s: Sale) => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [productSearch, setProductSearch] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH');
  const [taxPct, setTaxPct] = useState('0');
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    productsApi.getAll({ pageSize: 100 })
      .then(r => setProducts(r.data.content))
      .catch(() => {})
      .finally(() => setLoadingProducts(false));
  }, []);

  const filtered = products.filter(p =>
    p.productName.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(productSearch.toLowerCase())
  );

  const addToCart = (p: Product) => {
    setCart(prev => {
      const exists = prev.find(l => l.product.productId === p.productId);
      if (exists) return prev.map(l => l.product.productId === p.productId ? { ...l, quantity: l.quantity + 1 } : l);
      return [...prev, { product: p, quantity: 1 }];
    });
  };

  const updateQty = (productId: number, qty: number) => {
    if (qty < 1) { removeFromCart(productId); return; }
    setCart(prev => prev.map(l => l.product.productId === productId ? { ...l, quantity: qty } : l));
  };

  const removeFromCart = (productId: number) =>
    setCart(prev => prev.filter(l => l.product.productId !== productId));

  const subtotal = cart.reduce((s, l) => s + l.product.price * l.quantity, 0);
  const taxAmt = subtotal * (parseFloat(taxPct) || 0) / 100;
  const total = subtotal + taxAmt;

  const submit = async () => {
    if (cart.length === 0) { setError('Add at least one item'); return; }
    setLoading(true); setError('');
    try {
      const res = await salesApi.create({
        items: cart.map(l => ({ productId: l.product.productId, quantity: l.quantity })),
        paymentMethod,
        taxAmount: taxAmt,
      });
      onCreated(res.data);
    } catch (err: any) {
      setError(err.message ?? 'Failed to create sale');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">New Sale</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100" aria-label="Close"><FaTimes /></button>
        </div>

        <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
          {/* Product picker */}
          <div className="sm:w-1/2 border-b sm:border-b-0 sm:border-r border-gray-200 flex flex-col p-4 overflow-hidden">
            <div className="relative mb-3">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input value={productSearch} onChange={e => setProductSearch(e.target.value)}
                placeholder="Search products…"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="overflow-y-auto flex-1 space-y-1">
              {loadingProducts ? (
                <div className="py-8 text-center text-gray-400 text-sm">Loading products…</div>
              ) : filtered.length === 0 ? (
                <div className="py-8 text-center text-gray-400 text-sm">No products found</div>
              ) : filtered.map(p => (
                <button key={p.productId} onClick={() => addToCart(p)}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-indigo-50 transition-colors border border-transparent hover:border-indigo-200">
                  <div className="text-sm font-medium text-gray-900">{p.productName}</div>
                  <div className="flex justify-between text-xs text-gray-500 mt-0.5">
                    <span>{p.sku}</span>
                    <span className="font-medium text-indigo-600">NPR {p.price}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cart */}
          <div className="sm:w-1/2 flex flex-col p-4 overflow-hidden">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Cart ({cart.length} items)</h3>
            <div className="flex-1 overflow-y-auto space-y-2">
              {cart.length === 0 ? (
                <div className="py-8 text-center text-gray-400 text-sm">No items added yet</div>
              ) : cart.map(line => (
                <div key={line.product.productId} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{line.product.productName}</p>
                    <p className="text-xs text-gray-500">NPR {line.product.price} × {line.quantity} = NPR {(line.product.price * line.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => updateQty(line.product.productId, line.quantity - 1)}
                      className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 text-xs font-bold flex items-center justify-center">−</button>
                    <span className="w-8 text-center text-sm font-medium">{line.quantity}</span>
                    <button onClick={() => updateQty(line.product.productId, line.quantity + 1)}
                      className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 text-xs font-bold flex items-center justify-center">+</button>
                    <button onClick={() => removeFromCart(line.product.productId)}
                      className="p-1 text-red-400 hover:text-red-600 ml-1"><FaTimes className="text-xs" /></button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary & payment */}
            <div className="border-t border-gray-200 pt-3 mt-3 space-y-3 flex-shrink-0">
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600 whitespace-nowrap">Tax %</label>
                <input type="number" min="0" max="100" step="0.5" value={taxPct} onChange={e => setTaxPct(e.target.value)}
                  className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="flex-1 border border-gray-300 rounded-lg px-2 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="CASH">Cash</option>
                  <option value="ESEWA">eSewa</option>
                  <option value="BANKING">Banking</option>
                </select>
              </div>
              <div className="text-sm space-y-1">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
                <div className="flex justify-between text-gray-500"><span>Tax ({taxPct}%)</span><span>{fmt(taxAmt)}</span></div>
                <div className="flex justify-between font-bold text-base"><span>Total</span><span>{fmt(total)}</span></div>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button onClick={submit} disabled={loading || cart.length === 0}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Processing…' : `Complete Sale · ${fmt(total)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Sales page ───────────────────────────────────────────────────────────
export const Sales = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [filtered, setFiltered] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [receiptSale, setReceiptSale] = useState<Sale | null>(null);
  const [newSaleOpen, setNewSaleOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await salesApi.getAll();
      setSales(res.data);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load sales');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    let list = [...sales];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(s =>
        String(s.id).includes(q) ||
        s.cashierName.toLowerCase().includes(q) ||
        s.items.some(i => i.productName.toLowerCase().includes(q))
      );
    }
    if (paymentFilter) list = list.filter(s => s.paymentMethod === paymentFilter);
    setFiltered(list);
  }, [sales, search, paymentFilter]);

  const totalRevenue = filtered.reduce((s, sale) => s + sale.netAmount, 0);
  const totalTax = filtered.reduce((s, sale) => s + sale.taxAmount, 0);

  const afterSale = (sale: Sale) => {
    setNewSaleOpen(false);
    setSales(prev => [sale, ...prev]);
    setReceiptSale(sale);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales</h1>
          <p className="text-sm text-gray-500 mt-0.5">{filtered.length} transaction{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => exportCSV(filtered)}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors">
            <FaDownload className="text-xs" /> Export CSV
          </button>
          <button onClick={() => setNewSaleOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <FaPlus className="text-xs" /> New Sale
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Transactions</p>
          <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Net Revenue</p>
          <p className="text-2xl font-bold text-gray-900">{fmt(totalRevenue)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 col-span-2 sm:col-span-1">
          <p className="text-xs text-gray-500 mb-1">Total Tax</p>
          <p className="text-2xl font-bold text-gray-900">{fmt(totalTax)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-5 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by ID, cashier, product…"
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <select value={paymentFilter} onChange={e => setPaymentFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">All Payment Methods</option>
          <option value="CASH">Cash</option>
          <option value="ESEWA">eSewa</option>
          <option value="BANKING">Banking</option>
        </select>
        {(search || paymentFilter) && (
          <button onClick={() => { setSearch(''); setPaymentFilter(''); }}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 px-2">
            <FaTimes className="text-xs" /> Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {error && <div className="p-4 bg-red-50 border-b border-red-200 text-red-700 text-sm">{error}</div>}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-600 w-10"></th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">#</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Cashier</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Items</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">Net Amount</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Payment</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    {Array.from({ length: 8 }).map((_, j) => (
                      <td key={j} className="px-4 py-3"><div className="h-4 bg-gray-200 rounded animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center">
                    <FaChartLine className="mx-auto text-4xl text-gray-300 mb-3" />
                    <p className="text-gray-500 font-medium">No sales found</p>
                    <p className="text-gray-400 text-xs mt-1">Create a new sale to get started.</p>
                  </td>
                </tr>
              ) : filtered.map(sale => (
                <>
                  <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <button onClick={() => setExpandedId(expandedId === sale.id ? null : sale.id)}
                        className="p-1 text-gray-400 hover:text-gray-600" aria-label="Expand">
                        {expandedId === sale.id ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
                      </button>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">#{sale.id}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-gray-500">{fmtDate(sale.createdAt)}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-gray-600">{sale.cashierName}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{sale.items.length}</td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">{fmt(sale.netAmount)}</td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${paymentColors[sale.paymentMethod]}`}>
                        {paymentLabel[sale.paymentMethod]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => setReceiptSale(sale)}
                        className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" aria-label="View receipt">
                        <FaReceipt />
                      </button>
                    </td>
                  </tr>
                  {expandedId === sale.id && (
                    <tr key={`${sale.id}-exp`} className="border-b border-gray-100 bg-indigo-50/30">
                      <td colSpan={8} className="px-8 py-3">
                        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Items</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                          {sale.items.map(item => (
                            <div key={item.id} className="text-xs bg-white rounded-lg border border-gray-200 p-2">
                              <p className="font-medium text-gray-900">{item.productName}</p>
                              <p className="text-gray-500">{item.quantity} × {fmt(item.unitPrice)} = {fmt(item.subtotal)}</p>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {receiptSale && <ReceiptModal sale={receiptSale} onClose={() => setReceiptSale(null)} />}
      {newSaleOpen && <NewSaleModal onClose={() => setNewSaleOpen(false)} onCreated={afterSale} />}
    </div>
  );
};
