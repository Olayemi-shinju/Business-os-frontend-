import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const topProductsData = [
  { name: 'Product A', sold: 120 },
  { name: 'Product B', sold: 95 },
  { name: 'Product C', sold: 73 },
  { name: 'Product D', sold: 51 },
  { name: 'Product E', sold: 40 },
];

export default function TopProductsChart() {
  return (
    <div className="w-full bg-white border border-slate-100 rounded-xl shadow-sm p-5">
      <div className="mb-6">
        <h3 className="text-base font-bold text-slate-800">Top Selling Products</h3>
        <p className="text-xs text-slate-400">Highest performing product variants by units sold</p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
         
          <BarChart data={topProductsData} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
            
            
            <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis dataKey="name" type="category" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
            
            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
            
          
            <Bar 
              dataKey="sold" 
              fill="#7e22ce" 
              radius={[0, 4, 4, 0]} 
              barSize={16} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
