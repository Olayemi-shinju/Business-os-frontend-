import React from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";

type ConfirmDeleteProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  loader?: boolean;
};

const ConfirmDelete = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Item",
  message = "Are you sure you want to permanently delete this item? This action cannot be undone.",
  loader = false,
}: ConfirmDeleteProps) => {
  if (!isOpen) return null;

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.target === e.currentTarget && !loader) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs"
      onMouseDown={handleBackdropClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-delete-title"
        className="flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
      >
        <div className="flex items-start gap-4 p-6">
          <div className="flex-shrink-0 rounded-full border border-rose-100 bg-rose-50 p-3 text-rose-600">
            <FiAlertTriangle size={24} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <h3
                id="confirm-delete-title"
                className="text-base font-bold tracking-tight text-slate-900"
              >
                {title}
              </h3>

              <button
                type="button"
                onClick={onClose}
                disabled={loader}
                aria-label="Close dialog"
                className="cursor-pointer rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiX size={18} />
              </button>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {message}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2.5 border-t border-slate-100 bg-slate-50 px-6 py-3.5">
          <button
            type="button"
            onClick={onClose}
            disabled={loader}
            className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-3xs transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loader}
            className="cursor-pointer rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-rose-700 active:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loader ? "Deleting..." : "Delete Item"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
