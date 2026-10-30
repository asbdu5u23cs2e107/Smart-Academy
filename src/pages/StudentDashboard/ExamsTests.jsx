import React from 'react';
import { Link } from 'react-router-dom';
import { FileCheck, ArrowRight, Trophy, Clock, CheckCircle2, XCircle, PlayCircle, BarChart2 } from 'lucide-react';

const exams = [
  {
    id: 'html-css-aptitude',
    title: 'HTML & CSS Aptitude Test',
    subject: 'HTML & CSS',
    status: 'Passed',
    score: 85,
    maxScore: 100,
    duration: '30 mins',
    date: '15 Jul 2026',
    questions: 25,
    passmark: 70,
  },
  {
    id: 'js-logic-quiz',
    title: 'JavaScript Logic Quiz',
    subject: 'JavaScript',
    status: 'Passed',
    score: 78,
    maxScore: 100,
    duration: '45 mins',
    date: '20 Jul 2026',
    questions: 30,
    passmark: 70,
  },
  {
    id: 'react-hooks',
    title: 'React Hooks Assessment',
    subject: 'React',
    status: 'Not Started',
    score: null,
    maxScore: 100,
    duration: '30 mins',
    date: null,
    questions: 20,
    passmark: 70,
  },
  {
    id: 'node-api',
    title: 'Node.js REST API Quiz',
    subject: 'Node.js',
    status: 'Upcoming',
    score: null,
    maxScore: 100,
    duration: '40 mins',
    date: null,
    questions: 25,
    passmark: 70,
    scheduledDate: '05 Aug 2026',
  },
];

const statusConfig = {
  Passed:       { color: 'bg-emerald-50 text-emerald-600 border-emerald-200', icon: CheckCircle2 },
  Failed:       { color: 'bg-rose-50 text-rose-500 border-rose-200',         icon: XCircle },
  'Not Started':{ color: 'bg-amber-50 text-amber-600 border-amber-200',      icon: Clock },
  Upcoming:     { color: 'bg-slate-50 text-slate-500 border-slate-200',      icon: Clock },
};

const ExamsTests = () => {
  const passed = exams.filter(e => e.status === 'Passed').length;
  const avgScore = Math.round(
    exams.filter(e => e.score !== null).reduce((s, e) => s + e.score, 0) /
    (exams.filter(e => e.score !== null).length || 1)
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <span className="text-xs text-purple-650 font-bold uppercase tracking-widest">Student Dashboard</span>
          <h1 className="text-xl font-extrabold text-slate-900 uppercase mt-0.5 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-500" /> Exams & Tests
          </h1>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Exams',  value: exams.length,  icon: FileCheck, color: 'text-slate-600' },
          { label: 'Passed',       value: passed,         icon: Trophy,    color: 'text-emerald-500' },
          { label: 'Avg. Score',   value: `${avgScore}%`, icon: BarChart2, color: 'text-purple-650' },
          { label: 'Upcoming',     value: exams.filter(e => e.status === 'Upcoming').length, icon: Clock, color: 'text-amber-500' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="p-4 rounded-2xl bg-white/60 border border-slate-100 text-center space-y-1">
            <Icon className={`w-5 h-5 mx-auto ${color}`} />
            <div className={`text-xl font-extrabold ${color}`}>{value}</div>
            <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</div>
          </div>
        ))}
      </div>

      {/* Exam Cards */}
      <div className="space-y-4">
        {exams.map(exam => {
          const cfg = statusConfig[exam.status];
          const StatusIcon = cfg.icon;
          return (
            <div
              key={exam.id}
              className="rounded-2xl bg-white/60 border border-slate-100 overflow-hidden hover:shadow-sm transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5">
                {/* Info */}
                <div className="flex-grow space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{exam.title}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[9px] font-bold uppercase border border-slate-200">
                      {exam.subject}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> {exam.duration}</span>
                    <span>{exam.questions} questions</span>
                    <span>Pass mark: {exam.passmark}%</span>
                    {exam.date && <span>Taken: {exam.date}</span>}
                    {exam.scheduledDate && <span className="text-amber-500 font-semibold">Scheduled: {exam.scheduledDate}</span>}
                  </div>

                  {/* Score Bar */}
                  {exam.score !== null && (
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center gap-2 text-[10px]">
                        <div className="flex-grow h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${exam.score >= exam.passmark ? 'bg-emerald-400' : 'bg-rose-400'}`}
                            style={{ width: `${exam.score}%` }}
                          />
                        </div>
                        <span className={`font-bold ${exam.score >= exam.passmark ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {exam.score}/{exam.maxScore}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Status + Action */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase ${cfg.color}`}>
                    <StatusIcon className="w-3 h-3" /> {exam.status}
                  </span>
                  {exam.status === 'Not Started' && (
                    <Link
                      to={`/assessment/${exam.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-bold uppercase tracking-wide rounded-xl transition-all"
                    >
                      <PlayCircle className="w-3.5 h-3.5" /> Take Exam
                    </Link>
                  )}
                  {exam.status === 'Passed' && (
                    <Link
                      to={`/assessment/${exam.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 text-[10px] font-bold uppercase tracking-wide rounded-xl transition-all"
                    >
                      <ArrowRight className="w-3 h-3" /> Review
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ExamsTests;
