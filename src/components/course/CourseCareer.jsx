import React from 'react';
import { Briefcase, ArrowUpRight, TrendingUp } from 'lucide-react';

const CourseCareer = ({ courseName, careerRoles }) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-xl font-bold text-slate-900">Career Opportunities</h2>
        <p className="text-xs text-slate-500 mt-0.5">Explore target roles and market profiles you can transition into.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {careerRoles?.map((role, idx) => (
          <div 
            key={idx}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-650 flex-shrink-0 group-hover:bg-purple-100 transition-colors">
                <Briefcase className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-purple-650 transition-colors">
                {role}
              </h3>
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <span>High Demand</span>
              </div>
              <div className="flex items-center gap-0.5 font-semibold text-purple-650 hover:underline cursor-pointer">
                <span>Apply Roles</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCareer;
