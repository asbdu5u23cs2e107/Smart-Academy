import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, GraduationCap, ArrowRight } from 'lucide-react';

const PaymentSuccess = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-72 w-72 rounded-full bg-emerald-500/5 blur-[80px]"></div>

      <div className="w-full max-w-md space-y-8 bg-white/40 border border-slate-100 p-8 rounded-3xl backdrop-blur text-center flex flex-col items-center">
        
        {/* Animated Green Check Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <CheckCircle2 className="h-16 w-16 text-emerald-400 relative z-10 animate-bounce" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight uppercase">PAYMENT SUCCESS 🎉</h2>
          <p className="text-xs text-slate-650">Payment Completed Successfully</p>
        </div>

        {/* Details Card */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 w-full space-y-3">
          <div className="text-xs text-slate-500">Enrolled Course:</div>
          <div className="text-base font-bold text-slate-900 uppercase flex items-center justify-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-650" />
            <span>Full Stack Development</span>
          </div>
          <div className="h-px bg-white w-full"></div>
          <div className="text-xs text-emerald-400 font-semibold">
            Your Learning Access is Activated
          </div>
        </div>

        <div className="w-full">
          <Link
            to="/student-dashboard"
            className="btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2 group"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PaymentSuccess;
