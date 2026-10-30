import React from 'react';
import { Layers } from 'lucide-react';

const CourseProjects = ({ courseName, projects }) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-xl font-bold text-slate-900">Real-Time Projects</h2>
        <p className="text-xs text-slate-500 mt-0.5">Build production-ready portfolios to showcase your skills to recruiters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects?.map((project, idx) => (
          <div 
            key={idx}
            className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            {/* Project Image */}
            <div className="aspect-video relative overflow-hidden bg-slate-150 border-b border-slate-100">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 text-[9px] uppercase tracking-wider font-extrabold text-white bg-slate-900/85 backdrop-blur px-2.5 py-1 rounded-full">
                Capstone Build
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">{project.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{project.desc}</p>
              </div>

              {/* Technologies Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-50">
                <Layers className="w-3.5 h-3.5 text-purple-650 flex-shrink-0 mr-1" />
                {project.tech.map((techItem, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-650"
                  >
                    {techItem}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseProjects;
