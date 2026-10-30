import React from 'react';
import { BookOpen, Check, Globe, Clock } from 'lucide-react';

const labelClass = 'block text-xs font-semibold text-slate-600 mb-1.5';

const batchOptions = [
  { value: 'morning', label: 'Morning Batch', time: '7:00 AM – 9:00 AM' },
  { value: 'evening', label: 'Evening Batch', time: '7:00 PM – 9:00 PM' },
  { value: 'weekend', label: 'Weekend Batch', time: 'Sat & Sun, 10 AM – 1 PM' },
  { value: 'fast_track', label: 'Fast Track', time: 'Mon – Fri, Intensive' },
];

const languageOptions = [
  { value: 'tamil', label: 'Tamil' },
  { value: 'english', label: 'English' },
];

const CourseDetailsForm = ({ data, onChange, course }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 md:p-8 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
        <div className="w-7 h-7 rounded-full bg-purple-650 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
          5
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Course Details</h2>
          <p className="text-xs text-slate-500 mt-0.5">Customize your learning preferences</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Selected Course (Read Only) */}
        <div>
          <label className={labelClass}>Selected Course</label>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-purple-50 border border-purple-100">
            <div className="w-9 h-9 rounded-xl bg-purple-650/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-purple-650" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{course?.courseName || 'React JS Live Training'}</p>
              <p className="text-xs text-slate-500">{course?.duration || '12 Weeks'} • {course?.level || 'Beginner to Advanced'}</p>
            </div>
            <span className="ml-auto text-[10px] font-bold text-purple-650 bg-purple-100 px-2 py-0.5 rounded-full">Selected</span>
          </div>
        </div>

        {/* Preferred Batch */}
        <div>
          <label className={labelClass}>Preferred Batch <span className="text-rose-500">*</span></label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {batchOptions.map((opt) => {
              const isSelected = data.batch === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange('batch', opt.value)}
                  className={`flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected ? 'border-purple-600 bg-purple-600' : 'border-slate-300'
                  }`}>
                    {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${isSelected ? 'text-purple-650' : 'text-slate-800'}`}>{opt.label}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {opt.time}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Learning Mode */}
        <div>
          <label className={labelClass}>Learning Mode</label>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Globe className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Online Live</p>
              <p className="text-xs text-slate-500">Real-time sessions with interactive Q&A</p>
            </div>
            <span className="ml-auto text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
              Fixed
            </span>
          </div>
        </div>

        {/* Language */}
        <div>
          <label className={labelClass}>Preferred Language <span className="text-rose-500">*</span></label>
          <div className="flex gap-3">
            {languageOptions.map((opt) => {
              const isSelected = data.language === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange('language', opt.value)}
                  className={`flex-1 py-3 rounded-2xl border-2 text-sm font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50 text-purple-650'
                      : 'border-slate-200 hover:border-purple-300 text-slate-600'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsForm;
