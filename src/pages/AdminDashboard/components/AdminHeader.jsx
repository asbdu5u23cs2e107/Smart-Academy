import React from 'react';
import { Search, Bell, Settings, Download } from 'lucide-react';
// NO self-import — this file IS AdminHeader, it can't import itself

function DateFilterDropdown({ value, onChange }) {
  const options = ['Today', 'Last 7 Days', 'Last 30 Days', 'This Year'];
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl bg-white border border-slate-100 px-3 py-2.5 text-[13px] font-bold text-slate-600"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

const AdminHeader = ({ dateRange, onDateChange, onExport }) => {
  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex-1 min-w-[220px] flex items-center gap-2.5 bg-white border border-slate-100 rounded-xl px-4 py-2.5 text-sm text-slate-400">
          <Search className="w-4 h-4 shrink-0" />
          <span className="text-slate-400">Search courses, students, or transactions...</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-400">
          <span className="text-purple-600 relative after:content-[''] after:absolute after:-bottom-[19px] after:left-0 after:right-0 after:h-[2px] after:bg-purple-600">
            Dashboard
          </span>
          <span className="cursor-pointer hover:text-slate-600 transition-colors">Users</span>
        </div>

        <button type="button" className="relative w-[38px] h-[38px] rounded-xl bg-white border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors">
          <Bell className="w-[17px] h-[17px] text-slate-600" />
          <span className="absolute top-[7px] right-[8px] w-[7px] h-[7px] rounded-full bg-rose-500 border-[1.5px] border-white" />
        </button>

        <button type="button" className="w-[38px] h-[38px] rounded-xl bg-white border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors">
          <Settings className="w-[17px] h-[17px] text-slate-600" />
        </button>

        <div className="w-[38px] h-[38px] rounded-xl bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center text-white font-bold text-xs">
          A
        </div>
      </div>

      {/* Page head */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-[28px] font-extrabold tracking-tight">Overview</h2>
          <p className="text-sm text-slate-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
        </div>

        <div className="flex gap-2.5">
          <DateFilterDropdown value={dateRange} onChange={onDateChange} />
          <button
            type="button"
            onClick={onExport}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 text-white px-4 py-2.5 text-[13px] font-bold shadow-lg shadow-purple-600/40 hover:shadow-purple-600/50 transition-shadow"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;