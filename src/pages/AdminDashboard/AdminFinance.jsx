import React, { useMemo, useState } from 'react';
import { Wallet, TrendingUp, CreditCard, Receipt, Search, Filter, Download, Eye, Pencil, Trash2, Plus, X } from 'lucide-react';

const initialTransactions = [
  { id: 'TXN-1001', user: 'Sarah Jenkins', type: 'Course Payment', amount: 12500, method: 'UPI', status: 'Completed', date: 'Aug 11, 2026' },
  { id: 'TXN-1002', user: 'Arun Kumar', type: 'Subscription', amount: 4999, method: 'Card', status: 'Pending', date: 'Aug 10, 2026' },
  { id: 'TXN-1003', user: 'Priya Sharma', type: 'Course Payment', amount: 8500, method: 'UPI', status: 'Completed', date: 'Aug 09, 2026' },
];

const AdminFinance = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [dateRange, setDateRange] = useState('Date Range');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewRecord, setViewRecord] = useState(null);
  const [draft, setDraft] = useState({ id: '', user: '', type: 'Course Payment', amount: '0', method: 'UPI', status: 'Completed', date: new Date().toISOString().slice(0, 10) });

  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const text = `${txn.id} ${txn.user} ${txn.type} ${txn.method}`.toLowerCase();
      const matchesSearch = text.includes(search.toLowerCase());
      const matchesType = typeFilter === 'All Types' || txn.type === typeFilter;
      const matchesStatus = statusFilter === 'All Status' || txn.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [transactions, search, typeFilter, statusFilter]);

  const openAdd = () => {
    setEditingId(null);
    setDraft({ id: '', user: '', type: 'Course Payment', amount: '0', method: 'UPI', status: 'Completed', date: new Date().toISOString().slice(0, 10) });
    setShowModal(true);
  };

  const openEdit = (txn) => {
    setEditingId(txn.id);
    setDraft({ ...txn, amount: String(txn.amount) });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!draft.user.trim()) return;

    const payload = {
      id: draft.id.trim() || `TXN-${Date.now()}`,
      user: draft.user.trim(),
      type: draft.type,
      amount: Number(draft.amount) || 0,
      method: draft.method,
      status: draft.status,
      date: draft.date || new Date().toISOString().slice(0, 10),
    };

    if (editingId) {
      setTransactions((current) => current.map((txn) => txn.id === editingId ? payload : txn));
    } else {
      setTransactions((current) => [payload, ...current]);
    }

    setShowModal(false);
  };

  const deleteTxn = (id) => {
    if (window.confirm('Delete this transaction?')) {
      setTransactions((current) => current.filter((txn) => txn.id !== id));
    }
  };

  const exportCsv = () => {
    const header = 'Transaction ID,User,Type,Amount,Payment Method,Status,Date';
    const rows = filteredTransactions.map((txn) => `${txn.id},${txn.user},${txn.type},${txn.amount},${txn.method},${txn.status},${txn.date}`);
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'finance-transactions.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 text-slate-900">
      <div>
        <h2 className="text-[28px] font-extrabold tracking-tight">Finance Management</h2>
        <p className="text-sm text-slate-500 mt-1">Manage payments, transactions, invoices and revenue.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '₹24.8L', change: '+14%', icon: Wallet },
          { label: 'Monthly Revenue', value: '₹8.4L', change: '+10%', icon: TrendingUp },
          { label: 'Pending Payments', value: '₹1.2L', change: '12 pending', icon: CreditCard },
          { label: 'Completed Transactions', value: '1,842', change: '+22%', icon: Receipt },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white border border-slate-100 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-5">
                <div className="w-[38px] h-[38px] rounded-xl bg-purple-100 flex items-center justify-center">
                  <Icon className="w-[19px] h-[19px] text-purple-650" />
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
                  <TrendingUp className="w-[11px] h-[11px]" />
                  {stat.change}
                </div>
              </div>
              <div className="text-[13px] text-slate-500 font-semibold mb-1">{stat.label}</div>
              <div className="text-2xl font-extrabold tracking-tight">{stat.value}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[17px] font-extrabold">Revenue Overview</h3>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">+18.2%</span>
        </div>
        <div className="h-36 flex items-end gap-3">
          {[38, 58, 36, 62, 54, 88, 68, 80, 50, 74, 40, 86].map((height, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center justify-end">
              <div className="w-full rounded-t-xl bg-gradient-to-t from-purple-700 to-purple-300" style={{ height: `${height}px` }}></div>
              <span className="text-[10px] text-slate-400 mt-2">{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][idx]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-sm min-w-[200px]">
              <Search className="h-4 w-4 text-slate-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search transactions..." className="w-full bg-transparent outline-none text-sm" />
            </div>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white">
              <option>All Types</option>
              <option>Course Payment</option>
              <option>Subscription</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white">
              <option>All Status</option>
              <option>Completed</option>
              <option>Pending</option>
            </select>
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white">
              <option>Date Range</option>
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => { setTypeFilter('All Types'); setStatusFilter('All Status'); setDateRange('Date Range'); setSearch(''); }} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button type="button" onClick={exportCsv} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50">
              <Download className="w-4 h-4" /> Export
            </button>
            <button type="button" onClick={openAdd} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/50 transition-shadow">
              <Plus className="w-4 h-4" /> Add Transaction
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[720px]">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-slate-400 font-bold">
                <th className="pb-3 px-2">Transaction ID</th><th className="pb-3 px-2">User</th><th className="pb-3 px-2">Type</th><th className="pb-3 px-2">Amount</th><th className="pb-3 px-2">Payment Method</th><th className="pb-3 px-2">Status</th><th className="pb-3 px-2">Date</th><th className="pb-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn) => (
                <tr key={txn.id} className="border-t border-slate-100">
                  <td className="py-3 px-2 font-bold text-sm text-slate-900">{txn.id}</td>
                  <td className="py-3 px-2 text-sm text-slate-600">{txn.user}</td>
                  <td className="py-3 px-2 text-sm text-slate-600">{txn.type}</td>
                  <td className="py-3 px-2 text-sm font-bold">₹{txn.amount.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-2 text-sm text-slate-600">{txn.method}</td>
                  <td className="py-3 px-2"><span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-wide ${txn.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : txn.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'}`}>{txn.status}</span></td>
                  <td className="py-3 px-2 text-sm text-slate-500">{txn.date}</td>
                  <td className="py-3 px-2 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={() => setViewRecord(txn)} className="text-slate-500 hover:text-purple-650"><Eye className="w-4 h-4" /></button>
                      <button type="button" onClick={() => openEdit(txn)} className="text-slate-500 hover:text-purple-650"><Pencil className="w-4 h-4" /></button>
                      <button type="button" onClick={() => deleteTxn(txn.id)} className="text-slate-500 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-xl font-extrabold text-slate-900">{editingId ? 'Edit Transaction' : 'Add Transaction'}</h3>
              <button type="button" onClick={() => setShowModal(false)} className="rounded-xl p-2 hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="text-sm font-semibold text-slate-700"><span className="block mb-1">Transaction ID</span><input required value={draft.id} onChange={(e) => setDraft({ ...draft, id: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2" /></label>
                <label className="text-sm font-semibold text-slate-700"><span className="block mb-1">User</span><input required value={draft.user} onChange={(e) => setDraft({ ...draft, user: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2" /></label>
                <label className="text-sm font-semibold text-slate-700"><span className="block mb-1">Type</span><select value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2"><option>Course Payment</option><option>Subscription</option><option>Refund</option></select></label>
                <label className="text-sm font-semibold text-slate-700"><span className="block mb-1">Amount</span><input type="number" value={draft.amount} onChange={(e) => setDraft({ ...draft, amount: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2" /></label>
                <label className="text-sm font-semibold text-slate-700"><span className="block mb-1">Payment Method</span><select value={draft.method} onChange={(e) => setDraft({ ...draft, method: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2"><option>UPI</option><option>Card</option><option>Net Banking</option></select></label>
                <label className="text-sm font-semibold text-slate-700"><span className="block mb-1">Status</span><select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2"><option>Completed</option><option>Pending</option><option>Failed</option></select></label>
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600">Cancel</button>
                <button type="submit" className="rounded-xl bg-purple-650 px-4 py-2 text-sm font-bold text-white">Save Transaction</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewRecord && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 px-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl w-full max-w-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-extrabold">Transaction Details</h3>
              <button type="button" onClick={() => setViewRecord(null)} className="rounded-xl p-2 hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2 text-sm">
              <div><span className="font-bold">ID:</span> {viewRecord.id}</div>
              <div><span className="font-bold">User:</span> {viewRecord.user}</div>
              <div><span className="font-bold">Type:</span> {viewRecord.type}</div>
              <div><span className="font-bold">Amount:</span> ₹{viewRecord.amount}</div>
              <div><span className="font-bold">Method:</span> {viewRecord.method}</div>
              <div><span className="font-bold">Status:</span> {viewRecord.status}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFinance;