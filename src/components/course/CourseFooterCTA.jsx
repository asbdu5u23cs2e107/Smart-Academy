import React from 'react';
import { Sparkles, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CourseFooterCTA = ({ course, onRegisterClick }) => {
  const navigate = useNavigate();

  const handleEnroll = () => {
    navigate(`/enrollment?slug=${course?.slug}`);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 md:p-12 text-center shadow-xl border border-slate-800">
      {/* Decorative Blur Blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-purple-600/15 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-indigo-600/15 blur-[80px] pointer-events-none" />

      <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
        {/* Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Start Your Career Today</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold !text-white leading-tight">
          Begin Your Journey with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
            SwordNex
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          Join {course?.courseName} live training and transform your career with expert mentorship, real projects, and guaranteed placement support.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={handleEnroll}
            className="btn-primary flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-purple-900/30"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Enroll Now</span>
          </button>
          <Link
            to="/contact"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 !text-white leading-tight text-sm font-semibold border border-white/10 transition-all duration-200"
          >
            <Phone className="w-4 h-4" />
            <span>Talk to Advisor</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseFooterCTA;
