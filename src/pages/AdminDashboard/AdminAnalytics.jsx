import React from 'react';

const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[28px] font-extrabold tracking-tight">Analytics</h2>
        <p className="text-sm text-slate-500 mt-1">View platform analytics and insights.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <div className="text-xs text-slate-500 mb-1">Total Visitors</div>
          <div className="text-2xl font-extrabold">45,890</div>
          <div className="text-xs text-green-500 mt-1">↑ +23%</div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <div className="text-xs text-slate-500 mb-1">Avg Session Duration</div>
          <div className="text-2xl font-extrabold">12m 34s</div>
          <div className="text-xs text-green-500 mt-1">↑ +8%</div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <div className="text-xs text-slate-500 mb-1">Bounce Rate</div>
          <div className="text-2xl font-extrabold">34%</div>
          <div className="text-xs text-green-500 mt-1">↓ -5%</div>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <p className="text-center text-sm text-slate-400 py-8">
          Detailed analytics coming soon
        </p>
      </div>
    </div>
  );
};

export default AdminAnalytics;