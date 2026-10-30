import React from 'react';
import { BadgeCheck, User, Hash, BookOpen, CalendarDays, UserCircle, Phone, Mail, CreditCard, CheckCircle2 } from 'lucide-react';

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col gap-0.5">
    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</p>
    <p className="text-sm font-semibold text-slate-900">{value || '—'}</p>
  </div>
);

const SuccessCard = ({ enrollment }) => {
  const {
    studentId = 'STU-88921-X',
    enrollmentNumber = 'ENR-2024-45B',
    courseName = 'React JS Live Training',
    batch = 'Evening Batch (7–9 PM)',
    trainerName = 'Arun Kumar',
    startDate = 'August 10, 2026',
    email = 'student@example.com',
    mobile = '+91 98765 43210',
    paymentStatus = 'Success',
    paymentId = `TXN-${Math.floor(Math.random() * 90000000 + 10000000)}`,
  } = enrollment || {};

  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">Enrollment Summary</h3>
        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          Confirmed
        </span>
      </div>

      <div className="p-6 space-y-5">
        {/* IDs Row */}
        <div className="grid grid-cols-2 gap-5">
          <InfoRow label="Student ID" value={studentId} />
          <InfoRow label="Enrollment Number" value={enrollmentNumber} />
        </div>

        {/* Course Name */}
        <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Course Name</p>
          <p className="text-lg font-extrabold text-purple-650 leading-snug">{courseName}</p>
        </div>

        {/* Batch + Trainer */}
        <div className="grid grid-cols-2 gap-5">
          <InfoRow label="Selected Batch" value={batch} />
          <InfoRow label="Trainer Name" value={trainerName} />
        </div>

        {/* Start Date + Contact */}
        <div className="grid grid-cols-2 gap-5">
          <InfoRow label="Start Date" value={startDate} />
          <InfoRow label="Registered Contact" value={email} />
        </div>

        {/* Mobile */}
        <InfoRow label="Registered Mobile" value={mobile} />

        {/* Payment section */}
        <div className="border-t border-slate-100 pt-5 grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-0.5">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Payment Status</p>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-bold text-emerald-700">{paymentStatus}</span>
            </div>
          </div>
          <InfoRow label="Payment ID" value={paymentId} />
        </div>

        {/* Confirmation badge */}
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100">
          <BadgeCheck className="w-5 h-5 text-purple-650 flex-shrink-0" />
          <p className="text-xs text-slate-600 leading-relaxed">
            Your enrollment is <strong className="text-purple-650">officially confirmed</strong>. Check your email for login credentials and class joining details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessCard;
