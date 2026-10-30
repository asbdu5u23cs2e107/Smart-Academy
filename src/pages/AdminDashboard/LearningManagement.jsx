import React, { useMemo, useState } from 'react';
import { Search, Download, Filter, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, BookOpen, GraduationCap, UserCheck, Award } from 'lucide-react';

const courseSeed = [
  { course: 'React JS Mastery', instructor: 'Arun Kumar', category: 'Development', students: 2450, progress: 78, status: 'Active' },
  { course: 'Java Full Stack', instructor: 'Priya Sharma', category: 'Development', students: 1850, progress: 65, status: 'Active' },
  { course: 'UI/UX Design', instructor: 'Marcus Webb', category: 'Design', students: 1240, progress: 82, status: 'Active' },
  { course: 'Data Science 101', instructor: 'Vikram Kumar', category: 'Data Science', students: 980, progress: 45, status: 'Draft' },
];

const LearningManagement = () => {
  const [courses] = useState(courseSeed);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const filteredRows = useMemo(() => {
    return courses.filter((row) => {
      const haystack = `${row.course} ${row.instructor} ${row.category}`.toLowerCase();
      const matchesSearch = haystack.includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All Categories' || row.category === categoryFilter;
      const matchesStatus = statusFilter === 'All Status' || row.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [courses, searchTerm, categoryFilter, statusFilter]);

  const stats = [
    { label: 'Total Courses', value: '48', change: '+8%', icon: BookOpen },
    { label: 'Active Courses', value: '36', change: '+12%', icon: UserCheck },
    { label: 'Total Enrollments', value: '15,820', change: '+14%', icon: GraduationCap },
    { label: 'Certificates Issued', value: '8,450', change: '+7%', icon: Award },
  ];

  return (
    <div className="text-slate-900">
      <div className="space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-[28px] font-extrabold tracking-tight">Learning Management</h2>
            <p className="text-sm text-slate-500 mt-1">Manage courses, enrollments, live classes, and certificates.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/50 transition-shadow">
            <BookOpen className="w-4 h-4" /> + Add Course
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const StatIcon = stat.icon;
            return (
              <div key={stat.label} className="bg-white border border-slate-100 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-[38px] h-[38px] rounded-xl bg-purple-100 flex items-center justify-center">
                    <StatIcon className="w-[19px] h-[19px] text-purple-650" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
                    <TrendingUpIcon /> {stat.change}
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
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-purple-100 min-w-[230px]" placeholder="Search courses" />
              </div>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600">
                <option value="All Categories">All Categories</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Data Science">Data Science</option>
              </select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600">
                <option value="All Status">All Status</option>
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-2">
              <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50">
                <Download className="w-4 h-4" /> Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-slate-400 font-bold border-b border-slate-100">
                  <th className="pb-3 px-2">Course</th>
                  <th className="pb-3 px-2">Instructor</th>
                  <th className="pb-3 px-2">Category</th>
                  <th className="pb-3 px-2">Students</th>
                  <th className="pb-3 px-2">Progress</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr key={`${row.course}-${index}`} className="border-t border-slate-100">
                    <td className="py-4 px-2 text-[13px] font-extrabold text-slate-900">{row.course}</td>
                    <td className="py-4 px-2 text-[13px] font-bold text-slate-600">{row.instructor}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.category}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.students.toLocaleString('en-IN')}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.progress}%</td>
                    <td className="py-4 px-2">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${row.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{row.status}</span>
                    </td>
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
            <div className="text-[12px] font-semibold text-slate-500">Showing 1 to {Math.min(filteredRows.length, 4)} of 48 courses</div>
            <div className="flex items-center gap-2">
              <button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"><span className="inline-flex items-center gap-1"><ChevronLeft className="w-4 h-4" /> Previous</span></button>
              <button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold bg-purple-650 text-white">1</button>
              <button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold border border-slate-200 bg-white text-slate-600">2</button>
              <button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold border border-slate-200 bg-white text-slate-600">3</button>
              <button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold border border-slate-200 bg-white text-slate-600">...</button>
              <button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"><span className="inline-flex items-center gap-1">Next <ChevronRight className="w-4 h-4" /></span></button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const TrendingUpIcon = () => (
  <span className="inline-flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-[11px] h-[11px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  </span>
);

export default LearningManagement;
