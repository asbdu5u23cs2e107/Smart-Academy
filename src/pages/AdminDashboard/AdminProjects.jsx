import React from 'react';

const AdminProjects = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[28px] font-extrabold tracking-tight">Projects</h2>
        <p className="text-sm text-slate-500 mt-1">Manage student projects and assignments.</p>
      </div>
      
      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">All Projects</h3>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors">
            Create Project
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-slate-100 rounded-xl p-4">
            <h4 className="font-bold text-sm">E-Commerce Website</h4>
            <p className="text-xs text-slate-500 mt-1">12 students working</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">In Progress</span>
              <span className="text-xs text-slate-400">Due: Dec 15</span>
            </div>
          </div>
          <div className="border border-slate-100 rounded-xl p-4">
            <h4 className="font-bold text-sm">Portfolio Builder</h4>
            <p className="text-xs text-slate-500 mt-1">8 students working</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-yellow-50 text-yellow-600 rounded-full">Pending</span>
              <span className="text-xs text-slate-400">Due: Dec 20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;
