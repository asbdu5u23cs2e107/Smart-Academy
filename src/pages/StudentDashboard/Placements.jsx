import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Briefcase, CheckCircle2, ArrowRight, User, GitBranch, Globe, Link2, Upload, FileText, Building2, TrendingUp } from 'lucide-react';

const jobOpenings = [
  { id: 1, role: 'Frontend Developer',      company: 'Zoho Corporation',    type: 'Full Time', location: 'Chennai', salary: '₹6–10 LPA',  logo: 'Z', color: 'bg-red-500' },
  { id: 2, role: 'React Developer',          company: 'Freshworks',          type: 'Full Time', location: 'Remote',  salary: '₹8–14 LPA',  logo: 'F', color: 'bg-emerald-500' },
  { id: 3, role: 'Full Stack Intern',        company: 'Infosys BPM',         type: 'Internship',location: 'Bangalore',salary: '₹25K/month', logo: 'I', color: 'bg-indigo-600' },
  { id: 4, role: 'Junior Software Engineer', company: 'TCS Digital',         type: 'Full Time', location: 'Hybrid',  salary: '₹5–8 LPA',   logo: 'T', color: 'bg-blue-600' },
];

const PlacementsStudent = () => {
  const { user } = useAuth();

  const profile = {
    name: user?.name || 'Student',
    profileCompletion: user?.profileCompletion || 90,
    resumeUploaded: user?.resumeUploaded ?? true,
    portfolioUrl: user?.portfolioUrl || '',
    githubUrl: user?.githubUrl || '',
    linkedinUrl: user?.linkedinUrl || '',
  };

  const readinessItems = [
    { label: 'Profile Complete',    done: profile.profileCompletion >= 90 },
    { label: 'Resume Uploaded',     done: profile.resumeUploaded },
    { label: 'Portfolio Linked',    done: !!profile.portfolioUrl },
    { label: 'GitHub Connected',    done: !!profile.githubUrl },
    { label: 'LinkedIn Connected',  done: !!profile.linkedinUrl },
    { label: 'Course ≥ 60%',        done: true },
  ];

  const readyCount = readinessItems.filter(r => r.done).length;
  const readyPct = Math.round((readyCount / readinessItems.length) * 100);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <span className="text-xs text-purple-650 font-bold uppercase tracking-widest">Student Dashboard</span>
        <h1 className="text-xl font-extrabold text-slate-900 uppercase mt-0.5 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-teal-500" /> Placements
        </h1>
      </div>

      {/* Readiness Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Readiness Score */}
        <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">Placement Readiness</h2>
              <p className="text-[10px] text-slate-500 mt-0.5">Complete all items to unlock full placement support</p>
            </div>
            <div className="text-3xl font-extrabold text-purple-650">{readyPct}%</div>
          </div>
          {/* Progress */}
          <div className="h-2 w-full bg-purple-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${readyPct}%` }}
            />
          </div>
          {/* Checklist */}
          <div className="grid grid-cols-1 gap-1.5">
            {readinessItems.map(({ label, done }) => (
              <div key={label} className="flex items-center gap-2 text-[11px]">
                <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${done ? 'text-emerald-500' : 'text-slate-300'}`} />
                <span className={done ? 'text-slate-700 font-medium' : 'text-slate-400 line-through'}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl bg-white/60 border border-slate-100 p-6 space-y-4">
          <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-slate-500" /> Your Profile
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center font-bold text-white text-lg shadow">
              {profile.name.charAt(0)}
            </div>
            <div>
              <p className="font-extrabold text-slate-900">{profile.name}</p>
              <p className="text-[10px] text-slate-400">Full Stack Development Student</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Resume',    icon: FileText,  url: profile.resumeUploaded ? '#' : null, placeholder: 'No resume uploaded' },
              { label: 'Portfolio', icon: Globe,     url: profile.portfolioUrl, placeholder: 'No portfolio linked' },
              { label: 'GitHub',    icon: GitBranch,    url: profile.githubUrl, placeholder: 'No GitHub linked' },
              { label: 'LinkedIn',  icon: Link2,  url: profile.linkedinUrl, placeholder: 'No LinkedIn linked' },
            ].map(({ label, icon: Icon, url, placeholder }) => (
              <div key={label} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-500">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="font-medium">{label}</span>
                </div>
                {url ? (
                  <a href={url} target="_blank" rel="noreferrer" className="text-purple-650 font-semibold hover:underline truncate max-w-[140px] text-[10px]">
                    {url === '#' ? 'Resume Uploaded ✓' : url}
                  </a>
                ) : (
                  <span className="text-slate-300 text-[10px]">{placeholder}</span>
                )}
              </div>
            ))}
          </div>
          <Link to="/placements" className="btn-primary w-full text-center text-xs flex justify-center items-center gap-2">
            <Upload className="w-3.5 h-3.5" /> Update Profile
          </Link>
        </div>
      </div>

      {/* Job Openings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-650 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-500" /> Live Job Openings
          </h2>
          <Link to="/placements" className="text-xs text-purple-650 font-semibold hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {jobOpenings.map(job => (
            <div
              key={job.id}
              className="p-4 rounded-2xl bg-white/60 border border-slate-100 hover:shadow-md transition-all flex items-start gap-3"
            >
              {/* Company Logo */}
              <div className={`w-10 h-10 flex-shrink-0 rounded-xl ${job.color} flex items-center justify-center font-extrabold text-white text-sm shadow`}>
                {job.logo}
              </div>
              {/* Info */}
              <div className="flex-grow space-y-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate">{job.role}</h4>
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <Building2 className="w-2.5 h-2.5" /> {job.company}
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[9px] font-bold uppercase border border-slate-200">{job.type}</span>
                  <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-600 text-[9px] font-bold border border-teal-200">{job.location}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-bold border border-emerald-200">{job.salary}</span>
                </div>
              </div>
              <Link to="/placements" className="flex-shrink-0 p-1.5 rounded-lg bg-purple-50 text-purple-650 hover:bg-purple-600 hover:text-white transition-all">
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PlacementsStudent;
