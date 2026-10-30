import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Video, FileText, BookOpen,
  Headphones, ChevronRight, Sparkles
} from 'lucide-react';

const actionItems = [
  {
    id: 'dashboard',
    label: 'Go to Dashboard',
    desc: 'View your learning progress',
    icon: <LayoutDashboard className="w-5 h-5" />,
    path: '/student-dashboard',
    primary: true,
    bg: 'bg-purple-600',
    iconBg: 'bg-purple-700',
  },
  {
    id: 'live',
    label: 'Join Live Classes',
    desc: 'Enter your scheduled sessions',
    icon: <Video className="w-5 h-5" />,
    path: '/live-classes',
    bg: 'bg-white',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    id: 'invoice',
    label: 'Download Invoice',
    desc: 'Get your payment receipt',
    icon: <FileText className="w-5 h-5" />,
    path: '#',
    bg: 'bg-white',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'course',
    label: 'View Course Details',
    desc: 'Explore the full curriculum',
    icon: <BookOpen className="w-5 h-5" />,
    path: '/live-classes',
    bg: 'bg-white',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    id: 'support',
    label: 'Contact Support',
    desc: 'Need help? We\'re here for you',
    icon: <Headphones className="w-5 h-5" />,
    path: '/contact',
    bg: 'bg-white',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-500',
  },
];

const ActionCards = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-purple-650" />
        Next Steps
      </h3>

      <div className="space-y-3">
        {actionItems.map((item) => {
          const isPrimary = item.primary;

          return (
            <button
              key={item.id}
              onClick={() => item.path !== '#' && navigate(item.path)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 group text-left ${
                isPrimary
                  ? 'bg-purple-650 border-purple-700 text-white shadow-lg shadow-purple-650/25 hover:bg-purple-700 hover:shadow-xl hover:shadow-purple-650/30 hover:-translate-y-0.5'
                  : 'bg-white border-slate-200 hover:border-purple-200 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${
                  isPrimary
                    ? 'bg-white/20 text-white'
                    : `${item.iconBg} ${item.iconColor}`
                }`}
              >
                {item.icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                {isPrimary && (
                  <p className="text-[10px] font-bold text-purple-200 uppercase tracking-wider mb-0.5">
                    Primary Action
                  </p>
                )}
                <p className={`text-sm font-bold ${isPrimary ? 'text-white' : 'text-slate-900'}`}>
                  {item.label}
                </p>
                <p className={`text-[11px] mt-0.5 ${isPrimary ? 'text-purple-200' : 'text-slate-500'}`}>
                  {item.desc}
                </p>
              </div>

              {/* Arrow */}
              <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1 ${
                isPrimary ? 'text-purple-200' : 'text-slate-400'
              }`} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ActionCards;
