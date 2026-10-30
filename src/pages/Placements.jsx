import React, { useState } from 'react';
import { 
  Briefcase, CheckCircle, Clock, MapPin, Upload, Eye, 
  Download, RefreshCw, Star, Users, Phone, ArrowUpRight, 
  CheckSquare, AlertCircle, FileText, Bell 
} from 'lucide-react';

const Placements = () => {
  // Interactive job application status mapping
  const [jobApplications, setJobApplications] = useState({
    TCS: 'Apply',
    
    Zoho: 'Apply',
    Infosys: 'Applied',
    HCL: 'Apply'
  });

  const [eligible, setEligible] = useState(true);
  const [profileCompletion, setProfileCompletion] = useState(90);

  const handleApply = (company) => {
    setJobApplications(prev => ({
      ...prev,
      [company]: 'Applied'
    }));
  };

  const stats = [
    { label: 'Companies Visited', value: '45+', color: 'text-purple-650' },
    { label: 'Jobs Applied', value: '12', color: 'text-purple-650' },
    { label: 'Upcoming Interviews', value: '2', color: 'text-yellow-500' },
    { label: 'Shortlisted Companies', value: '4', color: 'text-purple-650' },
    { label: 'Offers Received', value: '1', color: 'text-emerald-400' }
  ];

  const jobsList = [
    { company: 'TCS', role: 'Software Developer', location: 'Chennai', pkg: '₹4 LPA', lastDate: '25 Jul' },
    { company: 'Zoho', role: 'Web Developer', location: 'Chennai', pkg: '₹6 LPA', lastDate: '28 Jul' },
    { company: 'Infosys', role: 'System Engineer', location: 'Bangalore', pkg: '₹3.6 LPA', lastDate: '30 Jul' },
    { company: 'HCL', role: 'Frontend Developer', location: 'Chennai', pkg: '₹5 LPA', lastDate: '02 Aug' }
  ];

  const upcomingInterviews = [
    { company: 'Zoho', date: '25 Jul', time: '10:00 AM', mode: 'Online' },
    { company: 'TCS', date: '28 Jul', time: '2:00 PM', mode: 'Offline' }
  ];

  const announcements = [
    'New company drive announced: Freshworks Core Engineering Team.',
    'Resume submission deadline extended to 27th July for Zoho Drive.',
    'Interview schedule updated for TCS Offline rounds.',
    'Placement training session tomorrow: Mastering System Design basics.'
  ];

  const placementHistory = [
    { company: 'Infosys', role: 'System Engineer', status: 'Selected', color: 'text-emerald-400 bg-emerald-500/10' },
    { company: 'Zoho', role: 'Web Developer', status: 'Interview Scheduled', color: 'text-yellow-500 bg-yellow-500/10' },
    { company: 'TCS', role: 'Software Developer', status: 'Applied', color: 'text-slate-650 bg-white' }
  ];

  const prepModules = [
    'Aptitude Practice',
    'Coding Challenges',
    'Mock Interviews',
    'HR Interview Questions',
    'Technical Interview Questions',
    'Communication Skills'
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      
      {/* Welcome & Eligibility Banner */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-100 bg-white/10 p-6 md:p-8">
        <div className="absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-purple-50/50 blur-[80px]"></div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Placement Dashboard</h1>
            <p className="text-sm text-slate-700">Welcome, <strong className="text-white">Krish</strong></p>
            <p className="text-xs text-slate-500">Course: Full Stack Development</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            {/* Toggle mock eligibility */}
            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span className="text-slate-500">Placement Status:</span>
              <button 
                onClick={() => setEligible(!eligible)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  eligible ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                }`}
              >
                {eligible ? 'Eligible' : 'Not Eligible'}
              </button>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span className="text-slate-500">Profile Completion:</span>
              <span className="text-purple-650 font-bold">{profileCompletion}%</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span className="text-slate-500">Resume Status:</span>
              <span className="text-emerald-400 font-bold">Uploaded</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Grid */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((item) => (
          <div 
            key={item.label}
            className="p-4 rounded-2xl bg-white/40 border border-slate-100 text-center"
          >
            <span className="text-xs text-slate-500 block leading-tight">{item.label}</span>
            <span className={`text-2xl font-extrabold mt-2 block ${item.color}`}>{item.value}</span>
          </div>
        ))}
      </section>

      {/* Main Grid content: Job table & Prep lists */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Latest Job Opportunities Table */}
        <section className="lg:col-span-8 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 uppercase">Latest Job Opportunities</h2>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-white text-slate-650 text-[10px] uppercase font-bold tracking-wider border-b border-slate-950">
                  <tr>
                    <th className="px-6 py-4">Company</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Package</th>
                    <th className="px-6 py-4">Last Date</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60">
                  {jobsList.map((job) => {
                    const status = jobApplications[job.company];
                    return (
                      <tr key={job.company} className="hover:bg-white/40 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-sky-400"></span>
                          {job.company}
                        </td>
                        <td className="px-6 py-4">{job.role}</td>
                        <td className="px-6 py-4 flex items-center gap-1 mt-1 text-slate-650">
                          <MapPin className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                          <span>{job.location}</span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-800">{job.pkg}</td>
                        <td className="px-6 py-4 text-slate-500 font-mono">{job.lastDate}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleApply(job.company)}
                            disabled={status === 'Applied'}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                              status === 'Applied' 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-200 cursor-not-allowed' 
                                : 'bg-purple-600 hover:bg-sky-400 text-slate-950 shadow-md hover:-translate-y-0.5 active:translate-y-0 transform duration-200'
                            }`}
                          >
                            {status}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Sidebar Announcements and upcoming interviews */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Upcoming Interviews list */}
          <div className="p-6 rounded-2xl bg-white/40 border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-100 pb-2">📅 Upcoming Interviews</h3>
            <div className="space-y-3.5">
              {upcomingInterviews.map((int) => (
                <div key={int.company} className="p-3.5 rounded-xl bg-slate-50/40 border border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between items-center font-bold text-slate-900">
                    <span>{int.company}</span>
                    <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-650 text-[8px] font-bold uppercase tracking-wider">{int.mode}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[10px] font-mono">
                    <span>Date: {int.date}</span>
                    <span>Time: {int.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements list */}
          <div className="p-6 rounded-2xl bg-white/40 border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-purple-650" />
              <span>📢 Announcements</span>
            </h3>
            <ul className="space-y-3 text-[10px] text-slate-650">
              {announcements.map((ann, i) => (
                <li key={i} className="flex gap-2 leading-relaxed">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0"></span>
                  <span>{ann}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Resume and Prep Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Resume Box Section */}
        <div className="p-6 rounded-2xl bg-white/40 border border-slate-100 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-100 pb-2 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-purple-650" />
            <span>📄 Resume Section</span>
          </h3>
          <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
            <button className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 text-slate-650  transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload</span>
            </button>
            <button className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 text-slate-650  transition-colors">
              <Eye className="w-3.5 h-3.5" />
              <span>View</span>
            </button>
            <button className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 text-slate-650  transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Update</span>
            </button>
            <button className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 text-slate-650  transition-colors">
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Preparation Checklists */}
        <div className="p-6 rounded-2xl bg-white/40 border border-slate-100 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-100 pb-2">🎓 Placement Preparation</h3>
          <ul className="space-y-2 text-xs text-slate-700">
            {prepModules.map((mod) => (
              <li key={mod} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-650 flex-shrink-0" />
                <span>{mod}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills progress tracker checklist */}
        <div className="p-6 rounded-2xl bg-white/40 border border-slate-100 space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 uppercase border-b border-slate-100 pb-2">📈 Skills Progress</h3>
          <ul className="space-y-2 text-slate-650">
            <li className="flex justify-between"><span>HTML & CSS</span> <strong className="text-emerald-400">✅</strong></li>
            <li className="flex justify-between"><span>JavaScript</span> <strong className="text-emerald-400">✅</strong></li>
            <li className="flex justify-between"><span>React.js</span> <strong className="text-emerald-400">✅</strong></li>
            <li className="flex justify-between"><span>Node.js</span> <strong className="text-emerald-400">✅</strong></li>
            <li className="flex justify-between"><span>SQL</span> <strong className="text-emerald-400">✅</strong></li>
            <li className="flex justify-between items-center">
              <span>Aptitude</span> 
              <span className="flex text-amber-400"><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 text-slate-700" /></span>
            </li>
            <li className="flex justify-between items-center">
              <span>Communication</span> 
              <span className="flex text-amber-400"><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 text-slate-700" /></span>
            </li>
          </ul>
        </div>

        {/* Placement Mentor details card */}
        <div className="p-6 rounded-2xl bg-white/40 border border-slate-100 space-y-4 text-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-100 pb-2 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-purple-650" />
            <span>👨‍🏫 Placement Mentor</span>
          </h3>
          <div className="space-y-3.5">
            <div className="space-y-1">
              <p className="font-bold text-slate-900">Mentor Name: John David</p>
              <p className="text-slate-500 text-[10px]">Contact: david.mentor@smartacademy.com</p>
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <button className="w-full py-2 bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 transition-colors text-[10px] font-bold text-purple-650 rounded-xl text-center">
                Book One-to-One Session
              </button>
              <button className="w-full py-2 bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 transition-colors text-[10px] font-bold text-purple-650 rounded-xl text-center">
                Ask a Placement Doubt
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Placement history table section */}
      <section className="space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 uppercase">🏆 Placement History</h2>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 overflow-hidden text-xs">
          <table className="w-full text-left text-slate-700">
            <thead className="bg-white border-b border-slate-950 text-slate-650 uppercase text-[9px] font-bold">
              <tr>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/60">
              {placementHistory.map((history) => (
                <tr key={history.company} className="hover:bg-white/10 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{history.company}</td>
                  <td className="px-6 py-4">{history.role}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider ${history.color}`}>
                      {history.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};

export default Placements;
