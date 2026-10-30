import React, { useMemo, useState } from 'react';
import { Search, Download, Filter, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, Plus, FolderOpen, Newspaper, PlayCircle, BookOpen, TrendingUp } from 'lucide-react';
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";
import { useEffect } from "react";



import {
  getAllResources,
  fetchRemoteResources,
  subscribeResources,
  deleteResource as repoDeleteResource,
} from "../../services/resourceRepository";

const mapAdminResource = (item) => ({
  id: item.id,
  name: item.title || item.name || "Untitled Resource",
  title: item.title || item.name || "Untitled Resource",
  type: item.type === "Notes" ? "Notes" : item.type === "PDF" ? "PDFs" : item.type,
  category: item.category || "Study Materials",
  author: item.trainer || item.uploadedBy || item.author || "Admin",
  status: item.status || "Published",
  downloads: Number(item.downloads || 0),
  views: Number(item.views || 0),
  size: item.fileSize ? (item.fileSize / (1024 * 1024)).toFixed(1) + " MB" : "-",
  date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-",
  fileUrl: item.fileUrl || "",
});

const AdminResources = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const fetchResources = async () => {
    try {
      const initial = getAllResources().map(mapAdminResource);
      setResources(initial);

      try {
        const remoteItems = await fetchRemoteResources();
        if (Array.isArray(remoteItems) && remoteItems.length > 0) {
          setResources(remoteItems.map(mapAdminResource));
        }
      } catch (_e) {}
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResources();

    const unsub = subscribeResources((updated) => {
      setResources(updated.map(mapAdminResource));
    });

    return () => unsub();
  }, []);

  // DELETE FUNCTION
  const deleteResource = async (id) => {
    try {
      await repoDeleteResource(id);

      try {
        await deleteDoc(doc(db, "resources", id));
      } catch (_e) {}

      setResources(
        resources.filter((item) => item.id !== id)
      );

      alert("Resource Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const filteredRows = useMemo(() => {
    return resources.filter((row) => {
      const haystack = `${row.name} ${row.type} ${row.category} ${row.author}`.toLowerCase();
      const matchesSearch = haystack.includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'All Types' || row.type === typeFilter;
      const matchesCategory = categoryFilter === 'All Categories' || row.category === categoryFilter;
      const matchesStatus = statusFilter === 'All Status' || row.status === statusFilter;
      return matchesSearch && matchesType && matchesCategory && matchesStatus;
    });
  }, [resources, searchTerm, typeFilter, categoryFilter, statusFilter]);


      //TOTAL RESOURCE

      const totalResources = resources.length;

const publishedResources = resources.filter(
  (item) => item.status === "Published"
).length;

const draftResources = resources.filter(
  (item) => item.status === "Draft"
).length;

const totalDownloads = resources.reduce(
  (sum, item) => sum + Number(item.downloads || 0),
  0
);

const totalViews = resources.reduce(
  (sum, item) => sum + Number(item.views || 0),
  0
);

  const stats = [
  {
    label: "Total Resources",
    value: totalResources,
    change: "+0%",
    icon: FolderOpen,
  },
  {
    label: "Published Resources",
    value: publishedResources,
    change: "+0%",
    icon: Newspaper,
  },
  {
    label: "Draft Resources",
    value: draftResources,
    change: "+0%",
    icon: BookOpen,
  },
  {
    label: "Total Downloads",
    value: totalDownloads,
    change: "+0%",
    icon: Download,
  },
  {
    label: "Total Views",
    value: totalViews,
    change: "+0%",
    icon: TrendingUp,
  },
];

  return (
    <div className="text-slate-900">
      <div className="space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-[28px] font-extrabold tracking-tight">Resource Management</h2>
            <p className="text-sm text-slate-500 mt-1">Manage learning resources, articles, ebooks, videos and downloadable materials.</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/50 transition-shadow">
              <Plus className="w-4 h-4" /> Add Resource
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-bold text-slate-600 hover:bg-slate-50">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-purple-100 min-w-[230px]" placeholder="Search resources" />
              </div>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600">
                <option value="All Types">All Types</option>
                <option value="Article">Article</option>
                <option value="Interview Question">Interview Question</option>
                <option value="Cheat Sheet">Cheat Sheet</option>
                <option value="E-book">E-book</option>
                <option value="Video">Video</option>
                <option value="Download">Download</option>
              </select>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600">
                <option value="All Categories">All Categories</option>
                <option value="Java">Java</option>
                <option value="React">React</option>
                <option value="Database">Database</option>
                <option value="Backend">Backend</option>
                <option value="Full Stack">Full Stack</option>
                <option value="JavaScript">JavaScript</option>
              </select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600">
                <option value="All Status">All Status</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
              <select className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600">
                <option>Date</option>
                <option>This month</option>
                <option>This year</option>
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
                  <th className="pb-3 px-2">Resource</th>
                  <th className="pb-3 px-2">Type</th>
                  <th className="pb-3 px-2">Category</th>
                  <th className="pb-3 px-2">Author</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2">Views</th>
                  <th className="pb-3 px-2">Downloads</th>
                  <th className="pb-3 px-2">Created Date</th>
                  <th className="pb-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr key={`${row.name}-${index}`} className="border-t border-slate-100">
                    <td className="py-4 px-2 text-[13px] font-extrabold text-slate-900">{row.name}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.type}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.category}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.author}</td>
                    <td className="py-4 px-2"><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${row.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : row.status === 'Archived' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>{row.status}</span></td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.views}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.downloads}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.createdDate}</td>
                    <td className="py-4 px-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-650 transition"><Eye className="w-4 h-4" /></button>
                        <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-650 transition"><Pencil className="w-4 h-4" /></button>
                        <button  onClick={() => deleteResource(row.id)}
                        className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-650 transition">
                        <Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-5">
            <div className="text-[12px] font-semibold text-slate-500">Showing 1 to {Math.min(filteredRows.length, 5)} of {resources.length} resources</div>
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

export default AdminResources;