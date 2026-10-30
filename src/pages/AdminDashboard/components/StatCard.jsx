import React from 'react';
import {
  Users,
  ClipboardCheck,
  ClipboardList,
  Wallet,
  GraduationCap
} from 'lucide-react';

const iconMap = {
  Users,
  ClipboardCheck,
  ClipboardList,
  Wallet,
  GraduationCap
};

const StatCard = ({ label, value, change, icon }) => {
  const Icon = iconMap[icon] || Users;
  const isPositive = change.startsWith('+');

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-5">
        <div className="w-[38px] h-[38px] rounded-xl bg-purple-100 flex items-center justify-center">
          <Icon className="w-[19px] h-[19px] text-purple-600" />
        </div>
        <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full ${
          isPositive ? 'text-emerald-500 bg-emerald-50' : 'text-rose-500 bg-rose-50'
        }`}>
          <span>{change}</span>
        </div>
      </div>
      <div className="text-[13px] text-slate-500 font-semibold mb-1">{label}</div>
      <div className="text-2xl font-extrabold tracking-tight">{value}</div>
    </div>
  );
};

export default StatCard;