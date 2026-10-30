import React from 'react';
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const EnrollmentChart = ({ data }) => {
  const months = data.map(d => d.month);
  const newEnrollments = data.map(d => d.newEnrollments);
  const completed = data.map(d => d.completed);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-lg">
          <p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h3 className="text-[17px] font-extrabold">Enrollment Trends</h3>
        <div className="flex gap-4 text-[12.5px] font-semibold text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <i className="w-2 h-2 rounded-full bg-purple-600 inline-block" />
            New
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="w-2 h-2 rounded-full bg-purple-200 inline-block" />
            Completed
          </span>
        </div>
      </div>

      <div className="h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef0f7" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12, fontWeight: 600, color: '#94a3b8' }}
              iconType="circle"
            />
            <defs>
              <linearGradient id="enrollmentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="newEnrollments"
              stroke="#7c3aed"
              strokeWidth={3}
              fill="url(#enrollmentGradient)"
              name="New"
              dot={{ r: 4.5, fill: '#fff', stroke: '#7c3aed', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#c7bce8"
              strokeWidth={2.5}
              strokeDasharray="6 5"
              name="Completed"
              dot={{ r: 4, fill: '#fff', stroke: '#c7bce8', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EnrollmentChart;