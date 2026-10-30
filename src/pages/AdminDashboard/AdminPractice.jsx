import React from 'react';

const AdminPractice = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[28px] font-extrabold tracking-tight">Practice Management</h2>
        <p className="text-sm text-slate-500 mt-1">Manage quizzes, assessments, and practice exercises.</p>
      </div>
      
      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Practice Exercises</h3>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors">
            Create New Exercise
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-slate-400 font-bold border-b border-slate-100">
                <th className="pb-3 px-2">Title</th>
                <th className="pb-3 px-2">Type</th>
                <th className="pb-3 px-2">Difficulty</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" className="py-8 text-center text-sm text-slate-400">
                  Practice management coming soon
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPractice;