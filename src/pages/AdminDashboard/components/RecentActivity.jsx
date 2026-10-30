import React from 'react';
import { UserPlus, GraduationCap, CreditCard, CheckCircle, Briefcase } from 'lucide-react';

const activityIcons = {
  registration: UserPlus,
  enrollment: GraduationCap,
  payment: CreditCard,
  completion: CheckCircle,
  placement: Briefcase
};

const getActivityIcon = (type) => {
  const Icon = activityIcons[type] || UserPlus;
  return <Icon className="w-4 h-4 text-white" />;
};

const RecentActivity = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">
        <h3 className="text-[17px] font-extrabold mb-1">Recent Activity</h3>
        <div className="py-8 text-center text-sm text-slate-400">
          No recent activity
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">
      <h3 className="text-[17px] font-extrabold mb-1">Recent Activity</h3>
      <div>
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3 py-3.5 border-b border-slate-100 last:border-none">
            <div className={`w-[32px] h-[32px] rounded-lg flex items-center justify-center shrink-0 ${
              activity.color || 'bg-purple-100'
            }`}>
              {getActivityIcon(activity.type)}
            </div>
            <div>
              <p className="text-[13.5px] font-semibold leading-snug">
                {activity.description}
              </p>
              <div className="text-xs text-slate-400 mt-0.5">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;