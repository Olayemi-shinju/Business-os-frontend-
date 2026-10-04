import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data7Days = [
  { label: 'Mon', revenue: 1200 },
  { label: 'Tue', revenue: 1900 },
  { label: 'Wed', revenue: 1500 },
  { label: 'Thu', revenue: 2200 },
  { label: 'Fri', revenue: 3100 },
  { label: 'Sat', revenue: 4600 },
  { label: 'Sun', revenue: 3800 },
];

const data30Days = [
  { label: 'Week 1', revenue: 14200 },
  { label: 'Week 2', revenue: 18500 },
  { label: 'Week 3', revenue: 12100 },
  { label: 'Week 4', revenue: 21400 },
];

export default function SalesOverviewChart() {
  const [timeframe, setTimeframe] = useState<'7d' | '30d'>('7d');

  const activeData = timeframe === '7d' ? data7Days : data30Days;

  return (
    <div className="w-full bg-white border border-slate-100 rounded-xl shadow-sm p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-800">Sales Overview</h3>
          <p className="text-xs text-slate-400">Track and monitor your store revenue metrics over time</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setTimeframe('7d')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              timeframe === '7d' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeframe('30d')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              timeframe === '30d' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            30 Days
          </button>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="label" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#7e22ce" 
              fillOpacity={0.1} 
              fill="#7e22ce" 
              strokeWidth={2} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
