import React, { useMemo, useState } from 'react';
import { Search, Download, Filter, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, Plus, FileArchive, TrendingUp } from 'lucide-react';

const sheetsSeed = [
  { name: 'Java Cheat Sheet', technology: 'Java', category: 'Core Java', downloads: '1324', status: 'Published', createdDate: 'Aug 12, 2026' },
  { name: 'SQL Cheat Sheet', technology: 'SQL', category: 'Database', downloads: '899', status: 'Published', createdDate: 'Aug 10, 2026' },
  { name: 'React Cheat Sheet', technology: 'React', category: 'Frontend', downloads: '1200', status: 'Published', createdDate: 'Aug 09, 2026' },
  { name: 'JavaScript Cheat Sheet', technology: 'JavaScript', category: 'Frontend', downloads: '768', status: 'Draft', createdDate: 'Aug 15, 2026' },
  { name: 'Spring Boot Cheat Sheet', technology: 'Spring Boot', category: 'Backend', downloads: '514', status: 'Published', createdDate: 'Aug 03, 2026' },
  { name: 'HTML & CSS Cheat Sheet', technology: 'HTML & CSS', category: 'Frontend', downloads: '310', status: 'Archived', createdDate: 'Jul 25, 2026' },
];

const CheatSheets = () => {
  const [sheets] = useState(sheetsSeed);
  const [searchTerm, setSearchTerm] = useState('');
  const [techFilter, setTechFilter] = useState('All Technologies');

  const filteredRows = useMemo(() => sheets.filter((row) => `${row.name} ${row.technology} ${row.category}`.toLowerCase().includes(searchTerm.toLowerCase()) && (techFilter === 'All Technologies' || row.technology === techFilter)), [sheets, searchTerm, techFilter]);

  return (
    <div className="text-slate-900">
      <div className="space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-[28px] font-extrabold tracking-tight">Cheat Sheets</h2>
            <p className="text-sm text-slate-500 mt-1">Organize and distribute quick reference learning materials.</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/50 transition-shadow"><Plus className="w-4 h-4" /> Add Cheat Sheet</button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-bold text-slate-600 hover:bg-slate-50"><Download className="w-4 h-4" /> Export</button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Cheat Sheets', value: '16', icon: FileArchive },
            { label: 'Published', value: '10', icon: FileArchive },
            { label: 'Draft', value: '03', icon: FileArchive },
            { label: 'Total Downloads', value: '6.2K', icon: TrendingUp },
          ].map((stat) => {
            const Icon = stat.icon;
            return <div key={stat.label} className="bg-white border border-slate-100 rounded-2xl p-4"><div className="flex items-center justify-between mb-5"><div className="w-[38px] h-[38px] rounded-xl bg-purple-100 flex items-center justify-center"><Icon className="w-[19px] h-[19px] text-purple-650" /></div><div className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">+2</div></div><div className="text-[13px] text-slate-500 font-semibold mb-1">{stat.label}</div><div className="text-2xl font-extrabold tracking-tight">{stat.value}</div></div>;
          })}
        </div>
        <section className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex flex-wrap gap-3">
              <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-purple-100 min-w-[230px]" placeholder="Search cheat sheets" /></div>
              <select value={techFilter} onChange={(e) => setTechFilter(e.target.value)} className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600"><option>All Technologies</option><option>Java</option><option>SQL</option><option>React</option><option>JavaScript</option><option>Spring Boot</option></select>
            </div>
            <div className="flex gap-2"><button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50"><Filter className="w-4 h-4" /> Filter</button><button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50"><Download className="w-4 h-4" /> Export</button></div>
          </div>
          <div className="overflow-x-auto"><table className="min-w-full text-left"><thead><tr className="text-[11px] uppercase tracking-wide text-slate-400 font-bold border-b border-slate-100"><th className="pb-3 px-2">Cheat Sheet Name</th><th className="pb-3 px-2">Technology</th><th className="pb-3 px-2">Category</th><th className="pb-3 px-2">Downloads</th><th className="pb-3 px-2">Status</th><th className="pb-3 px-2">Created Date</th><th className="pb-3 px-2 text-right">Actions</th></tr></thead><tbody>{filteredRows.map((row, index) => <tr key={`${row.name}-${index}`} className="border-t border-slate-100"><td className="py-4 px-2 text-[13px] font-extrabold text-slate-900">{row.name}</td><td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.technology}</td><td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.category}</td><td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.downloads}</td><td className="py-4 px-2"><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${row.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : row.status === 'Draft' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'}`}>{row.status}</span></td><td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.createdDate}</td><td className="py-4 px-2 text-right"><div className="flex items-center justify-end gap-2"><button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-650 transition"><Eye className="w-4 h-4" /></button><button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-650 transition"><Pencil className="w-4 h-4" /></button><button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition"><Trash2 className="w-4 h-4" /></button></div></td></tr>)}</tbody></table></div>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-5"><div className="text-[12px] font-semibold text-slate-500">Showing 1 to {Math.min(filteredRows.length, 4)} of {filteredRows.length} cheat sheets</div><div className="flex items-center gap-2"><button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"><span className="inline-flex items-center gap-1"><ChevronLeft className="w-4 h-4" /> Previous</span></button><button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold bg-purple-650 text-white">1</button><button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold border border-slate-200 bg-white text-slate-600">2</button><button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"><span className="inline-flex items-center gap-1">Next <ChevronRight className="w-4 h-4" /></span></button></div></div>
        </section>
      </div>
    </div>
  );
};

export default CheatSheets;
