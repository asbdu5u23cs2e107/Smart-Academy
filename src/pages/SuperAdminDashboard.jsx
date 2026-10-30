import React, { useState } from 'react';
import { 
  School, Users, BookOpen, ShieldCheck, Activity, BarChart3, 
  Settings, UserPlus, ShieldAlert, Plus, Trash2, Key, Database,
  Settings2, Mail, Award, RotateCcw, ShieldCheckIcon 
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const [activeSubView, setActiveSubView] = useState('summary');

  // Academies list state
  const [academies, setAcademies] = useState([
    { name: 'SwordNex Chennai', location: 'Chennai, TN', admins: '2', status: 'Active' },
    { name: 'SwordNex Bangalore', location: 'Bangalore, KA', admins: '1', status: 'Active' }
  ]);
  const [newAcademyName, setNewAcademyName] = useState('');
  const [newAcademyLoc, setNewAcademyLoc] = useState('');

  // Admins state
  const [admins, setAdmins] = useState([
    { name: 'Sarah Connor', academy: 'SwordNex Chennai', email: 'sarah@swordnex.com' },
    { name: 'Alex Mercer', academy: 'SwordNex Bangalore', email: 'alex@swordnex.com' }
  ]);
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');

  const handleAddAcademy = (e) => {
    e.preventDefault();
    if (!newAcademyName.trim()) return;
    setAcademies([...academies, { name: newAcademyName, location: newAcademyLoc || 'Global', admins: '0', status: 'Active' }]);
    setNewAcademyName('');
    setNewAcademyLoc('');
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    if (!newAdminName.trim() || !newAdminEmail.trim()) return;
    setAdmins([...admins, { name: newAdminName, academy: 'SwordNex Chennai', email: newAdminEmail }]);
    setNewAdminName('');
    setNewAdminEmail('');
  };

  const stats = [
    { label: 'Total Academies', value: '4', icon: <School className="w-5 h-5 text-purple-650" /> },
    { label: 'Total Admins', value: '8', icon: <ShieldCheck className="w-5 h-5 text-purple-650" /> },
    { label: 'Total Students', value: '5,420', icon: <Users className="w-5 h-5 text-purple-650" /> },
    { label: 'Total Trainers', value: '50+', icon: <Users className="w-5 h-5 text-emerald-400" /> },
    { label: 'Live Classes', value: '8 Active', icon: <Activity className="w-5 h-5 text-rose-500 animate-pulse" /> },
    { label: 'AI Alerts Logged', value: '18', icon: <ShieldAlert className="w-5 h-5 text-amber-500" /> }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
        <div>
          <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider border border-rose-500/20 px-2 py-0.5 rounded-full bg-rose-500/5">Network Administration</span>
          <h1 className="text-xl font-bold text-slate-900 uppercase mt-1">SUPER ADMIN PANEL</h1>
          <p className="text-xs text-slate-500">Configure global parameters, manage regional academies, and audit server warnings</p>
        </div>

        {/* Workspace navigation subtabs */}
        <div className="flex flex-wrap gap-1 bg-slate-50 p-1 border border-slate-100 rounded-xl">
          {[
            { id: 'summary', label: 'Overview' },
            { id: 'academies', label: 'Academies' },
            { id: 'admins', label: 'Admins' },
            { id: 'settings', label: 'Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubView(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold transition-all ${
                activeSubView === tab.id 
                  ? 'bg-white text-rose-450 border border-slate-200' 
                  : 'text-slate-500 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main content viewport */}
      {activeSubView === 'summary' && (
        <div className="space-y-8">
          
          {/* Stats counters grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {stats.map((item) => (
              <div key={item.label} className="p-4 rounded-2xl bg-white/40 border border-slate-100 text-center space-y-2">
                <div className="mx-auto h-9 w-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-[10px] text-slate-500 block leading-tight">{item.label}</span>
                <span className="text-base font-black text-white mt-1 block">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* AI Warning tracker */}
            <div className="p-6 rounded-3xl bg-white/40 border border-slate-100 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-100 pb-2">AI MONITORING SUMMARY</h3>
              <ul className="space-y-3.5 text-xs text-slate-700">
                {[
                  { alert: 'Student Mobile Usage', count: '6 flags logged today' },
                  { alert: 'Student Left Camera', count: '4 flags logged today' },
                  { alert: 'Trainer Missing', count: '0 flags logged today (Good)' },
                  { alert: 'Suspicious Activities', count: '2 flags logged today' }
                ].map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center p-3 rounded-xl bg-slate-50/40 border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-900 uppercase">{item.alert}</p>
                      <p className="text-[10px] text-slate-500 mt-1">{item.count}</p>
                    </div>
                    <button className="text-purple-650 font-semibold">[View All Alerts]</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Super Admin Reports lists */}
            <div className="p-6 rounded-3xl bg-white/40 border border-slate-100 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-100 pb-2">REPORTS DIRECTORY</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {['Student Report', 'Trainer Report', 'Attendance Report', 'Revenue Report', 'AI Analytics'].map((rep) => (
                  <li key={rep} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center hover:border-slate-200 transition-colors">
                    <span className="font-semibold text-slate-700">{rep}</span>
                    <BarChart3 className="w-4 h-4 text-purple-650" />
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      )}

      {/* Academies management list */}
      {activeSubView === 'academies' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-650 border-b border-slate-200 pb-2">➕ Add Academy</h3>
            <form onSubmit={handleAddAcademy} className="flex flex-col sm:flex-row gap-3 text-xs">
              <input 
                type="text" 
                required 
                placeholder="Academy Branch Name"
                value={newAcademyName}
                onChange={(e) => setNewAcademyName(e.target.value)}
                className="rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2 text-slate-800"
              />
              <input 
                type="text" 
                placeholder="Location (e.g. Pune, MH)"
                value={newAcademyLoc}
                onChange={(e) => setNewAcademyLoc(e.target.value)}
                className="rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2 text-slate-800"
              />
              <button type="submit" className="btn-primary py-2 px-5 text-xs">Add Academy</button>
            </form>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 overflow-hidden text-xs">
            <table className="w-full text-left text-slate-700">
              <thead className="bg-white border-b border-slate-950 text-slate-650 text-[10px] font-bold uppercase">
                <tr>
                  <th className="px-5 py-3">Academy Branch</th>
                  <th className="px-5 py-3">Location</th>
                  <th className="px-5 py-3">Admins Assigned</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/60">
                {academies.map((ac, idx) => (
                  <tr key={idx} className="hover:bg-white/10">
                    <td className="px-5 py-3 font-semibold text-slate-900">🏢 {ac.name}</td>
                    <td className="px-5 py-3 text-slate-650">{ac.location}</td>
                    <td className="px-5 py-3 font-mono">{ac.admins}</td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-0.5 rounded text-[8px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-200">{ac.status}</span>
                    </td>
                    <td className="px-5 py-3 text-right text-slate-500 font-bold space-x-2">
                      <button className="hover:text-white transition-colors">[Update]</button>
                      <button className="text-rose-400 hover:text-rose-350 transition-colors">[Delete]</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Admin accounts management */}
      {activeSubView === 'admins' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-650 border-b border-slate-200 pb-2">➕ Create Admin Account</h3>
            <form onSubmit={handleAddAdmin} className="flex flex-col sm:flex-row gap-3 text-xs">
              <input 
                type="text" 
                required 
                placeholder="Admin Name"
                value={newAdminName}
                onChange={(e) => setNewAdminName(e.target.value)}
                className="rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2 text-slate-800"
              />
              <input 
                type="email" 
                required 
                placeholder="admin@swordnex.com"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                className="rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2 text-slate-800"
              />
              <button type="submit" className="btn-primary py-2 px-5 text-xs">Create Admin</button>
            </form>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 overflow-hidden text-xs">
            <table className="w-full text-left text-slate-700">
              <thead className="bg-white border-b border-slate-950 text-slate-650 text-[10px] font-bold uppercase">
                <tr>
                  <th className="px-5 py-3">Admin Name</th>
                  <th className="px-5 py-3">Email Address</th>
                  <th className="px-5 py-3">Assigned Academy</th>
                  <th className="px-5 py-3 text-right">Credentials</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/60">
                {admins.map((ad, idx) => (
                  <tr key={idx} className="hover:bg-white/10">
                    <td className="px-5 py-3 font-semibold text-slate-900">👤 {ad.name}</td>
                    <td className="px-5 py-3 text-slate-650">{ad.email}</td>
                    <td className="px-5 py-3 text-purple-650 font-semibold">{ad.academy}</td>
                    <td className="px-5 py-3 text-right">
                      <button className="px-3 py-1 rounded-lg bg-slate-905 border border-slate-200 text-[9px] font-bold text-purple-650 flex items-center gap-1.5 ml-auto hover:text-white transition-colors">
                        <Key className="w-3.5 h-3.5" />
                        <span>Reset Password</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* System configuration settings */}
      {activeSubView === 'settings' && (
        <div className="p-6 rounded-3xl bg-white/40 border border-slate-100 space-y-6 text-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-100 pb-2">SYSTEM SETTINGS</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Roles & Permissions', desc: 'Define administrator, trainer and student actions schema.', icon: <Settings2 className="w-5 h-5 text-purple-650" /> },
              { title: 'Course Categories', desc: 'Configure search catalog grouping taxonomies.', icon: <BookOpen className="w-5 h-5 text-purple-650" /> },
              { title: 'Certificate Template', desc: 'Upload signature assets and edit credentials layouts.', icon: <Award className="w-5 h-5 text-purple-650" /> },
              { title: 'Backup & Restore', desc: 'Secure database snapshot configurations and archives.', icon: <RotateCcw className="w-5 h-5 text-emerald-400" /> },
              { title: 'Email Settings', desc: 'Manage SMTP nodes and automated notification alerts.', icon: <Mail className="w-5 h-5 text-rose-500" /> }
            ].map((set, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  {set.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 uppercase">{set.title}</h4>
                  <p className="text-[10px] text-slate-500 leading-normal">{set.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default SuperAdminDashboard;
