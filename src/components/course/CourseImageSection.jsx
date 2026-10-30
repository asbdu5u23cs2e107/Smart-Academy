import React from 'react';
import { Briefcase, Award, FolderHeart, Users, CheckCircle } from 'lucide-react';

const CourseImageSection = ({ course }) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-xl font-bold text-slate-900">Program Learning Journey</h2>
        <p className="text-xs text-slate-500 mt-0.5">Explore the highlights of our live learning ecosystem.</p>
      </div>

      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-white p-4">
        {/* Main Image Container */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100">
          <img 
            src={course.courseImage} 
            alt={course.courseName}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
          {/* Subtle Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
          
          {/* Floating Pill on image */}
          <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur text-xs font-semibold text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Live Interactive Sessions</span>
          </div>
        </div>

        {/* Floating / Stacked Information Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-purple-50/50 border border-purple-100">
            <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center text-purple-650 flex-shrink-0">
              <Briefcase className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Placement Support</p>
              <p className="text-[10px] text-slate-500">Resume & Referral logs</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-rose-50/50 border border-rose-100">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-500 flex-shrink-0">
              <CheckCircle className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">100+ Hiring Partners</p>
              <p className="text-[10px] text-slate-500">Top MNCs & Startups</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50/50 border border-amber-100">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
              <Award className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Industry Certificate</p>
              <p className="text-[10px] text-slate-500">SwordNex Certified</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50/50 border border-blue-100">
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500 flex-shrink-0">
              <FolderHeart className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Live Projects</p>
              <p className="text-[10px] text-slate-500">{course.projects?.length || 4}+ Real Builds</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100 col-span-2 md:col-span-1">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <Users className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Students Enrolled</p>
              <p className="text-[10px] text-slate-500">{course.studentsEnrolled} Active</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseImageSection;
