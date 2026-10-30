import React from 'react';
import { Briefcase, ChevronDown } from 'lucide-react';

const inputClass =
  'w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 px-4 text-sm text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/10 transition-colors';

const labelClass = 'block text-xs font-semibold text-slate-600 mb-1.5';

const statusOptions = [
  { value: 'student', label: 'Student' },
  { value: 'working', label: 'Working Professional' },
  { value: 'job_seeker', label: 'Job Seeker' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'business', label: 'Business Owner' },
  { value: 'other', label: 'Other' },
];

const ProfessionalDetailsForm = ({ data, onChange }) => {
  const showWorkFields = ['working', 'freelancer', 'business'].includes(data.currentStatus);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 md:p-8 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
        <div className="w-7 h-7 rounded-full bg-purple-650 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
          4
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Professional Details</h2>
          <p className="text-xs text-slate-500 mt-0.5">Your current professional status</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Current Status */}
        <div>
          <label className={labelClass}>Current Status <span className="text-rose-500">*</span></label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={data.currentStatus}
              onChange={(e) => onChange('currentStatus', e.target.value)}
              className={`${inputClass} pl-10 pr-10 appearance-none`}
            >
              <option value="">Select your current status</option>
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Conditional Work Fields */}
        {showWorkFields && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
            {/* Company Name */}
            <div className="md:col-span-2">
              <label className={labelClass}>Company / Organisation Name</label>
              <input
                type="text"
                placeholder="e.g. Infosys, TCS, Startup Name"
                value={data.company}
                onChange={(e) => onChange('company', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Experience */}
            <div>
              <label className={labelClass}>Work Experience</label>
              <div className="relative">
                <select
                  value={data.experience}
                  onChange={(e) => onChange('experience', e.target.value)}
                  className={`${inputClass} pr-10 appearance-none`}
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0 – 1 Year</option>
                  <option value="1-2">1 – 2 Years</option>
                  <option value="2-3">2 – 3 Years</option>
                  <option value="3-5">3 – 5 Years</option>
                  <option value="5+">5+ Years</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Designation */}
            <div>
              <label className={labelClass}>Current Designation</label>
              <input
                type="text"
                placeholder="e.g. Software Engineer, Manager"
                value={data.designation}
                onChange={(e) => onChange('designation', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        )}

        {/* Status description hint */}
        {data.currentStatus && !showWorkFields && (
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 text-xs text-purple-700">
            <span className="font-semibold">
              {statusOptions.find((o) => o.value === data.currentStatus)?.label}
            </span>{' '}
            — No additional professional details required for your current status.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalDetailsForm;
