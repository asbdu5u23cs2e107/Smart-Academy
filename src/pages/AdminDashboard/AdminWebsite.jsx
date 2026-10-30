import React, { useMemo, useState } from 'react';
import { Globe, FileText, Eye, Pencil, Trash2, Search, Plus, Download, X } from 'lucide-react';

const initialPages = [
  { id: 1, page: 'Home', url: '/', status: 'Published', lastUpdated: 'Today', author: 'Admin' },
  { id: 2, page: 'About Us', url: '/about', status: 'Published', lastUpdated: 'Aug 10, 2026', author: 'Admin' },
  { id: 3, page: 'Courses', url: '/courses', status: 'Published', lastUpdated: 'Aug 09, 2026', author: 'Admin' },
  { id: 4, page: 'Contact', url: '/contact', status: 'Draft', lastUpdated: 'Aug 08, 2026', author: 'Admin' },
];

const AdminWebsite = () => {
  const [pages, setPages] = useState(initialPages);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewRecord, setViewRecord] = useState(null);
  const [draft, setDraft] = useState({ page: '', url: '', description: '', status: 'Published', content: '', author: 'Admin' });

  const filteredPages = useMemo(() => {
    return pages.filter((page) => {
      const text = `${page.page} ${page.url} ${page.author}`.toLowerCase();
      const matchesSearch = text.includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All Status' || page.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [pages, search, statusFilter]);

  const openAdd = () => {
    setEditingId(null);
    setDraft({ page: '', url: '', description: '', status: 'Published', content: '', author: 'Admin' });
    setShowModal(true);
  };

  const openEdit = (page) => {
    setEditingId(page.id);
    setDraft({ page: page.page, url: page.url, description: '', status: page.status, content: '', author: page.author });
    setShowModal(true);
  };

  const savePage = (e) => {
    e.preventDefault();
    if (!draft.page.trim() || !draft.url.trim()) return;

    const payload = {
      id: editingId ?? Date.now(),
      page: draft.page.trim(),
      url: draft.url.trim(),
      status: draft.status,
      lastUpdated: 'Today',
      author: draft.author,
    };

    if (editingId) {
      setPages((current) => current.map((page) => page.id === editingId ? payload : page));
    } else {
      setPages((current) => [payload, ...current]);
    }

    setShowModal(false);
  };

  const deletePage = (id) => {
    if (window.confirm('Delete this page?')) {
      setPages((current) => current.filter((page) => page.id !== id));
    }
  };

  const exportCsv = () => {
    const header = 'Page,URL,Status,Last Updated,Author';
    const rows = filteredPages.map((page) => `${page.page},${page.url},${page.status},${page.lastUpdated},${page.author}`);
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'website-pages.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 text-slate-900">
      <div>
        <h2 className="text-[28px] font-extrabold tracking-tight">Website Management</h2>
        <p className="text-sm text-slate-500 mt-1">Manage website content, pages, banners and settings.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Pages', value: '24', change: '+3%', icon: FileText },
          { label: 'Published Pages', value: '18', change: '+12%', icon: Globe },
          { label: 'Draft Pages', value: '6', change: '2 pending', icon: FileText },
          { label: 'Website Visitors', value: '48,920', change: '+9%', icon: Globe },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white border border-slate-100 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-5">
                <div className="w-[38px] h-[38px] rounded-xl bg-purple-100 flex items-center justify-center">
                  <Icon className="w-[19px] h-[19px] text-purple-650" />
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">+{stat.change}</div>
              </div>
              <div className="text-[13px] text-slate-500 font-semibold mb-1">{stat.label}</div>
              <div className="text-2xl font-extrabold tracking-tight">{stat.value}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <div className="flex flex-wrap gap-3 justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-sm min-w-[210px]">
              <Search className="h-4 w-4 text-slate-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search pages..." className="w-full bg-transparent outline-none text-sm" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white">
              <option>All Status</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={openAdd} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/50 transition-shadow">
              <Plus className="w-4 h-4" /> Add Page
            </button>
            <button type="button" onClick={exportCsv} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[720px]">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-slate-400 font-bold">
                <th className="pb-3 px-2">Page</th><th className="pb-3 px-2">URL</th><th className="pb-3 px-2">Status</th><th className="pb-3 px-2">Last Updated</th><th className="pb-3 px-2">Author</th><th className="pb-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPages.map((page) => (
                <tr key={page.id} className="border-t border-slate-100">
                  <td className="py-3 px-2 font-bold text-sm text-slate-900">{page.page}</td>
                  <td className="py-3 px-2 text-sm text-slate-600">{page.url}</td>
                  <td className="py-3 px-2"><span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-wide ${page.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>{page.status}</span></td>
                  <td className="py-3 px-2 text-sm text-slate-500">{page.lastUpdated}</td>
                  <td className="py-3 px-2 text-sm text-slate-600">{page.author}</td>
                  <td className="py-3 px-2 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={() => setViewRecord(page)} className="text-slate-500 hover:text-purple-650"><Eye className="w-4 h-4" /></button>
                      <button type="button" onClick={() => openEdit(page)} className="text-slate-500 hover:text-purple-650"><Pencil className="w-4 h-4" /></button>
                      <button type="button" onClick={() => deletePage(page.id)} className="text-slate-500 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
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
              <h3 className="text-xl font-extrabold text-slate-900">{editingId ? 'Edit Page' : 'Add Page'}</h3>
              <button type="button" onClick={() => setShowModal(false)} className="rounded-xl p-2 hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={savePage} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="text-sm font-semibold text-slate-700"><span className="block mb-1">Page Name</span><input required value={draft.page} onChange={(e) => setDraft({ ...draft, page: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2" /></label>
                <label className="text-sm font-semibold text-slate-700"><span className="block mb-1">URL</span><input required value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2" /></label>
              </div>
              <label className="text-sm font-semibold text-slate-700 block"><span className="block mb-1">Page Description</span><textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2" rows="3" /></label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="text-sm font-semibold text-slate-700"><span className="block mb-1">Status</span><select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2"><option>Published</option><option>Draft</option></select></label>
                <label className="text-sm font-semibold text-slate-700"><span className="block mb-1">Content</span><input value={draft.content} onChange={(e) => setDraft({ ...draft, content: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2" /></label>
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600">Cancel</button>
                <button type="submit" className="rounded-xl bg-purple-650 px-4 py-2 text-sm font-bold text-white">Save Page</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewRecord && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 px-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl w-full max-w-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-extrabold">Page Details</h3>
              <button type="button" onClick={() => setViewRecord(null)} className="rounded-xl p-2 hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2 text-sm">
              <div><span className="font-bold">Page:</span> {viewRecord.page}</div>
              <div><span className="font-bold">URL:</span> {viewRecord.url}</div>
              <div><span className="font-bold">Status:</span> {viewRecord.status}</div>
              <div><span className="font-bold">Last Updated:</span> {viewRecord.lastUpdated}</div>
              <div><span className="font-bold">Author:</span> {viewRecord.author}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWebsite;