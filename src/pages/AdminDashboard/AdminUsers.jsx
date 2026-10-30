import React, { useMemo, useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Download,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  UserCheck,
  GraduationCap,
  X,
} from 'lucide-react';

const seedUsers = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    role: 'Student',
    status: 'Active',
    lastLogin: '2 hours ago',
  },
  {
    id: 2,
    name: 'Dr. Marcus Webb',
    email: 'm.webb@swordnex.edu',
    role: 'Instructor',
    status: 'Active',
    lastLogin: 'Today',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    email: 'elena.r@example.com',
    role: 'Student',
    status: 'Inactive',
    lastLogin: 'Oct 12',
  },
  {
    id: 4,
    name: 'Jamal Peterson',
    email: 'j.peterson@example.com',
    role: 'Student',
    status: 'Active',
    lastLogin: '1 day ago',
  },
  {
    id: 5,
    name: 'Nadia Smith',
    email: 'nadia.smith@swordnex.edu',
    role: 'Admin',
    status: 'Active',
    lastLogin: '5 minutes ago',
  },
  {
    id: 6,
    name: 'Thomas Moore',
    email: 'thomas.moore@example.com',
    role: 'Instructor',
    status: 'Inactive',
    lastLogin: 'Sep 29',
  },
];

const activitySeed = [
  { id: 1, title: 'Sarah Jenkins logged in', time: '2 minutes ago', type: 'login' },
  { id: 2, title: 'Marcus Webb updated profile', time: '14 minutes ago', type: 'profile' },
  { id: 3, title: 'Elena Rodriguez account created', time: '1 hour ago', type: 'create' },
  { id: 4, title: 'Jamal Peterson changed password', time: '2 hours ago', type: 'security' },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(seedUsers);
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const [draft, setDraft] = useState({
    name: '',
    email: '',
    role: 'Student',
    status: 'Active',
  });

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = `${user.name} ${user.email} ${user.role}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'All Status' || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [roleFilter, searchTerm, statusFilter, users]);

  const pageCount = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const stats = [
    {
      label: 'Total Users',
      value: '15,420',
      change: '+12%',
      icon: Users,
    },
    {
      label: 'Active Students',
      value: '12,150',
      change: '+8%',
      icon: UserCheck,
    },
    {
      label: 'Instructors',
      value: '345',
      change: '+15%',
      icon: GraduationCap,
    },
    {
      label: 'Inactive Users',
      value: '2,925',
      change: '-3%',
      icon: Users,
    },
  ];

  const addUser = (event) => {
    event.preventDefault();

    if (!draft.name.trim() || !draft.email.trim()) {
      return;
    }

    const newUser = {
      id: Date.now(),
      name: draft.name.trim(),
      email: draft.email.trim(),
      role: draft.role,
      status: draft.status,
      lastLogin: 'Just now',
    };

    setUsers((current) => [newUser, ...current]);
    setDraft({ name: '', email: '', role: 'Student', status: 'Active' });
    setShowAddForm(false);
    setCurrentPage(1);
  };

  const deleteUser = (id) => {
    setUsers((current) => current.filter((user) => user.id !== id));
  };

  const exportCsv = () => {
    const header = 'Name,Email,Role,Status,Last Login';
    const rows = users.map(
      (user) => `${user.name},${user.email},${user.role},${user.status},${user.lastLogin}`
    );

    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'users.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="text-slate-900">
      <div className="space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-[28px] font-extrabold tracking-tight">User Management</h2>
            <p className="text-sm text-slate-500 mt-1">
              Manage students, instructors, and administrative staff.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowAddForm((value) => !value)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/50 transition-shadow"
            >
              <UserPlus className="w-4 h-4" />
              Add User
            </button>
          </div>
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
                    <TrendingUp className="w-[11px] h-[11px]" />
                    {stat.change}
                  </div>
                </div>

                <div className="text-[13px] text-slate-500 font-semibold mb-1">
                  {stat.label}
                </div>

                <div className="text-2xl font-extrabold tracking-tight">
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>

        <section className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex flex-wrap gap-3">
              <select
                value={roleFilter}
                onChange={(event) => {
                  setRoleFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600"
              >
                <option value="All Roles">All Roles</option>
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
                <option value="Admin">Admin</option>
              </select>

              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600"
              >
                <option value="All Status">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    setCurrentPage(1);
                  }}
                  className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-purple-100 min-w-[230px]"
                  placeholder="Search users"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>

              <button
                type="button"
                onClick={exportCsv}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {showAddForm && (
            <form onSubmit={addUser} className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <input
                required
                value={draft.name}
                onChange={(event) => setDraft({ ...draft, name: event.target.value })}
                placeholder="Name"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              />
              <input
                required
                value={draft.email}
                onChange={(event) => setDraft({ ...draft, email: event.target.value })}
                placeholder="Email"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              />
              <select
                value={draft.role}
                onChange={(event) => setDraft({ ...draft, role: event.target.value })}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              >
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
                <option value="Admin">Admin</option>
              </select>
              <select
                value={draft.status}
                onChange={(event) => setDraft({ ...draft, status: event.target.value })}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="flex gap-2">
                <button type="submit" className="rounded-xl bg-purple-650 px-4 py-2 text-sm font-bold text-white">
                  Save
                </button>
                <button type="button" onClick={() => setShowAddForm(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-slate-400 font-bold border-b border-slate-100">
                  <th className="pb-3 px-2">User</th>
                  <th className="pb-3 px-2">Role</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2">Last Login</th>
                  <th className="pb-3 px-2 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => (
                    <tr key={user.id} className="border-t border-slate-100">
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-[11px] font-extrabold">
                            {user.name.split(' ').map((piece) => piece[0]).slice(0, 2).join('')}
                          </div>
                          <div>
                            <div className="text-[13.5px] font-extrabold text-slate-900">
                              {user.name}
                            </div>
                            <div className="text-[12px] font-semibold text-slate-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-2 text-[13px] font-bold text-slate-600">
                        {user.role}
                      </td>

                      <td className="py-4 px-2">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${user.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-rose-50 text-slate-500'} `}>
                          {user.status}
                        </span>
                      </td>

                      <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">
                        {user.lastLogin}
                      </td>

                      <td className="py-4 px-2 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-650 transition">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-650 transition">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteUser(user.id)}
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-10 text-center text-sm text-slate-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-5">
            <div className="text-[12px] font-semibold text-slate-500">
              Showing {filteredUsers.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, filteredUsers.length)} of {filteredUsers.length} entries
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((value) => Math.max(value - 1, 1))}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 disabled:opacity-50"
              >
                <span className="inline-flex items-center gap-1">
                  <ChevronLeft className="w-4 h-4" /> Previous
                </span>
              </button>

              {Array.from({ length: pageCount }).map((_, index) => (
                <button
                  key={index + 1}
                  type="button"
                  onClick={() => setCurrentPage(index + 1)}
                  className={`h-8 min-w-8 rounded-xl px-3 text-sm font-bold ${currentPage === index + 1
                    ? 'bg-purple-650 text-white'
                    : 'border border-slate-200 bg-white text-slate-600'}`}
                >
                  {index + 1}
                </button>
              ))}

              {pageCount > 3 && (
                <span className="text-slate-500 text-sm font-bold">...</span>
              )}

              <button
                type="button"
                disabled={currentPage === pageCount}
                onClick={() => setCurrentPage((value) => Math.min(value + 1, pageCount))}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 disabled:opacity-50"
              >
                <span className="inline-flex items-center gap-1">
                  Next <ChevronRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">
          <h3 className="text-[17px] font-extrabold mb-4">Recent User Activity</h3>
          <div className="space-y-3">
            {activitySeed.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 border-b border-slate-100 pb-3 last:border-none last:pb-0">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-purple-650" />
                <div>
                  <p className="text-[13.5px] font-semibold text-slate-700">{activity.title}</p>
                  <span className="text-xs text-slate-400">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminUsers;