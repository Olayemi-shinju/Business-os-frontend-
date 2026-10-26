import React from 'react'
import { FiAlertTriangle, FiX } from 'react-icons/fi'

type ConfirmDeleteProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  loader?: boolean;
};

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  isOpen,
  onClose,
  title = "Delete Product Variant",
  message = "Are you sure you want to permanently remove this variant from inventory? This action cannot be undone.",
  loader = false
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs"
      onMouseDown={(e) => { if (e.target === e.currentTarget && !loader) onClose(); }}
    >
      <div 
        role="dialog" 
        aria-modal="true"
        className="w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden flex flex-col"
      >
        <div className="flex items-start gap-4 p-6">
          <div className="flex-shrink-0 rounded-full bg-rose-50 border border-rose-100 p-3 text-rose-600">
            <FiAlertTriangle size={24} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                {title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                disabled={loader}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition disabled:opacity-50 cursor-pointer"
              >
                <FiX size={18} />
              </button>
            </div>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="bg-slate-50 border-t border-slate-100 px-6 py-3.5 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={loader}
            className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-3xs"
          >
            Cancel
          </button>
          
          <button
            type="button"
          
            disabled={loader}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white rounded-xl text-xs font-semibold transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
          >
            {loader ? "Deleting..." : "Delete Item"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
