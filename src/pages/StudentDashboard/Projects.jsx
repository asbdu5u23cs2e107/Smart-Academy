import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ExternalLink, GitBranch, Globe, CheckCircle2, Clock, ArrowRight, Star } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Website',
    description: 'A full-stack e-commerce platform with product listing, cart, authentication, and payment integration built with React + Node.js.',
    level: 'Advanced',
    status: 'In Progress',
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    progress: 65,
    github: 'https://github.com/kutty-dev/ecommerce',
    demo: null,
    stars: 4,
  },
  {
    id: 2,
    title: 'Weather Forecast App',
    description: 'A responsive weather app using OpenWeatherMap API with location-based forecast, 5-day outlook, and animated weather icons.',
    level: 'Beginner',
    status: 'Completed',
    tech: ['React', 'CSS', 'REST API'],
    progress: 100,
    github: 'https://github.com/kutty-dev/weather-app',
    demo: 'https://weather.kutty.dev',
    stars: 5,
  },
  {
    id: 3,
    title: 'Task Management Dashboard',
    description: 'Kanban-style task manager with drag-and-drop, priority tags, due dates, and local storage persistence.',
    level: 'Intermediate',
    status: 'Pending',
    tech: ['React', 'Context API', 'CSS'],
    progress: 0,
    github: null,
    demo: null,
    stars: 0,
  },
];

const levelConfig = {
  Beginner:     'bg-emerald-50 text-emerald-600 border-emerald-200',
  Intermediate: 'bg-amber-50 text-amber-600 border-amber-200',
  Advanced:     'bg-rose-50 text-rose-500 border-rose-200',
};

const statusConfig = {
  Completed:   { color: 'text-emerald-500 bg-emerald-50 border-emerald-200', icon: CheckCircle2 },
  'In Progress':{ color: 'text-amber-500 bg-amber-50 border-amber-200',      icon: Clock },
  Pending:     { color: 'text-slate-400 bg-slate-50 border-slate-200',       icon: Clock },
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const statuses = ['All', 'Completed', 'In Progress', 'Pending'];
  const filtered = projects.filter(p => activeFilter === 'All' || p.status === activeFilter);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <span className="text-xs text-purple-650 font-bold uppercase tracking-widest">Student Dashboard</span>
          <h1 className="text-xl font-extrabold text-slate-900 uppercase mt-0.5 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" /> My Projects
          </h1>
        </div>
        <Link to="/projects" className="btn-primary inline-flex items-center gap-2 text-xs">
          Projects Hub <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setActiveFilter(s)}
            className={`px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wide border transition-all ${
              activeFilter === s ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(proj => {
          const cfg = statusConfig[proj.status];
          const StatusIcon = cfg.icon;
          return (
            <div key={proj.id} className="rounded-2xl bg-white/60 border border-slate-100 overflow-hidden hover:shadow-md transition-all flex flex-col">
              {/* Top Color Bar */}
              <div className={`h-1.5 w-full ${proj.status === 'Completed' ? 'bg-emerald-400' : proj.status === 'In Progress' ? 'bg-amber-400' : 'bg-slate-200'}`} />

              <div className="p-5 flex flex-col gap-4 flex-grow">
                {/* Title Row */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">{proj.title}</h3>
                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed line-clamp-2">{proj.description}</p>
                  </div>
                  <span className={`flex-shrink-0 px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase ${levelConfig[proj.level]}`}>
                    {proj.level}
                  </span>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[9px] font-bold uppercase border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Progress */}
                {proj.progress > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                      <span>Progress</span><span>{proj.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${proj.status === 'Completed' ? 'bg-emerald-400' : 'bg-amber-400'}`}
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Stars */}
                {proj.stars > 0 && (
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < proj.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                    ))}
                    <span className="text-[10px] text-slate-400 ml-1">Trainer rating</span>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                  <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase ${cfg.color}`}>
                    <StatusIcon className="w-3 h-3" /> {proj.status}
                  </span>
                  <div className="flex items-center gap-2">
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all">
                        <GitBranch className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {proj.demo && (
                      <a href={proj.demo} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-650 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all">
                        <Globe className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <Link to="/projects" className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
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

export default Projects;
