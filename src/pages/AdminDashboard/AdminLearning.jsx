import React from 'react';

const AdminLearning = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[28px] font-extrabold tracking-tight">Learning Management</h2>
        <p className="text-sm text-slate-500 mt-1">Manage courses, lessons, and learning content.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <div className="text-2xl font-extrabold text-purple-600">156</div>
          <div className="text-sm text-slate-500">Total Courses</div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <div className="text-2xl font-extrabold text-purple-600">1,245</div>
          <div className="text-sm text-slate-500">Lessons</div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <div className="text-2xl font-extrabold text-purple-600">87%</div>
          <div className="text-sm text-slate-500">Completion Rate</div>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <p className="text-center text-sm text-slate-400 py-8">
          Learning management features coming soon
        </p>
      </div>
    </div>
  );
};

export default AdminLearning;