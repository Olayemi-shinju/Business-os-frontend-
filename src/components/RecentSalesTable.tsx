import React from 'react';
import { FiArrowUpRight } from "react-icons/fi";

const mockRecentSales = [
  { id: 'TX-8943', createdAt: '10 mins ago', paymentMethod: 'CASH', total: 25000 },
  { id: 'TX-8942', createdAt: '45 mins ago', paymentMethod: 'TRANSFER', total: 142000 },
  { id: 'TX-8941', createdAt: '2 hours ago', paymentMethod: 'CASH', total: 8500 },
  { id: 'TX-8940', createdAt: '4 hours ago', paymentMethod: 'TRANSFER', total: 63000 },
  { id: 'TX-8939', createdAt: 'Yesterday', paymentMethod: 'TRANSFER', total: 12500 },
];

export default function RecentSalesTable() {
  return (
    <div className="w-full bg-white border border-slate-100 rounded-xl shadow-sm p-5">
      
     
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-800">Recent Transactions</h3>
          <p className="text-xs text-slate-400">Latest checkout history from your counter</p>
        </div>
        <button className="flex items-center gap-1 text-xs font-semibold text-purple-700 hover:text-purple-900 transition-colors cursor-pointer">
          View all <FiArrowUpRight />
        </button>
      </div>

     
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-left">
          
        
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 pl-2">Receipt ID</th>
              <th className="pb-3">Time Passed</th>
              <th className="pb-3">Payment Method</th>
              <th className="pb-3 pr-2 text-right">Total Amount</th>
            </tr>
          </thead>

       
          <tbody className="divide-y divide-slate-50">
            {mockRecentSales.map((sale) => (
              <tr key={sale.id} className="hover:bg-slate-50/50 transition-colors group">
                
                <td className="py-3 pl-2 text-sm font-medium text-purple-900">
                  #{sale.id}
                </td>
            
                <td className="py-3 text-sm text-slate-500 font-normal">
                  {sale.createdAt}
                </td>
                
               
                <td className="py-3 text-sm">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold ${
                    sale.paymentMethod === 'CASH' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50' 
                      : 'bg-blue-50 text-blue-700 border border-blue-200/50'
                  }`}>
                    {sale.paymentMethod === 'CASH' ? 'CASH' : 'TRANSFER'}
                  </span>
                </td>
                
              
                <td className="py-3 pr-2 text-sm font-bold text-slate-800 text-right">
                  ₦{sale.total.toLocaleString()}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}
