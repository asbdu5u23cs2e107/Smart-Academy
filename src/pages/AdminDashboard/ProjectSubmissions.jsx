import React, { useMemo, useState } from 'react';
import { Search, Download, Eye, CheckCircle, XCircle, Clock, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const submissionSeed = [
  { id: 'PRJ-1024', project: 'E-Commerce Website', student: 'Sarah Jenkins', submittedAt: 'Aug 12, 2026', reviewer: 'Dr. Marcus Webb', status: 'Under Review' },
  { id: 'PRJ-1023', project: 'Student Management System', student: 'Elena Rodriguez', submittedAt: 'Aug 10, 2026', reviewer: 'Aditi Nair', status: 'Accepted' },
  { id: 'PRJ-1022', project: 'Online Learning Platform', student: 'Jamal Peterson', submittedAt: 'Aug 09, 2026', reviewer: 'Rohan Kulkarni', status: 'Submitted' },
  { id: 'PRJ-1021', project: 'Expense Tracker', student: 'Karthik Raman', submittedAt: 'Aug 08, 2026', reviewer: 'Priya Sharma', status: 'Needs Revision' },
  { id: 'PRJ-1020', project: 'Chat Application', student: 'Nadia Smith', submittedAt: 'Aug 04, 2026', reviewer: 'Dr. Marcus Webb', status: 'Rejected' },
];

const ProjectSubmissions = () => {
  const [submissions] = useState(submissionSeed);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRows = useMemo(() => {
    return submissions.filter((row) => `${row.project} ${row.student} ${row.reviewer}`.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [submissions, searchTerm]);

  const getStatusStyles = (status) => {
    if (status === 'Accepted') return 'bg-emerald-50 text-emerald-600';
    if (status === 'Rejected') return 'bg-rose-50 text-rose-600';
    if (status === 'Needs Revision') return 'bg-amber-50 text-amber-600';
    if (status === 'Under Review') return 'bg-sky-50 text-sky-600';
    return 'bg-slate-50 text-slate-600';
  };

  return (
    <div className="text-slate-900">
      <div className="space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-[28px] font-extrabold tracking-tight">Project Submissions</h2>
            <p className="text-sm text-slate-500 mt-1">Review and track project delivery submissions.</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-bold text-slate-600 hover:bg-slate-50"><Download className="w-4 h-4" /> Export</button>
          </div>
        </div>

        <section className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-purple-100 min-w-[230px]" placeholder="Search submissions" />
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50"><Filter className="w-4 h-4" /> All Status</button>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50"><Clock className="w-4 h-4" /> Today</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-slate-400 font-bold border-b border-slate-100">
                  <th className="pb-3 px-2">Submission ID</th>
                  <th className="pb-3 px-2">Project</th>
                  <th className="pb-3 px-2">Student</th>
                  <th className="pb-3 px-2">Submitted Date</th>
                  <th className="pb-3 px-2">Reviewer</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr key={`${row.id}-${index}`} className="border-t border-slate-100">
                    <td className="py-4 px-2 text-[13px] font-extrabold text-slate-900">{row.id}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-700">{row.project}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.student}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.submittedAt}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.reviewer}</td>
                    <td className="py-4 px-2"><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${getStatusStyles(row.status)}`}>{row.status}</span></td>
                    <td className="py-4 px-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-650 transition"><Eye className="w-4 h-4" /></button>
                        <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 transition"><CheckCircle className="w-4 h-4" /></button>
                        <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition"><XCircle className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-5">
            <div className="text-[12px] font-semibold text-slate-500">Showing 1 to {Math.min(filteredRows.length, 4)} of {filteredRows.length} submissions</div>
            <div className="flex items-center gap-2">
              <button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"><span className="inline-flex items-center gap-1"><ChevronLeft className="w-4 h-4" /> Previous</span></button>
              <button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold bg-purple-650 text-white">1</button>
              <button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold border border-slate-200 bg-white text-slate-600">2</button>
              <button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"><span className="inline-flex items-center gap-1">Next <ChevronRight className="w-4 h-4" /></span></button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectSubmissions;
