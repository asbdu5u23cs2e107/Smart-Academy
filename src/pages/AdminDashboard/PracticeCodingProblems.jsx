import React, { useMemo, useState } from 'react';
import { Search, Download, Filter, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, Code2, Activity, Plus, ListChecks } from 'lucide-react';

const codingSeed = [
  { name: 'Build a Todo API', category: 'Node.js', difficulty: 'Medium', submissions: 184, status: 'Active' },
  { name: 'React Dashboard Layout', category: 'React', difficulty: 'Easy', submissions: 56, status: 'Active' },
  { name: 'Array Rotation Challenge', category: 'Data Structures', difficulty: 'Hard', submissions: 34, status: 'Draft' },
  { name: 'REST API Design Challenge', category: 'Backend', difficulty: 'Medium', submissions: 104, status: 'Active' },
];

const PracticeCodingProblems = () => {
  const [problems] = useState(codingSeed);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [difficultyFilter, setDifficultyFilter] = useState('All Difficulty');

  const filteredRows = useMemo(() => {
    return problems.filter((row) => {
      const haystack = `${row.name} ${row.category}`.toLowerCase();
      const matchesSearch = haystack.includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All Categories' || row.category === categoryFilter;
      const matchesDifficulty = difficultyFilter === 'All Difficulty' || row.difficulty === difficultyFilter;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [problems, searchTerm, categoryFilter, difficultyFilter]);

  const stats = [
    { label: 'Total Problems', value: '96', change: '+14%', icon: Code2 },
    { label: 'Easy', value: '26', change: '+2%', icon: ListChecks },
    { label: 'Medium', value: '46', change: '+6%', icon: Activity },
    { label: 'Hard', value: '24', change: '+4%', icon: Activity },
  ];

  return (
    <div className="text-slate-900">
      <div className="space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-[28px] font-extrabold tracking-tight">Coding Problem Management</h2>
            <p className="text-sm text-slate-500 mt-1">Manage coding problems, categories, and submissions.</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/50 transition-shadow">
              <Plus className="w-4 h-4" /> Add Coding Problem
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-bold text-slate-600 hover:bg-slate-50"><Download className="w-4 h-4" /> Export</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const StatIcon = stat.icon;
            return (
              <div key={stat.label} className="bg-white border border-slate-100 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-[38px] h-[38px] rounded-xl bg-purple-100 flex items-center justify-center"><StatIcon className="w-[19px] h-[19px] text-purple-650" /></div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">{stat.change}</div>
                </div>
                <div className="text-[13px] text-slate-500 font-semibold mb-1">{stat.label}</div>
                <div className="text-2xl font-extrabold tracking-tight">{stat.value}</div>
              </div>
            );
          })}
        </div>

        <section className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-purple-100 min-w-[230px]" placeholder="Search coding problems" />
              </div>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600">
                <option value="All Categories">All Categories</option>
                <option value="Node.js">Node.js</option>
                <option value="React">React</option>
                <option value="Data Structures">Data Structures</option>
                <option value="Backend">Backend</option>
              </select>
              <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)} className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600">
                <option value="All Difficulty">All Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
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
                  <th className="pb-3 px-2">Problem Name</th>
                  <th className="pb-3 px-2">Category</th>
                  <th className="pb-3 px-2">Difficulty</th>
                  <th className="pb-3 px-2">Submissions</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr key={`${row.name}-${index}`} className="border-t border-slate-100">
                    <td className="py-4 px-2 text-[13px] font-extrabold text-slate-900">{row.name}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.category}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.difficulty}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.submissions}</td>
                    <td className="py-4 px-2"><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${row.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{row.status}</span></td>
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
            <div className="text-[12px] font-semibold text-slate-500">Showing 1 to {Math.min(filteredRows.length, 4)} of {filteredRows.length} problems</div>
            <div className="flex items-center gap-2">
              <button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"><span className="inline-flex items-center gap-1"><ChevronLeft className="w-4 h-4" /> Previous</span></button>
              <button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold bg-purple-650 text-white">1</button>
              <button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold border border-slate-200 bg-white text-slate-600">2</button>
              <button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold border border-slate-200 bg-white text-slate-600">...</button>
              <button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"><span className="inline-flex items-center gap-1">Next <ChevronRight className="w-4 h-4" /></span></button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PracticeCodingProblems;
