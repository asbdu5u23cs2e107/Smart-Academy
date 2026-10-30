import React, { useMemo, useState } from 'react';
import { Search, Download, Filter, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, ClipboardCheck, CreditCard, Calendar, UserCheck } from 'lucide-react';

const enrollmentSeed = [
  { student: 'Sarah Jenkins', course: 'React JS Mastery', enrollmentDate: 'Aug 10, 2026', progress: '82%', amount: '₹3,499', status: 'Active' },
  { student: 'Elena Rodriguez', course: 'Java Full Stack', enrollmentDate: 'Aug 09, 2026', progress: '70%', amount: '₹4,200', status: 'Active' },
  { student: 'Jamal Peterson', course: 'UI/UX Design', enrollmentDate: 'Aug 04, 2026', progress: '56%', amount: '₹2,499', status: 'Pending' },
  { student: 'Avery Johnson', course: 'Data Science 101', enrollmentDate: 'Jul 30, 2026', progress: '35%', amount: '₹3,999', status: 'Completed' },
];

const Enrollments = () => {
  const [rows] = useState(enrollmentSeed);
  const [searchTerm, setSearchTerm] = useState('');
  const [course, setCourse] = useState('All Courses');
  const [status, setStatus] = useState('All Status');
  const [date, setDate] = useState('All Dates');

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const haystack = `${row.student} ${row.course}`.toLowerCase();
      const matchesSearch = haystack.includes(searchTerm.toLowerCase());
      const matchesCourse = course === 'All Courses' || row.course === course;
      const matchesStatus = status === 'All Status' || row.status === status;
      const matchesDate = date === 'All Dates' || row.enrollmentDate.includes(date);
      return matchesSearch && matchesCourse && matchesStatus && matchesDate;
    });
  }, [rows, searchTerm, course, status, date]);

  const stats = [
    { label: 'Total Enrollments', value: '15,820', change: '+12%', icon: ClipboardCheck },
    { label: 'Active Enrollments', value: '12,150', change: '+9%', icon: UserCheck },
    { label: 'Completed', value: '2,980', change: '+3%', icon: Calendar },
    { label: 'Pending', value: '690', change: '-1%', icon: CreditCard },
  ];

  return (
    <div className="text-slate-900">
      <div className="space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-[28px] font-extrabold tracking-tight">Enrollment Management</h2>
            <p className="text-sm text-slate-500 mt-1">Track student enrollments, progress, payments, and status.</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/50 transition-shadow">
              <ClipboardCheck className="w-4 h-4" /> + Add Enrollment
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-bold text-slate-600 hover:bg-slate-50">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
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
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-purple-100 min-w-[230px]" placeholder="Search student or course" />
              </div>
              <select value={course} onChange={(e) => setCourse(e.target.value)} className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600">
                <option value="All Courses">All Courses</option>
                <option value="React JS Mastery">React JS Mastery</option>
                <option value="Java Full Stack">Java Full Stack</option>
                <option value="UI/UX Design">UI/UX Design</option>
              </select>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600">
                <option value="All Status">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
              <select value={date} onChange={(e) => setDate(e.target.value)} className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600">
                <option value="All Dates">All Dates</option>
                <option value="Aug">Aug</option>
                <option value="Jul">Jul</option>
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
                  <th className="pb-3 px-2">Student</th>
                  <th className="pb-3 px-2">Course</th>
                  <th className="pb-3 px-2">Enrollment Date</th>
                  <th className="pb-3 px-2">Progress</th>
                  <th className="pb-3 px-2">Amount</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr key={`${row.student}-${index}`} className="border-t border-slate-100">
                    <td className="py-4 px-2 text-[13px] font-extrabold text-slate-900">{row.student}</td>
                    <td className="py-4 px-2 text-[13px] font-bold text-slate-600">{row.course}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.enrollmentDate}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.progress}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.amount}</td>
                    <td className="py-4 px-2">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${row.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : row.status === 'Completed' ? 'bg-sky-50 text-sky-600' : 'bg-amber-50 text-amber-600'}`}>{row.status}</span>
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
            <div className="text-[12px] font-semibold text-slate-500">Showing 1 to {Math.min(filteredRows.length, 4)} of 15,820 entries</div>
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

const TrendingUpIcon = () => (
  <span className="inline-flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-[11px] h-[11px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  </span>
);

export default Enrollments;
