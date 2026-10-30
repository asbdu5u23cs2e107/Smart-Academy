import React, { useMemo, useState } from 'react';
import { Briefcase, Users, GraduationCap, TrendingUp, Plus, Eye, Pencil, Trash2, Search, Filter, Download, X } from 'lucide-react';

const initialJobs = [
  { id: 1, title: 'Java Developer', company: 'TCS', type: 'Full Time', location: 'Chennai', applications: 245, status: 'Active', postedDate: 'Aug 10, 2026' },
  { id: 2, title: 'Frontend Developer', company: 'Zoho', type: 'Full Time', location: 'Chennai', applications: 182, status: 'Active', postedDate: 'Aug 08, 2026' },
  { id: 3, title: 'Software Engineer', company: 'Infosys', type: 'Full Time', location: 'Bangalore', applications: 320, status: 'Closed', postedDate: 'Aug 05, 2026' },
  { id: 4, title: 'Junior Java Developer', company: 'Wipro', type: 'Internship', location: 'Chennai', applications: 156, status: 'Active', postedDate: 'Aug 02, 2026' },
];

const AdminCareer = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [typeFilter, setTypeFilter] = useState('All Job Types');
  const [companyFilter, setCompanyFilter] = useState('All Companies');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewRecord, setViewRecord] = useState(null);
  const [draft, setDraft] = useState({
    title: '', company: '', type: 'Full Time', location: '', salary: '', description: '', requirements: '', deadline: '', status: 'Active'
  });

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const find = `${job.title} ${job.company} ${job.location}`.toLowerCase();
      const matchesSearch = find.includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All Status' || job.status === statusFilter;
      const matchesType = typeFilter === 'All Job Types' || job.type === typeFilter;
      const matchesCompany = companyFilter === 'All Companies' || job.company === companyFilter;

      return matchesSearch && matchesStatus && matchesType && matchesCompany;
    });
  }, [jobs, search, statusFilter, typeFilter, companyFilter]);

  const openAdd = () => {
    setEditingId(null);
    setDraft({ title: '', company: '', type: 'Full Time', location: '', salary: '', description: '', requirements: '', deadline: '', status: 'Active' });
    setShowModal(true);
  };

  const openEdit = (job) => {
    setEditingId(job.id);
    setDraft({ ...job, deadline: job.postedDate });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!draft.title.trim() || !draft.company.trim()) return;

    const payload = {
      id: editingId ?? Date.now(),
      title: draft.title.trim(),
      company: draft.company.trim(),
      type: draft.type,
      location: draft.location.trim() || 'Chennai',
      applications: editingId ? jobs.find((j) => j.id === editingId)?.applications ?? 0 : 0,
      status: draft.status,
      postedDate: draft.deadline || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    if (editingId) {
      setJobs((current) => current.map((job) => job.id === editingId ? payload : job));
    } else {
      setJobs((current) => [payload, ...current]);
    }

    setShowModal(false);
  };

  const deleteJob = (id) => {
    if (window.confirm('Delete this job?')) {
      setJobs((current) => current.filter((job) => job.id !== id));
    }
  };

  const exportCsv = () => {
    const header = 'Job Title,Company,Type,Location,Applications,Status,Posted Date';
    const rows = filteredJobs.map((job) => `${job.title},${job.company},${job.type},${job.location},${job.applications},${job.status},${job.postedDate}`);
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'career-jobs.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 text-slate-900">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-[28px] font-extrabold tracking-tight">Career Management</h2>
          <p className="text-sm text-slate-500 mt-1">Manage jobs, applications, interviews and placements.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Jobs', value: '128', change: '+12%', icon: Briefcase },
          { label: 'Active Jobs', value: '64', change: '+8%', icon: TrendingUp },
          { label: 'Applications', value: '2,450', change: '+18%', icon: Users },
          { label: 'Placed Students', value: '386', change: '+6%', icon: GraduationCap },
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
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-sm min-w-[180px]">
              <Search className="h-4 w-4 text-slate-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search jobs..." className="w-full bg-transparent outline-none text-sm" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white">
              <option>All Status</option>
              <option>Active</option>
              <option>Closed</option>
            </select>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white">
              <option>All Job Types</option>
              <option>Full Time</option>
              <option>Internship</option>
            </select>
            <select value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white">
              <option>All Companies</option>
              <option>TCS</option>
              <option>Zoho</option>
              <option>Infosys</option>
              <option>Wipro</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => {
              setStatusFilter('All Status');
              setTypeFilter('All Job Types');
              setCompanyFilter('All Companies');
              setSearch('');
            }} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button type="button" onClick={exportCsv} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50">
              <Download className="w-4 h-4" /> Export
            </button>
            <button type="button" onClick={openAdd} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/50 transition-shadow">
              <Plus className="w-4 h-4" /> Add Job
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[720px]">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-slate-400 font-bold">
                <th className="pb-3 px-2">Job Title</th>
                <th className="pb-3 px-2">Company</th>
                <th className="pb-3 px-2">Type</th>
                <th className="pb-3 px-2">Location</th>
                <th className="pb-3 px-2">Applications</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 px-2">Posted Date</th>
                <th className="pb-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job.id} className="border-t border-slate-100">
                  <td className="py-3 px-2 font-bold text-sm text-slate-900">{job.title}</td>
                  <td className="py-3 px-2 text-sm text-slate-600">{job.company}</td>
                  <td className="py-3 px-2 text-sm text-slate-600">{job.type}</td>
                  <td className="py-3 px-2 text-sm text-slate-600">{job.location}</td>
                  <td className="py-3 px-2 text-sm font-semibold">{job.applications}</td>
                  <td className="py-3 px-2"><span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-wide ${job.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>{job.status}</span></td>
                  <td className="py-3 px-2 text-sm text-slate-500">{job.postedDate}</td>
                  <td className="py-3 px-2 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={() => setViewRecord(job)} className="text-slate-500 hover:text-purple-650" aria-label="View"><Eye className="w-4 h-4" /></button>
                      <button type="button" onClick={() => openEdit(job)} className="text-slate-500 hover:text-purple-650" aria-label="Edit"><Pencil className="w-4 h-4" /></button>
                      <button type="button" onClick={() => deleteJob(job.id)} className="text-slate-500 hover:text-red-500" aria-label="Delete"><Trash2 className="w-4 h-4" /></button>
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
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">{editingId ? 'Edit Job' : 'Add Job'}</h3>
              </div>
              <button type="button" onClick={() => setShowModal(false)} className="rounded-xl p-2 hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="text-sm font-semibold text-slate-700"><span className="block mb-1">Job Title</span><input required value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2" /></label>
                <label className="text-sm font-semibold text-slate-700"><span className="block mb-1">Company</span><input required value={draft.company} onChange={(e) => setDraft({ ...draft, company: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2" /></label>
                <label className="text-sm font-semibold text-slate-700"><span className="block mb-1">Job Type</span><select value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2"><option>Full Time</option><option>Internship</option><option>Contract</option></select></label>
                <label className="text-sm font-semibold text-slate-700"><span className="block mb-1">Location</span><input value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2" /></label>
                <label className="text-sm font-semibold text-slate-700"><span className="block mb-1">Salary</span><input value={draft.salary} onChange={(e) => setDraft({ ...draft, salary: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2" /></label>
                <label className="text-sm font-semibold text-slate-700"><span className="block mb-1">Application Deadline</span><input type="date" value={draft.deadline} onChange={(e) => setDraft({ ...draft, deadline: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2" /></label>
              </div>
              <label className="text-sm font-semibold text-slate-700 block"><span className="block mb-1">Description</span><textarea rows="3" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2" /></label>
              <label className="text-sm font-semibold text-slate-700 block"><span className="block mb-1">Requirements</span><textarea rows="3" value={draft.requirements} onChange={(e) => setDraft({ ...draft, requirements: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2" /></label>
              <label className="text-sm font-semibold text-slate-700 block"><span className="block mb-1">Status</span><select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2"><option>Active</option><option>Closed</option></select></label>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600">Cancel</button>
                <button type="submit" className="rounded-xl bg-purple-650 px-4 py-2 text-sm font-bold text-white">Save Job</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewRecord && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 px-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl w-full max-w-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-extrabold">Job Details</h3>
              <button type="button" onClick={() => setViewRecord(null)} className="rounded-xl p-2 hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2 text-sm">
              <div><span className="font-bold">Title:</span> {viewRecord.title}</div>
              <div><span className="font-bold">Company:</span> {viewRecord.company}</div>
              <div><span className="font-bold">Type:</span> {viewRecord.type}</div>
              <div><span className="font-bold">Location:</span> {viewRecord.location}</div>
              <div><span className="font-bold">Applications:</span> {viewRecord.applications}</div>
              <div><span className="font-bold">Status:</span> {viewRecord.status}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCareer;