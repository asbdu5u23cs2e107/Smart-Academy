import React from 'react';
import { GraduationCap, ChevronDown } from 'lucide-react';

const inputClass =
  'w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 px-4 text-sm text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/10 transition-colors';

const labelClass = 'block text-xs font-semibold text-slate-600 mb-1.5';

const qualifications = [
  'High School (10th)',
  'Higher Secondary (12th)',
  'Diploma',
  "Bachelor's Degree (B.E / B.Tech / BCA / B.Sc)",
  "Master's Degree (M.E / M.Tech / MCA / M.Sc)",
  'MBA / MCA',
  'PhD',
  'Other',
];

const EducationDetailsForm = ({ data, onChange }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 md:p-8 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
        <div className="w-7 h-7 rounded-full bg-purple-650 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
          3
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Education Details</h2>
          <p className="text-xs text-slate-500 mt-0.5">Your academic background</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Qualification */}
        <div className="md:col-span-2">
          <label className={labelClass}>Highest Qualification <span className="text-rose-500">*</span></label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={data.qualification}
              onChange={(e) => onChange('qualification', e.target.value)}
              className={`${inputClass} pl-10 pr-10 appearance-none`}
            >
              <option value="">Select Qualification</option>
              {qualifications.map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* College Name */}
        <div className="md:col-span-2">
          <label className={labelClass}>College / University Name <span className="text-rose-500">*</span></label>
          <input
            type="text"
            placeholder="Enter your college or university name"
            value={data.collegeName}
            onChange={(e) => onChange('collegeName', e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Department */}
        <div>
          <label className={labelClass}>Department / Branch <span className="text-rose-500">*</span></label>
          <input
            type="text"
            placeholder="e.g. Computer Science"
            value={data.department}
            onChange={(e) => onChange('department', e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Year of Passing */}
        <div>
          <label className={labelClass}>Year of Passing <span className="text-rose-500">*</span></label>
          <div className="relative">
            <select
              value={data.yearOfPassing}
              onChange={(e) => onChange('yearOfPassing', e.target.value)}
              className={`${inputClass} pr-10 appearance-none`}
            >
              <option value="">Select Year</option>
              {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() + 2 - i).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Percentage / CGPA */}
        <div>
          <label className={labelClass}>Percentage / CGPA</label>
          <input
            type="text"
            placeholder="e.g. 8.5 CGPA or 85%"
            value={data.percentage}
            onChange={(e) => onChange('percentage', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
};

export default EducationDetailsForm;
