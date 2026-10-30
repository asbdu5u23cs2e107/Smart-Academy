import React from 'react';
import { CheckCircle, ArrowDown } from 'lucide-react';

const placementSteps = [
  {
    label: 'Resume Building',
    desc: 'Craft an ATS-friendly developer resume with mentor review feedback',
    color: 'text-purple-650',
    bg: 'bg-purple-50',
    border: 'border-purple-200'
  },
  {
    label: 'LinkedIn Optimization',
    desc: 'Build a compelling LinkedIn profile that attracts recruiters organically',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200'
  },
  {
    label: 'Portfolio Building',
    desc: 'Showcase capstone projects with proper documentation and live demos',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-200'
  },
  {
    label: 'Technical Training',
    desc: 'Deep-dive sessions on data structures, algorithms, and system design',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200'
  },
  {
    label: 'Mock Interviews',
    desc: 'Practice with real-time proctored technical and HR interview simulations',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200'
  },
  {
    label: 'HR Preparation',
    desc: 'Behavioral questions, salary negotiation, and communication coaching',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    border: 'border-pink-200'
  },
  {
    label: 'Interview Scheduling',
    desc: 'Coordinate with hiring partners and schedule campus and off-campus drives',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-200'
  },
  {
    label: 'Job Referrals',
    desc: 'Direct referral logs to 100+ active hiring partners in tech companies',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200'
  },
  {
    label: 'Placement Support',
    desc: 'Continued assistance even after offer letter until you join successfully',
    color: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200'
  }
];

const CoursePlacement = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-xl font-bold text-slate-900">Placement Assistance</h2>
        <p className="text-xs text-slate-500 mt-0.5">Your end-to-end career transformation roadmap post course completion.</p>
      </div>

      <div className="relative">
        {/* Vertical connecting line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-sky-200 to-emerald-200 rounded-full" />

        <div className="space-y-4">
          {placementSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-4 group">
              {/* Step Circle Indicator */}
              <div className="relative z-10 flex-shrink-0">
                <div className={`w-10 h-10 rounded-full ${step.bg} border-2 ${step.border} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <CheckCircle className={`w-5 h-5 ${step.color}`} />
                </div>
              </div>

              {/* Content Card */}
              <div className={`flex-grow p-4 rounded-2xl bg-white border ${step.border} shadow-sm hover:shadow-md transition-all duration-300`}>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className={`text-sm font-bold ${step.color}`}>{step.label}</h3>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                    Step {idx + 1}
                  </span>
                </div>
                <p className="text-xs text-slate-550 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePlacement;
