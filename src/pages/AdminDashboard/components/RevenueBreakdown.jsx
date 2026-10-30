import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#6d28d9', '#a78bfa', '#ddd6fe'];

const RevenueBreakdown = ({ data }) => {
  // If data is empty, show empty state
  if (!data || data.length === 0) {
    return (
      <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">
        <h3 className="text-[17px] font-extrabold mb-5">Revenue Breakdown</h3>
        <div className="flex flex-col items-center justify-center h-[300px]">
          <p className="text-slate-400 text-sm">No revenue data available</p>
        </div>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">
      <h3 className="text-[17px] font-extrabold mb-5">Revenue Breakdown</h3>
      <div className="flex flex-col items-center">
        <div className="h-[200px] w-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${Math.round((value / total) * 100)}%`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #eef0f7',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  fontSize: '13px'
                }}
              />

            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full mt-4 flex flex-col gap-3">
          {data.map((item, index) => {
            const percentage = Math.round((item.value / total) * 100);
            return (
              <div
                key={item.name}
                className="flex items-center justify-between text-[13.5px] font-semibold"
              >
                <span className="flex items-center gap-2.5">
                  <i
                    className="w-2.5 h-2.5 rounded-[3px] inline-block"
                    style={{ background: COLORS[index % COLORS.length] }}
                  />
                  {item.name}
                </span>
                <span className="text-slate-500 font-bold">{percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { RevenueBreakdown };