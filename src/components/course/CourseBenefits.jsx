import React from 'react';
import {
  Infinity, Film, FolderOpen, ClipboardList, BookOpen,
  MessageSquareText, Award, Users, Dumbbell
} from 'lucide-react';

const benefitsList = [
  {
    title: 'Lifetime Access',
    desc: 'No expiry on course content, materials, or portal access after enrollment',
    icon: <Infinity className="w-5 h-5 text-purple-650" />,
    bg: 'bg-purple-50',
    border: 'border-purple-100'
  },
  {
    title: 'Recorded Videos',
    desc: 'Every live class uploaded within 24 hours for lifetime re-watch access',
    icon: <Film className="w-5 h-5 text-sky-500" />,
    bg: 'bg-sky-50',
    border: 'border-sky-100'
  },
  {
    title: 'Source Code',
    desc: 'Full GitHub repositories and boilerplates for every project you build',
    icon: <FolderOpen className="w-5 h-5 text-amber-500" />,
    bg: 'bg-amber-50',
    border: 'border-amber-100'
  },
  {
    title: 'Assignments',
    desc: 'Daily task challenges and weekly mini-projects to reinforce learning',
    icon: <ClipboardList className="w-5 h-5 text-rose-500" />,
    bg: 'bg-rose-50',
    border: 'border-rose-100'
  },
  {
    title: 'Study Notes',
    desc: 'Downloadable cheatsheets, concept maps and quick reference guides',
    icon: <BookOpen className="w-5 h-5 text-indigo-500" />,
    bg: 'bg-indigo-50',
    border: 'border-indigo-100'
  },
  {
    title: 'Interview Questions',
    desc: 'Curated 200+ Q&A bank covering technical and behavioral interview rounds',
    icon: <MessageSquareText className="w-5 h-5 text-orange-500" />,
    bg: 'bg-orange-50',
    border: 'border-orange-100'
  },
  {
    title: 'Certificate',
    desc: 'Earn a shareable SwordNex verified certificate on successful completion',
    icon: <Award className="w-5 h-5 text-emerald-500" />,
    bg: 'bg-emerald-50',
    border: 'border-emerald-100'
  },
  {
    title: 'Community Access',
    desc: 'Join our exclusive Discord community with 10,000+ active developers',
    icon: <Users className="w-5 h-5 text-pink-500" />,
    bg: 'bg-pink-50',
    border: 'border-pink-100'
  },
  {
    title: 'Practice Exercises',
    desc: 'Hands-on coding labs and debugging challenges for daily skill-building',
    icon: <Dumbbell className="w-5 h-5 text-teal-500" />,
    bg: 'bg-teal-50',
    border: 'border-teal-100'
  }
];

const CourseBenefits = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-xl font-bold text-slate-900">Student Benefits</h2>
        <p className="text-xs text-slate-500 mt-0.5">Everything included in your SwordNex live course enrollment package.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {benefitsList.map((benefit, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl bg-white border ${benefit.border} shadow-sm hover:shadow-md transition-all duration-300 group flex items-start gap-4`}
          >
            <div className={`w-10 h-10 rounded-xl ${benefit.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
              {benefit.icon}
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">{benefit.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{benefit.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseBenefits;
