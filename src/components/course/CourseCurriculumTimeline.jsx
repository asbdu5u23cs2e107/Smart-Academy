import React, { useState } from 'react';
import { ChevronDown, BookOpen, CircleDot, Play } from 'lucide-react';

const CourseCurriculumTimeline = ({ courseName, curriculum }) => {
  const [activeModule, setActiveModule] = useState(0);

  const toggleModule = (index) => {
    setActiveModule(activeModule === index ? null : index);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-3 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Syllabus Curriculum</h2>
          <p className="text-xs text-slate-500 mt-0.5">Explore the dynamic training milestones mapping.</p>
        </div>
        <span className="text-[10px] uppercase tracking-wider font-extrabold text-purple-650 bg-purple-50 px-2.5 py-1 rounded-full">
          {curriculum?.length || 0} Modules
        </span>
      </div>

      <div className="relative border-l border-purple-200/80 ml-4 pl-6 space-y-6">
        {curriculum?.map((module, idx) => {
          const isOpen = activeModule === idx;
          return (
            <div key={idx} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 bg-white transition-all duration-300 ${
                isOpen 
                  ? 'border-purple-600 scale-125 shadow-sm' 
                  : 'border-slate-350 scale-100 group-hover:border-purple-400'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full mx-auto my-[3px] transition-colors ${
                  isOpen ? 'bg-purple-650' : 'bg-slate-300 group-hover:bg-purple-400'
                }`} />
              </div>

              {/* Module Card */}
              <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <button
                  onClick={() => toggleModule(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 select-none"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-purple-650 bg-purple-50 px-2 py-0.5 rounded-md">
                      Module {idx + 1}
                    </span>
                    <h3 className="text-sm md:text-base font-bold text-slate-900 leading-snug">
                      {module.moduleName.replace(/^Module\s+\d+:\s*/i, '')}
                    </h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-450 transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? 'rotate-180 text-purple-650' : 'rotate-0'
                  }`} />
                </button>

                {/* Collapsible Content */}
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-[500px] border-t border-slate-100' : 'max-h-0'
                }`}>
                  <div className="p-5 bg-slate-50/50 space-y-3 text-xs md:text-sm">
                    <p className="font-semibold text-slate-700 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-purple-650" />
                      <span>Key Topics Covered:</span>
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-1">
                      {module.topics.map((topic, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2 text-slate-650">
                          <CircleDot className="w-3.5 h-3.5 text-purple-600/80 mt-0.5 flex-shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseCurriculumTimeline;
