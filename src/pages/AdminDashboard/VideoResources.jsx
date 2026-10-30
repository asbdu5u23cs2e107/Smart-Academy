import React, { useMemo, useState } from 'react';
import { Search, Download, Filter, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, Plus, PlayCircle, TrendingUp } from 'lucide-react';

const videoSeed = [
  { title: 'JavaScript Tutorial', category: 'JavaScript', duration: '35 min', views: '12890', status: 'Published', publishedDate: 'Aug 12, 2026' },
  { title: 'React State Management Crash Course', category: 'React', duration: '48 min', views: '9840', status: 'Published', publishedDate: 'Aug 10, 2026' },
  { title: 'SQL Queries Explained', category: 'Database', duration: '22 min', views: '6780', status: 'Published', publishedDate: 'Aug 09, 2026' },
  { title: 'Spring Boot Setup Guide', category: 'Backend', duration: '40 min', views: '6230', status: 'Draft', publishedDate: 'Aug 08, 2026' },
  { title: 'API Design Patterns', category: 'Backend', duration: '51 min', views: '4580', status: 'Published', publishedDate: 'Aug 03, 2026' },
];

const VideoResources = () => {
  const [videos] = useState(videoSeed);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const filteredRows = useMemo(() => videos.filter((row) => `${row.title} ${row.category}`.toLowerCase().includes(searchTerm.toLowerCase()) && (categoryFilter === 'All Categories' || row.category === categoryFilter) && (statusFilter === 'All Status' || row.status === statusFilter)), [videos, searchTerm, categoryFilter, statusFilter]);

  return (
    <div className="text-slate-900">
      <div className="space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-[28px] font-extrabold tracking-tight">Video Resources</h2>
            <p className="text-sm text-slate-500 mt-1">Schedule, organize and publish video learning resources.</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/50 transition-shadow"><Plus className="w-4 h-4" /> Add Video</button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-bold text-slate-600 hover:bg-slate-50"><Download className="w-4 h-4" /> Export</button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Videos', value: '28', icon: PlayCircle },
            { label: 'Published Videos', value: '22', icon: PlayCircle },
            { label: 'Total Views', value: '64K', icon: TrendingUp },
            { label: 'Total Watch Time', value: '226h', icon: PlayCircle },
          ].map((stat) => {
            const Icon = stat.icon;
            return <div key={stat.label} className="bg-white border border-slate-100 rounded-2xl p-4"><div className="flex items-center justify-between mb-5"><div className="w-[38px] h-[38px] rounded-xl bg-purple-100 flex items-center justify-center"><Icon className="w-[19px] h-[19px] text-purple-650" /></div><div className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">+2</div></div><div className="text-[13px] text-slate-500 font-semibold mb-1">{stat.label}</div><div className="text-2xl font-extrabold tracking-tight">{stat.value}</div></div>;
          })}
        </div>
        <section className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex flex-wrap gap-3">
              <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-purple-100 min-w-[230px]" placeholder="Search videos" /></div>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600"><option>All Categories</option><option>JavaScript</option><option>React</option><option>Database</option><option>Backend</option></select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600"><option>All Status</option><option>Published</option><option>Draft</option></select>
            </div>
            <div className="flex gap-2"><button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50"><Filter className="w-4 h-4" /> Filter</button><button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50"><Download className="w-4 h-4" /> Export</button></div>
          </div>
          <div className="overflow-x-auto"><table className="min-w-full text-left"><thead><tr className="text-[11px] uppercase tracking-wide text-slate-400 font-bold border-b border-slate-100"><th className="pb-3 px-2">Video Title</th><th className="pb-3 px-2">Category</th><th className="pb-3 px-2">Duration</th><th className="pb-3 px-2">Views</th><th className="pb-3 px-2">Status</th><th className="pb-3 px-2">Published Date</th><th className="pb-3 px-2 text-right">Actions</th></tr></thead><tbody>{filteredRows.map((row, index) => <tr key={`${row.title}-${index}`} className="border-t border-slate-100"><td className="py-4 px-2 text-[13px] font-extrabold text-slate-900">{row.title}</td><td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.category}</td><td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.duration}</td><td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.views}</td><td className="py-4 px-2"><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${row.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{row.status}</span></td><td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.publishedDate}</td><td className="py-4 px-2 text-right"><div className="flex items-center justify-end gap-2"><button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-650 transition"><Eye className="w-4 h-4" /></button><button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-650 transition"><Pencil className="w-4 h-4" /></button><button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition"><Trash2 className="w-4 h-4" /></button></div></td></tr>)}</tbody></table></div>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-5"><div className="text-[12px] font-semibold text-slate-500">Showing 1 to {Math.min(filteredRows.length, 4)} of {filteredRows.length} videos</div><div className="flex items-center gap-2"><button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"><span className="inline-flex items-center gap-1"><ChevronLeft className="w-4 h-4" /> Previous</span></button><button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold bg-purple-650 text-white">1</button><button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold border border-slate-200 bg-white text-slate-600">2</button><button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"><span className="inline-flex items-center gap-1">Next <ChevronRight className="w-4 h-4" /></span></button></div></div>
        </section>
      </div>
    </div>
  );
};

export default VideoResources;
