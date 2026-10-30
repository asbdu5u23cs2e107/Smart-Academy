import React, { useState } from 'react';
import { CreditCard, Download, CheckCircle2, XCircle, Clock, Search, ReceiptText } from 'lucide-react';

const transactions = [
  { id: 'TXN-980124', date: '24 Jul 2026', course: 'Full Stack Development',    amount: '₹30,000', method: 'UPI',        status: 'Success',  invoice: true  },
  { id: 'TXN-820712', date: '12 Jul 2026', course: 'React Advanced Patterns',   amount: '₹10,000', method: 'Card',       status: 'Success',  invoice: true  },
  { id: 'TXN-657203', date: '01 Jun 2026', course: 'Node.js Bootcamp',          amount: '₹8,000',  method: 'Net Banking',status: 'Refunded', invoice: false },
];

const statusConfig = {
  Success:  { color: 'bg-emerald-50 text-emerald-600 border-emerald-200',  icon: CheckCircle2 },
  Pending:  { color: 'bg-amber-50 text-amber-600 border-amber-200',        icon: Clock },
  Failed:   { color: 'bg-rose-50 text-rose-500 border-rose-200',           icon: XCircle },
  Refunded: { color: 'bg-slate-50 text-slate-500 border-slate-200',        icon: XCircle },
};

const PaymentHistory = () => {
  const [search, setSearch] = useState('');

  const filtered = transactions.filter(t =>
    t.course.toLowerCase().includes(search.toLowerCase()) ||
    t.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalPaid = transactions
    .filter(t => t.status === 'Success')
    .reduce((sum, t) => sum + parseInt(t.amount.replace(/[₹,]/g, '')), 0);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <span className="text-xs text-purple-650 font-bold uppercase tracking-widest">Student Dashboard</span>
          <h1 className="text-xl font-extrabold text-slate-900 uppercase mt-0.5 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-slate-500" /> Payment History
          </h1>
        </div>
        <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
          Total Paid: <strong className="text-slate-900 font-extrabold ml-1">
            ₹{totalPaid.toLocaleString('en-IN')}
          </strong>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Transactions',  value: transactions.length,                                 color: 'text-slate-600' },
          { label: 'Successful',    value: transactions.filter(t => t.status === 'Success').length,  color: 'text-emerald-500' },
          { label: 'Refunded',      value: transactions.filter(t => t.status === 'Refunded').length, color: 'text-slate-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="p-4 rounded-2xl bg-white/60 border border-slate-100 text-center">
            <div className={`text-2xl font-extrabold ${color}`}>{value}</div>
            <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by course or transaction ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-purple-300 transition-colors"
        />
      </div>

      {/* Transactions Table (Desktop) */}
      <div className="hidden md:block rounded-2xl overflow-hidden border border-slate-100">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase text-slate-500 tracking-wide">
            <tr>
              <th className="px-5 py-3.5">Transaction ID</th>
              <th className="px-5 py-3.5">Date</th>
              <th className="px-5 py-3.5">Course</th>
              <th className="px-5 py-3.5">Method</th>
              <th className="px-5 py-3.5">Amount</th>
              <th className="px-5 py-3.5 text-center">Status</th>
              <th className="px-5 py-3.5 text-center">Invoice</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {filtered.map(t => {
              const cfg = statusConfig[t.status];
              const StatusIcon = cfg.icon;
              return (
                <tr key={t.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-slate-800 text-[10px]">{t.id}</td>
                  <td className="px-5 py-3.5 text-slate-500 font-mono">{t.date}</td>
                  <td className="px-5 py-3.5 font-semibold text-slate-800">{t.course}</td>
                  <td className="px-5 py-3.5 text-slate-500">{t.method}</td>
                  <td className="px-5 py-3.5 font-bold text-slate-900">{t.amount}</td>
                  <td className="px-5 py-3.5 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[9px] font-bold uppercase ${cfg.color}`}>
                      <StatusIcon className="w-2.5 h-2.5" /> {t.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    {t.invoice ? (
                      <button className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-slate-300 text-[9px]">N/A</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map(t => {
          const cfg = statusConfig[t.status];
          const StatusIcon = cfg.icon;
          return (
            <div key={t.id} className="p-4 rounded-2xl bg-white/60 border border-slate-100 space-y-2.5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-mono text-[10px] font-bold text-slate-400">{t.id}</p>
                  <p className="text-sm font-bold text-slate-900">{t.course}</p>
                  <p className="text-[10px] text-slate-400">{t.date} &bull; {t.method}</p>
                </div>
                <span className="text-base font-extrabold text-slate-900">{t.amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[9px] font-bold uppercase ${cfg.color}`}>
                  <StatusIcon className="w-2.5 h-2.5" /> {t.status}
                </span>
                {t.invoice && (
                  <button className="flex items-center gap-1 text-[10px] text-purple-650 font-bold">
                    <Download className="w-3 h-3" /> Invoice
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <ReceiptText className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm font-medium">No transactions match your search.</p>
        </div>
      )}

    </div>
  );
};

export default PaymentHistory;
