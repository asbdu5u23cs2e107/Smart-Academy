import React, { useMemo, useState } from 'react';
import { Search, Download, Eye, Check, X, MessageSquare, FileCheck, ChevronLeft, ChevronRight } from 'lucide-react';

const reviewSeed = [
  { id: 'REV-4021', project: 'E-Commerce Website', reviewer: 'Dr. Marcus Webb', score: '92%', decision: 'Approved', status: 'Completed', reviewedDate: 'Aug 12, 2026' },
  { id: 'REV-4020', project: 'Online Learning Platform', reviewer: 'Rohan Kulkarni', score: '78%', decision: 'Revision Needed', status: 'In Progress', reviewedDate: 'Aug 09, 2026' },
  { id: 'REV-4019', project: 'Chat Application', reviewer: 'Priya Sharma', score: '66%', decision: 'Rejected', status: 'Completed', reviewedDate: 'Aug 08, 2026' },
  { id: 'REV-4018', project: 'Expense Tracker', reviewer: 'Aditi Nair', score: '88%', decision: 'Approved', status: 'Completed', reviewedDate: 'Aug 07, 2026' },
  { id: 'REV-4017', project: 'Student Management System', reviewer: 'Dr. Marcus Webb', score: '91%', decision: 'Approved', status: 'Completed', reviewedDate: 'Aug 06, 2026' },
];

const ProjectReviews = () => {
  const [reviews] = useState(reviewSeed);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRows = useMemo(() => {
    return reviews.filter((row) => `${row.project} ${row.reviewer} ${row.decision}`.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [reviews, searchTerm]);

  const styleMap = {
    Approved: 'bg-emerald-50 text-emerald-600',
    'Revision Needed': 'bg-amber-50 text-amber-600',
    Rejected: 'bg-rose-50 text-rose-600',
  };

  return (
    <div className="text-slate-900">
      <div className="space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-[28px] font-extrabold tracking-tight">Project Reviews</h2>
            <p className="text-sm text-slate-500 mt-1">Monitor reviewer decisions and scoring outcome.</p>
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
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-purple-100 min-w-[230px]" placeholder="Search reviews" />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50"><MessageSquare className="w-4 h-4" /> All Reviews</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-slate-400 font-bold border-b border-slate-100">
                  <th className="pb-3 px-2">Review ID</th>
                  <th className="pb-3 px-2">Project</th>
                  <th className="pb-3 px-2">Reviewer</th>
                  <th className="pb-3 px-2">Score</th>
                  <th className="pb-3 px-2">Decision</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2">Reviewed Date</th>
                  <th className="pb-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr key={`${row.id}-${index}`} className="border-t border-slate-100">
                    <td className="py-4 px-2 text-[13px] font-extrabold text-slate-900">{row.id}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-700">{row.project}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.reviewer}</td>
                    <td className="py-4 px-2 text-[13px] font-bold text-slate-700">{row.score}</td>
                    <td className="py-4 px-2"><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${styleMap[row.decision]}`}>{row.decision}</span></td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.status}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.reviewedDate}</td>
                    <td className="py-4 px-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-650 transition"><Eye className="w-4 h-4" /></button>
                        <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 transition"><Check className="w-4 h-4" /></button>
                        <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition"><X className="w-4 h-4" /></button>
                        <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-sky-50 hover:text-sky-600 transition"><FileCheck className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-5">
            <div className="text-[12px] font-semibold text-slate-500">Showing 1 to {Math.min(filteredRows.length, 4)} of {filteredRows.length} reviews</div>
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

export default ProjectReviews;
