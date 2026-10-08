import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiX, FiSearch } from 'react-icons/fi';

interface NewSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  mockVariations: Array<{ id: string; name: string; price: number }>;
}

const NewSaleModal = ({ isOpen, onClose, mockVariations }: NewSaleModalProps) => {
  const [items, setItems] = useState([
    { variationId: '', quantity: 1, sellingPrice: 0, searchQuery: '', isDropdownOpen: false }
  ]);
  const [paymentMethod, setPaymentMethod] = useState('CASH');

  if (!isOpen) return null;

  const updateItem = (index: number, fields: Partial<typeof items[0]>) => {
    const updated = [...items];
    updated[index] = { ...updated[index], ...fields };
    setItems(updated);
  };

  const handleProductSelect = (index: number, varId: string) => {
    const selected = mockVariations.find(v => v.id === varId);
    updateItem(index, {
      variationId: varId,
      searchQuery: selected ? selected.name : '',
      sellingPrice: selected ? selected.price : 0,
      isDropdownOpen: false
    });
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.sellingPrice * item.quantity), 0);

  const handleCompleteSale = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Prisma Ready Payload:", {
      total: totalAmount,
      paymentMethod,
      items: items.filter(i => i.variationId).map(({ variationId, quantity, sellingPrice }) => ({ variationId, quantity, sellingPrice }))
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl border border-slate-200 shadow-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-sm font-bold text-gray-900">New Sale</h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-gray-600 cursor-pointer"><FiX /></button>
        </div>

        <form onSubmit={handleCompleteSale} className="flex flex-col">
          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="flex flex-col gap-1 w-48">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Payment</label>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="p-2 border border-slate-200 rounded-lg text-xs bg-slate-50">
                <option value="CASH">Cash</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="CARD">Card</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase block">Cart Items</label>
              {items.map((item, index) => {
                const filtered = mockVariations.filter(v => v.name.toLowerCase().includes(item.searchQuery.toLowerCase())).slice(0, 8);
                return (
                  <div key={index} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100 relative">
                    <div className="flex-1 relative">
                      <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                      <input
                        type="text"
                        placeholder="Type to search items..."
                        value={item.searchQuery}
                        onChange={(e) => updateItem(index, { searchQuery: e.target.value, isDropdownOpen: true })}
                        onFocus={() => updateItem(index, { isDropdownOpen: true })}
                        className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none"
                      />
                      {item.isDropdownOpen && item.searchQuery && (
                        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto divide-y divide-slate-50">
                          {filtered.length > 0 ? filtered.map(v => (
                            <button
                              type="button"
                              key={v.id}
                              onClick={() => handleProductSelect(index, v.id)}
                              className="w-full text-left px-3 py-2 text-xs hover:bg-purple-50 hover:text-purple-700 transition-colors block cursor-pointer font-medium"
                            >
                              {v.name} — ₦{v.price.toLocaleString()}
                            </button>
                          )) : <div className="px-3 py-2 text-xs text-slate-400 font-light">No matching products found</div>}
                        </div>
                      )}
                    </div>
                    <div className="w-16">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, { quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                        className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white text-center"
                      />
                    </div>
                    <div className="w-24 text-right text-xs font-semibold text-gray-700">
                      ₦{(item.sellingPrice * item.quantity).toLocaleString()}
                    </div>
                    <button
                      type="button"
                      onClick={() => setItems(items.filter((_, i) => i !== index))}
                      disabled={items.length === 1}
                      className="text-slate-400 hover:text-red-600 disabled:opacity-20 p-2 cursor-pointer"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setItems([...items, { variationId: '', quantity: 1, sellingPrice: 0, searchQuery: '', isDropdownOpen: false }])}
              className="flex items-center gap-1 text-[11px] font-bold text-purple-600 hover:text-purple-800 cursor-pointer"
            >
              <FiPlus /> Add Item
            </button>
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Total Amount</span>
              <p className="text-xl font-bold text-gray-900">₦{totalAmount.toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-100 cursor-pointer">Cancel</button>
              <button type="submit" disabled={totalAmount === 0} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-xs font-semibold hover:bg-purple-700 disabled:bg-purple-300 cursor-pointer shadow-xs">Complete Sale</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewSaleModal;
