import React from 'react';
import { Star, Clock, Users, Globe, Award, ShieldCheck, MonitorPlay, CalendarDays } from 'lucide-react';

const CourseSummaryCard = ({ course }) => {
  if (!course) return null;

  const rating = course.rating || 4.8;
  const fullStars = Math.floor(rating);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-5 md:p-6">
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Course Image */}
        <div className="w-full sm:w-36 h-28 flex-shrink-0 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 to-indigo-100">
          {course.courseImage ? (
            <img
              src={course.courseImage}
              alt={course.courseName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <MonitorPlay className="w-10 h-10 text-purple-400" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Category + Rating */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-650 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
              {course.category || 'Development'}
            </span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < fullStars ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-200'}`}
                />
              ))}
              <span className="text-xs font-bold text-amber-500 ml-1">{rating}</span>
            </div>
          </div>

          {/* Course Name */}
          <h2 className="text-base md:text-lg font-extrabold text-slate-900 leading-snug">
            {course.courseName}
          </h2>

          {/* Key Details */}
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[11px] text-slate-600">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-purple-500" />
              {course.mentorName || 'Expert Trainer'}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-500" />
              {course.duration || '12 Weeks'}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-purple-500" />
              {course.batch || 'Evening / Weekend'}
            </span>
            <span className="flex items-center gap-1.5">
              <MonitorPlay className="w-3.5 h-3.5 text-purple-500" />
              {course.mode || 'Online Live'}
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-purple-500" />
              {course.language || 'Tamil / English'}
            </span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <Award className="w-3 h-3" /> Certificate Included
            </span>
            <span className="flex items-center gap-1 text-[10px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              <ShieldCheck className="w-3 h-3" /> Placement Support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSummaryCard;
