import React from 'react';
import { FiAlertTriangle } from "react-icons/fi";

const mockLowStockItems = [
  { id: 'var-1', productName: 'Premium Shoe', variantName: 'Black / 42', quantity: 2, reorderLevel: 5 },
  { id: 'var-2', productName: 'iPhone 15 Pro', variantName: '128GB / Natural', quantity: 1, reorderLevel: 3 },
  { id: 'var-3', productName: 'Designer T-Shirt', variantName: 'White / L', quantity: 0, reorderLevel: 10 },
  { id: 'var-4', productName: 'Wireless Earbuds', variantName: 'Pro Edition', quantity: 3, reorderLevel: 8 },
];

export default function LowStockTable() {
  return (
    <div className="w-full bg-white border border-slate-100 rounded-xl shadow-sm p-5 flex flex-col justify-between ">
      <div>
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 rounded-lg bg-red-50 text-red-600">
            <FiAlertTriangle className="text-lg" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Low Stock Alerts</h3>
            <p className="text-xs text-slate-400">Items falling below reorder thresholds</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 max-h-[320px] overflow-y-auto pr-1">
          {mockLowStockItems.map((item) => {
            const isOutOfStock = item.quantity === 0;

            return (
              <div 
                key={item.id} 
                className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                  isOutOfStock 
                    ? 'bg-red-50/40 border-red-100' 
                    : 'bg-amber-50/30 border-amber-100/70'
                }`}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-slate-800">{item.productName}</span>
                  <span className="text-xs text-slate-400 font-normal">{item.variantName}</span>
                </div>

                <div className="text-right flex flex-col items-end gap-1">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold tracking-wide ${
                    isOutOfStock 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {isOutOfStock ? 'OUT OF STOCK' : `${item.quantity} Left`}
                  </span>
                  <span className="text-[10px] text-slate-400 font-light">
                    Limit: {item.reorderLevel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button className="w-full mt-4 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center">
        Open Purchase Orders
      </button>
    </div>
  );
}
