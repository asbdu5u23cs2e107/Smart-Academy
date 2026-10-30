import React, { useMemo, useState } from 'react';
import { Search, Download, Filter, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, FileQuestion, BarChart3, ClipboardCheck, BookOpen, Trophy, TrendingUp, Activity, FileCheck2 } from 'lucide-react';

const practiceSeed = [
  { title: 'JavaScript Input Validation', type: 'Question', difficulty: 'Medium', status: 'Active', created: 'Aug 10, 2026' },
  { title: 'React Hooks Assessment', type: 'MCQ Test', difficulty: 'Easy', status: 'Active', created: 'Aug 09, 2026' },
  { title: 'API Design Coding Challenge', type: 'Coding Problem', difficulty: 'Hard', status: 'Active', created: 'Aug 08, 2026' },
  { title: 'Full Stack Mock Sprint', type: 'Mock Test', difficulty: 'Advanced', status: 'Draft', created: 'Aug 12, 2026' },
];

const PracticeDashboard = () => {
  const [rows] = useState(practiceSeed);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRows = useMemo(() => {
    return rows.filter((row) => `${row.title} ${row.type}`.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [rows, searchTerm]);

  const stats = [
    { label: 'Total Questions', value: '328', change: '+8%', icon: FileQuestion },
    { label: 'MCQ Tests', value: '18', change: '+3%', icon: ClipboardCheck },
    { label: 'Coding Problems', value: '96', change: '+6%', icon: Code2Icon },
    { label: 'Mock Tests', value: '12', change: '+2%', icon: ClipboardCheck },
    { label: 'Total Attempts', value: '14,420', change: '+14%', icon: BarChart3 },
    { label: 'Active Quizzes', value: '24', change: '+5%', icon: BookOpen },
  ];

  return (
    <div className="text-slate-900">
      <div className="space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-[28px] font-extrabold tracking-tight">Practice Management</h2>
            <p className="text-sm text-slate-500 mt-1">Manage practice questions, tests, learning activities, and performance.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/50 transition-shadow">
            <PlusIcon /> + Add Practice Item
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((stat) => {
            const StatIcon = stat.icon;
            return (
              <div key={stat.label} className="bg-white border border-slate-100 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-[38px] h-[38px] rounded-xl bg-purple-100 flex items-center justify-center"><StatIcon className="w-[19px] h-[19px] text-purple-650" /></div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
                    <TrendingUp className="w-[11px] h-[11px]" /> {stat.change}
                  </div>
                </div>
                <div className="text-[13px] text-slate-500 font-semibold mb-1">{stat.label}</div>
                <div className="text-2xl font-extrabold tracking-tight">{stat.value}</div>
              </div>
            );
          })}
        </div>

        <section className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-purple-100 min-w-[230px]" placeholder="Search practice items" />
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50"><Filter className="w-4 h-4" /> Filter</button>
              <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50"><Download className="w-4 h-4" /> Export</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-slate-400 font-bold border-b border-slate-100">
                  <th className="pb-3 px-2">Title</th>
                  <th className="pb-3 px-2">Type</th>
                  <th className="pb-3 px-2">Difficulty</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2">Created</th>
                  <th className="pb-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr key={`${row.title}-${index}`} className="border-t border-slate-100">
                    <td className="py-4 px-2 text-[13px] font-extrabold text-slate-900">{row.title}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.type}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.difficulty}</td>
                    <td className="py-4 px-2"><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${row.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{row.status}</span></td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.created}</td>
                    <td className="py-4 px-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-650 transition"><Eye className="w-4 h-4" /></button>
                        <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-650 transition"><Pencil className="w-4 h-4" /></button>
                        <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-5">
            <div className="text-[12px] font-semibold text-slate-500">Showing 1 to {Math.min(filteredRows.length, 4)} of {filteredRows.length} practice items</div>
            <div className="flex items-center gap-2">
              <button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"><span className="inline-flex items-center gap-1"><ChevronLeft className="w-4 h-4" /> Previous</span></button>
              <button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold bg-purple-650 text-white">1</button>
              <button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold border border-slate-200 bg-white text-slate-600">2</button>
              <button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold border border-slate-200 bg-white text-slate-600">...</button>
              <button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"><span className="inline-flex items-center gap-1">Next <ChevronRight className="w-4 h-4" /></span></button>
            </div>
          </div>
        </section>

        <section className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">
          <h3 className="text-[17px] font-extrabold mb-4">Recent Practice Activity</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 border-b border-slate-100 pb-3 last:border-none last:pb-0">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-purple-650" />
              <div>
                <p className="text-[13.5px] font-semibold text-slate-700">React Hooks Assessment added to learning path</p>
                <span className="text-xs text-slate-400">2 minutes ago</span>
              </div>
            </div>
            <div className="flex items-start gap-3 border-b border-slate-100 pb-3 last:border-none last:pb-0">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <div>
                <p className="text-[13.5px] font-semibold text-slate-700">JavaScript Input Validation quiz attempts increased</p>
                <span className="text-xs text-slate-400">18 minutes ago</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
              <div>
                <p className="text-[13.5px] font-semibold text-slate-700">API Design Coding Challenge marked draft</p>
                <span className="text-xs text-slate-400">1 hour ago</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const PlusIcon = () => (
  <span className="inline-flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
    </svg>
  </span>
);

const Code2Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="m8 9-3 3 3 3M16 9l3 3-3 3M14 4l-4 16" />
  </svg>
);

export default PracticeDashboard;
