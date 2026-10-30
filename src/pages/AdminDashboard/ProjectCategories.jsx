import React, { useMemo, useState } from 'react';
import { Search, Download, Filter, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, FolderOpen, Layers, Plus, TrendingUp } from 'lucide-react';

const categorySeed = [
  { name: 'Web Development', description: 'Frontend and full stack web applications', projects: 12, status: 'Active', created: 'Aug 01, 2026' },
  { name: 'Mobile Development', description: 'Android and cross-platform mobile apps', projects: 5, status: 'Active', created: 'Aug 04, 2026' },
  { name: 'Java', description: 'Core Java and backend application projects', projects: 8, status: 'Active', created: 'Aug 06, 2026' },
  { name: 'Python', description: 'Python coding and automation projects', projects: 10, status: 'Active', created: 'Aug 07, 2026' },
  { name: 'React', description: 'React and UI development projects', projects: 15, status: 'Active', created: 'Aug 08, 2026' },
  { name: 'Full Stack', description: 'End-to-end development projects', projects: 7, status: 'Active', created: 'Aug 10, 2026' },
  { name: 'Data Science', description: 'Analytics, dashboards and model-driven work', projects: 6, status: 'Active', created: 'Aug 12, 2026' },
  { name: 'AI & ML', description: 'ML pipelines, prompts, and intelligent systems', projects: 4, status: 'Draft', created: 'Aug 15, 2026' },
];

const ProjectCategories = () => {
  const [categories] = useState(categorySeed);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRows = useMemo(() => {
    return categories.filter((row) => `${row.name} ${row.description}`.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [categories, searchTerm]);

  const stats = [
    { label: 'Total Categories', value: '08', change: '+2%', icon: FolderOpen },
    { label: 'Active Categories', value: '07', change: '+3%', icon: Layers },
    { label: 'Total Projects', value: '24', change: '+8%', icon: FolderOpen },
  ];

  return (
    <div className="text-slate-900">
      <div className="space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-[28px] font-extrabold tracking-tight">Project Categories</h2>
            <p className="text-sm text-slate-500 mt-1">Organize categories across project challenge sets.</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/50 transition-shadow">
              <Plus className="w-4 h-4" /> Add Category
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-bold text-slate-600 hover:bg-slate-50"><Download className="w-4 h-4" /> Export</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat) => {
            const StatIcon = stat.icon;
            return (
              <div key={stat.label} className="bg-white border border-slate-100 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-[38px] h-[38px] rounded-xl bg-purple-100 flex items-center justify-center"><StatIcon className="w-[19px] h-[19px] text-purple-650" /></div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full"><TrendingUp className="w-[11px] h-[11px]" /> {stat.change}</div>
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
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-purple-100 min-w-[230px]" placeholder="Search categories" />
              </div>
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
                  <th className="pb-3 px-2">Category Name</th>
                  <th className="pb-3 px-2">Description</th>
                  <th className="pb-3 px-2">Projects</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2">Created Date</th>
                  <th className="pb-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr key={`${row.name}-${index}`} className="border-t border-slate-100">
                    <td className="py-4 px-2 text-[13px] font-extrabold text-slate-900">{row.name}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.description}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.projects}</td>
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
            <div className="text-[12px] font-semibold text-slate-500">Showing 1 to {Math.min(filteredRows.length, 4)} of {filteredRows.length} categories</div>
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

export default ProjectCategories;
