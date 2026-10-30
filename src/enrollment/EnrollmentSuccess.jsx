import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Sparkles, Download, Share2 } from 'lucide-react';
import SuccessCard from './components/SuccessCard';
import ActionCards from './components/ActionCards';

// Generate a random enrollment reference
const generateId = (prefix, len = 8) =>
  `${prefix}-${Math.random().toString(36).toUpperCase().slice(2, 2 + len)}`;

const batchLabels = {
  morning: 'Morning Batch (7–9 AM)',
  evening: 'Evening Batch (7–9 PM)',
  weekend: 'Weekend Batch (Sat & Sun)',
  fast_track: 'Fast Track (Mon–Fri)',
};

const EnrollmentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};

  // If no state (direct URL visit), generate mock data
  const enrollment = {
    studentId: generateId('STU', 7),
    enrollmentNumber: generateId('ENR', 8),
    courseName: state.courseName || 'React JS Live Training',
    batch: batchLabels[state.batch] || 'Evening Batch (7–9 PM)',
    trainerName: state.trainerName || 'Arun Kumar',
    startDate: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    })(),
    email: state.email || 'student@example.com',
    mobile: state.mobile || '+91 98765 43210',
    paymentStatus: 'Success',
    paymentId: generateId('TXN', 9),
  };

  // Confetti-like blobs animation is handled via CSS below
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* ── Success Hero ── */}
      <div className="relative overflow-hidden bg-white border-b border-slate-100">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-100/60 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-indigo-100/50 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          {/* Icon */}
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 border-4 border-purple-200 shadow-xl shadow-purple-100 mb-6">
            <CheckCircle className="w-10 h-10 text-purple-650" />
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">✓</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Enrollment{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500">
              Successful!
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            🎉 <strong className="text-slate-700">Congratulations! Welcome to SwordNex.</strong>
            <br />
            Your admission has been confirmed successfully.
          </p>

          {/* Action row */}
          <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
              <Download className="w-4 h-4 text-purple-650" />
              Download Invoice
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
              <Share2 className="w-4 h-4 text-indigo-500" />
              Share Achievement
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Two-Column Content ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: Enrollment Summary Card */}
          <div className="flex-1 min-w-0">
            <SuccessCard enrollment={enrollment} />

            {/* Email confirmation notice */}
            <div className="mt-4 flex items-start gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
              <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
              <p>
                A confirmation email with your <strong>login credentials</strong> and class schedule has been sent to{' '}
                <strong className="text-amber-900">{enrollment.email}</strong>. Check your spam folder if not received within 5 minutes.
              </p>
            </div>
          </div>

          {/* Right: Action Cards */}
          <div className="w-full lg:w-[360px] xl:w-[380px] flex-shrink-0 lg:sticky lg:top-24 self-start">
            <ActionCards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentSuccess;
