import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const AddProject = () => {
  const [form, setForm] = useState({
    projectName: '',
    student: '',
    category: 'Web Development',
    description: '',
    technologyStack: '',
    startDate: '',
    dueDate: '',
    status: 'Active',
    githubUrl: '',
    liveDemoUrl: '',
  });
  const [notice, setNotice] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setNotice('Project created successfully.');
  };

  return (
    <div className="text-slate-900">
      <div className="space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-[28px] font-extrabold tracking-tight">Add New Project</h2>
            <p className="text-sm text-slate-500 mt-1">Create and schedule a new student project.</p>
          </div>
        </div>

        <section className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">
          {notice && (
            <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
              {notice}
            </div>
          )}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[12px] font-bold uppercase tracking-wide text-slate-500 mb-2">Project Name</label>
              <input name="projectName" value={form.projectName} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-100" required />
            </div>
            <div>
              <label className="block text-[12px] font-bold uppercase tracking-wide text-slate-500 mb-2">Student</label>
              <input name="student" value={form.student} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-100" required />
            </div>
            <div>
              <label className="block text-[12px] font-bold uppercase tracking-wide text-slate-500 mb-2">Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-100">
                <option>Web Development</option>
                <option>Mobile Development</option>
                <option>Java</option>
                <option>Python</option>
                <option>React</option>
                <option>Full Stack</option>
                <option>Data Science</option>
                <option>AI & ML</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-bold uppercase tracking-wide text-slate-500 mb-2">Project Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-100">
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-[12px] font-bold uppercase tracking-wide text-slate-500 mb-2">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-100" rows="4" required />
            </div>
            <div>
              <label className="block text-[12px] font-bold uppercase tracking-wide text-slate-500 mb-2">Technology Stack</label>
              <input name="technologyStack" value={form.technologyStack} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-100" />
            </div>
            <div>
              <label className="block text-[12px] font-bold uppercase tracking-wide text-slate-500 mb-2">GitHub URL</label>
              <input name="githubUrl" value={form.githubUrl} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-100" />
            </div>
            <div>
              <label className="block text-[12px] font-bold uppercase tracking-wide text-slate-500 mb-2">Start Date</label>
              <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-100" />
            </div>
            <div>
              <label className="block text-[12px] font-bold uppercase tracking-wide text-slate-500 mb-2">Due Date</label>
              <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-100" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[12px] font-bold uppercase tracking-wide text-slate-500 mb-2">Live Demo URL</label>
              <input name="liveDemoUrl" value={form.liveDemoUrl} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-100" />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3">
              <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-bold text-slate-600 hover:bg-slate-50">
                <X className="w-4 h-4" /> Cancel
              </button>
              <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/50 transition-shadow">
                <Plus className="w-4 h-4" /> Create Project
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AddProject;
