import React, { useMemo, useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  UserPlus,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Shield,
} from 'lucide-react';

const seedAdmins = [
  { id: 1, name: 'Nadia Smith', email: 'nadia.smith@swordnex.edu', role: 'Super Admin', permissions: 'All Access', status: 'Active', lastLogin: '5 minutes ago' },
  { id: 2, name: 'Ritika Sen', email: 'ritika.sen@swordnex.edu', role: 'Admin', permissions: 'Users, Learning', status: 'Active', lastLogin: '24 minutes ago' },
  { id: 3, name: 'Amit Verma', email: 'amit.v@swordnex.edu', role: 'Admin', permissions: 'Finance, Reports', status: 'Inactive', lastLogin: 'Oct 15' },
];

const Admins = () => {
  const [admins] = useState(seedAdmins);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAdmins = useMemo(() => {
    return admins.filter((admin) => {
      const haystack = `${admin.name} ${admin.email} ${admin.role} ${admin.permissions}`.toLowerCase();
      const matchesSearch = haystack.includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All Status' || admin.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [admins, searchTerm, statusFilter]);

  const stats = [
    { label: 'Total Admins', value: '24', change: '+2%', icon: Users },
    { label: 'Active Admins', value: '19', change: '+3%', icon: Shield },
    { label: 'Inactive Admins', value: '5', change: '-1%', icon: Users },
    { label: 'Super Admins', value: '3', change: '+1%', icon: TrendingUp },
  ];

  return (
    <div className="text-slate-900">
      <div className="space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-[28px] font-extrabold tracking-tight">Admin Management</h2>
            <p className="text-sm text-slate-500 mt-1">Manage administrative staff, roles, and access control.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/50 transition-shadow">
            <UserPlus className="w-4 h-4" /> Add Admin
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const StatIcon = stat.icon;
            return (
              <div key={stat.label} className="bg-white border border-slate-100 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-[38px] h-[38px] rounded-xl bg-purple-100 flex items-center justify-center">
                    <StatIcon className="w-[19px] h-[19px] text-purple-650" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
                    <TrendingUp className="w-[11px] h-[11px]" /> {stat.change}
                  </div>
                </div>
                <div className="text-[13px] text-slate-500 font-semibold mb-1">{stat.label}</div>
                <div className="text-2xl font-extrabold tracking-tight">{stat.value}</div>
              </div>
            );
          })}
        </div>

        <section className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex flex-wrap gap-3">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600">
                <option value="All Status">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-purple-100 min-w-[230px]" placeholder="Search admins" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50">
                <Download className="w-4 h-4" /> Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-slate-400 font-bold border-b border-slate-100">
                  <th className="pb-3 px-2">Admin Name</th>
                  <th className="pb-3 px-2">Email</th>
                  <th className="pb-3 px-2">Role</th>
                  <th className="pb-3 px-2">Permissions</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2">Last Login</th>
                  <th className="pb-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmins.map((admin) => (
                  <tr key={admin.id} className="border-t border-slate-100">
                    <td className="py-4 px-2 text-[13px] font-extrabold text-slate-900">{admin.name}</td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{admin.email}</td>
                    <td className="py-4 px-2 text-[13px] font-bold text-slate-600">{admin.role}</td>
                    <td className="py-4 px-2 text-[13px] font-bold text-slate-600">{admin.permissions}</td>
                    <td className="py-4 px-2">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${admin.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-slate-500'}`}>{admin.status}</span>
                    </td>
                    <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{admin.lastLogin}</td>
                    <td className="py-4 px-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-650 transition"><Eye className="w-4 h-4" /></button>
                        <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-650 transition"><Pencil className="w-4 h-4" /></button>
                        <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-5">
            <div className="text-[12px] font-semibold text-slate-500">Showing 1 to {Math.min(filteredAdmins.length, 4)} of {filteredAdmins.length} entries</div>
            <div className="flex items-center gap-2">
              <button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"><span className="inline-flex items-center gap-1"><ChevronLeft className="w-4 h-4" /> Previous</span></button>
              <button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold bg-purple-650 text-white">1</button>
              <button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold border border-slate-200 bg-white text-slate-600">2</button>
              <button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold border border-slate-200 bg-white text-slate-600">...</button>
              <button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"><span className="inline-flex items-center gap-1">Next <ChevronRight className="w-4 h-4" /></span></button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admins;
