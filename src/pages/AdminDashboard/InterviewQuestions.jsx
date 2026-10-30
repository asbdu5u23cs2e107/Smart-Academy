import React, { useMemo, useState } from 'react';
import { Search, Download, Filter, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, Plus, HelpCircle, TrendingUp } from 'lucide-react';

const questionSeed = [
  { question: 'What is React state?', category: 'React', difficulty: 'Easy', technology: 'React', status: 'Published', createdDate: 'Aug 12, 2026' },
  { question: 'Explain inner join in SQL.', category: 'Database', difficulty: 'Medium', technology: 'SQL', status: 'Published', createdDate: 'Aug 10, 2026' },
  { question: 'How does dependency injection work in Spring Boot?', category: 'Backend', difficulty: 'Hard', technology: 'Java', status: 'Draft', createdDate: 'Aug 08, 2026' },
  { question: 'What are closures in JavaScript?', category: 'JavaScript', difficulty: 'Medium', technology: 'JavaScript', status: 'Published', createdDate: 'Aug 05, 2026' },
  { question: 'What is normalization in DBMS?', category: 'Database', difficulty: 'Hard', technology: 'SQL', status: 'Published', createdDate: 'Aug 03, 2026' },
];

const InterviewQuestions = () => {
  const [questions] = useState(questionSeed);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [difficultyFilter, setDifficultyFilter] = useState('All Difficulty');
  const [technologyFilter, setTechnologyFilter] = useState('All Technology');

  const filteredRows = useMemo(() => questions.filter((row) => {
    const haystack = `${row.question} ${row.category} ${row.technology}`.toLowerCase();
    return haystack.includes(searchTerm.toLowerCase()) && (categoryFilter === 'All Categories' || row.category === categoryFilter) && (difficultyFilter === 'All Difficulty' || row.difficulty === difficultyFilter) && (technologyFilter === 'All Technology' || row.technology === technologyFilter);
  }), [questions, searchTerm, categoryFilter, difficultyFilter, technologyFilter]);

  return (
    <div className="text-slate-900">
      <div className="space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-[28px] font-extrabold tracking-tight">Interview Questions</h2>
            <p className="text-sm text-slate-500 mt-1">Organize and maintain interview preparation questions.</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/50 transition-shadow"><Plus className="w-4 h-4" /> Add Question</button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-bold text-slate-600 hover:bg-slate-50"><Download className="w-4 h-4" /> Export</button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Total Questions', value: '128', icon: HelpCircle },
            { label: 'Java Questions', value: '24', icon: HelpCircle },
            { label: 'SQL Questions', value: '18', icon: HelpCircle },
            { label: 'HR Questions', value: '12', icon: HelpCircle },
            { label: 'Technical Questions', value: '74', icon: TrendingUp },
          ].map((stat) => {
            const Icon = stat.icon;
            return <div key={stat.label} className="bg-white border border-slate-100 rounded-2xl p-4"><div className="flex items-center justify-between mb-5"><div className="w-[38px] h-[38px] rounded-xl bg-purple-100 flex items-center justify-center"><Icon className="w-[19px] h-[19px] text-purple-650" /></div><div className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">+4</div></div><div className="text-[13px] text-slate-500 font-semibold mb-1">{stat.label}</div><div className="text-2xl font-extrabold tracking-tight">{stat.value}</div></div>;
          })}
        </div>
        <section className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex flex-wrap gap-3">
              <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-purple-100 min-w-[230px]" placeholder="Search question" /></div>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600"><option>All Categories</option><option>React</option><option>Database</option><option>Backend</option><option>JavaScript</option></select>
              <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)} className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600"><option>All Difficulty</option><option>Easy</option><option>Medium</option><option>Hard</option></select>
              <select value={technologyFilter} onChange={(e) => setTechnologyFilter(e.target.value)} className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600"><option>All Technology</option><option>React</option><option>SQL</option><option>Java</option><option>JavaScript</option></select>
            </div>
            <div className="flex gap-2"><button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50"><Filter className="w-4 h-4" /> Filter</button><button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50"><Download className="w-4 h-4" /> Export</button></div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left"><thead><tr className="text-[11px] uppercase tracking-wide text-slate-400 font-bold border-b border-slate-100"><th className="pb-3 px-2">Question</th><th className="pb-3 px-2">Category</th><th className="pb-3 px-2">Difficulty</th><th className="pb-3 px-2">Technology</th><th className="pb-3 px-2">Status</th><th className="pb-3 px-2">Created Date</th><th className="pb-3 px-2 text-right">Actions</th></tr></thead><tbody>{filteredRows.map((row, index) => <tr key={`${row.question}-${index}`} className="border-t border-slate-100"><td className="py-4 px-2 text-[13px] font-extrabold text-slate-900">{row.question}</td><td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.category}</td><td className="py-4 px-2"><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${row.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600' : row.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'}`}>{row.difficulty}</span></td><td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.technology}</td><td className="py-4 px-2"><span className="inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold bg-emerald-50 text-emerald-600">{row.status}</span></td><td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{row.createdDate}</td><td className="py-4 px-2 text-right"><div className="flex items-center justify-end gap-2"><button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-650 transition"><Eye className="w-4 h-4" /></button><button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-650 transition"><Pencil className="w-4 h-4" /></button><button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition"><Trash2 className="w-4 h-4" /></button></div></td></tr>)}</tbody></table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-5"><div className="text-[12px] font-semibold text-slate-500">Showing 1 to {Math.min(filteredRows.length, 4)} of {filteredRows.length} questions</div><div className="flex items-center gap-2"><button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"><span className="inline-flex items-center gap-1"><ChevronLeft className="w-4 h-4" /> Previous</span></button><button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold bg-purple-650 text-white">1</button><button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold border border-slate-200 bg-white text-slate-600">2</button><button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"><span className="inline-flex items-center gap-1">Next <ChevronRight className="w-4 h-4" /></span></button></div></div>
        </section>
      </div>
    </div>
  );
};

export default InterviewQuestions;
