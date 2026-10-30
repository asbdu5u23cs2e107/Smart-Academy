import React from 'react';
import { Users, Shield, Plus, Edit, Trash2, Check, X } from 'lucide-react';

const roleRows = [
  { name: 'Super Admin', users: 3, description: 'Full platform access and global management.', status: 'Active' },
  { name: 'Admin', users: 8, description: 'Admin access for operational management.', status: 'Active' },
  { name: 'Trainer', users: 345, description: 'Can teach courses and manage assigned classes.', status: 'Active' },
  { name: 'Student', users: 12000, description: 'Learner access to course, project, and practice hubs.', status: 'Active' },
];

const matrix = [
  { feature: 'Students', view: true, create: true, edit: true, delete: true },
  { feature: 'Trainers', view: true, create: true, edit: true, delete: true },
  { feature: 'Courses', view: true, create: true, edit: true, delete: true },
  { feature: 'Reports', view: true, create: false, edit: false, delete: false },
  { feature: 'Users', view: true, create: true, edit: true, delete: true },
];

const RolesPermissions = () => {
  return (
    <div className="text-slate-900">
      <div className="space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-[28px] font-extrabold tracking-tight">Roles & Permissions</h2>
            <p className="text-sm text-slate-500 mt-1">Manage user roles, privileges, and admin access policies.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/50 transition-shadow">
            <Plus className="w-4 h-4" /> Create Role
          </button>
        </div>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {roleRows.map((role) => (
            <div key={role.name} className="bg-white border border-slate-100 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-[38px] h-[38px] rounded-xl bg-purple-100 flex items-center justify-center">
                  <Shield className="w-[19px] h-[19px] text-purple-650" />
                </div>
                <span className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">{role.status}</span>
              </div>
              <div className="text-[13px] text-slate-500 font-semibold mb-1">{role.name}</div>
              <div className="text-2xl font-extrabold tracking-tight">{role.users.toLocaleString()}</div>
              <div className="text-[12px] font-semibold text-slate-500 mt-2">{role.description}</div>
            </div>
          ))}
        </section>

        <section className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <h3 className="text-[17px] font-extrabold">Permissions Matrix</h3>
              <p className="text-sm text-slate-500 mt-1">Control feature visibility and CRUD access by role.</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50">
              <Plus className="w-4 h-4" /> Manage Permissions
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-slate-400 font-bold border-b border-slate-100">
                  <th className="pb-3 px-2">Module</th>
                  <th className="pb-3 px-2 text-center">View</th>
                  <th className="pb-3 px-2 text-center">Create</th>
                  <th className="pb-3 px-2 text-center">Edit</th>
                  <th className="pb-3 px-2 text-center">Delete</th>
                  <th className="pb-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map((row) => (
                  <tr key={row.feature} className="border-t border-slate-100">
                    <td className="py-4 px-2 text-[13px] font-extrabold text-slate-900">{row.feature}</td>
                    <td className="py-4 px-2 text-center"><span className="inline-flex justify-center items-center rounded-full bg-emerald-50 text-emerald-600 h-7 w-7"><Check className="w-4 h-4" /></span></td>
                    <td className="py-4 px-2 text-center">{row.create ? <span className="inline-flex justify-center items-center rounded-full bg-emerald-50 text-emerald-600 h-7 w-7"><Check className="w-4 h-4" /></span> : <span className="inline-flex justify-center items-center rounded-full bg-slate-100 text-slate-500 h-7 w-7"><X className="w-4 h-4" /></span>}</td>
                    <td className="py-4 px-2 text-center">{row.edit ? <span className="inline-flex justify-center items-center rounded-full bg-emerald-50 text-emerald-600 h-7 w-7"><Check className="w-4 h-4" /></span> : <span className="inline-flex justify-center items-center rounded-full bg-slate-100 text-slate-500 h-7 w-7"><X className="w-4 h-4" /></span>}</td>
                    <td className="py-4 px-2 text-center">{row.delete ? <span className="inline-flex justify-center items-center rounded-full bg-emerald-50 text-emerald-600 h-7 w-7"><Check className="w-4 h-4" /></span> : <span className="inline-flex justify-center items-center rounded-full bg-slate-100 text-slate-500 h-7 w-7"><X className="w-4 h-4" /></span>}</td>
                    <td className="py-4 px-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-650 transition"><Plus className="w-4 h-4" /></button>
                        <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-650 transition"><Edit className="w-4 h-4" /></button>
                        <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RolesPermissions;
