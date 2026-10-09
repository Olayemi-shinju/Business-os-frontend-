import React, { useState } from 'react'
import { FiX } from 'react-icons/fi'

interface CategoryModal {
    isOpen: boolean;
    onClose: () => void;
}

const CreateCategory = ({ isOpen, onClose }: CategoryModal) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    if (!isOpen) return null;

    const handleSubmit = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        console.log("Prisma Ready Payload:", { name, description });
        onClose();
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
            onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-category-title"
                className="flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-xl bg-white border border-slate-200 shadow-xl"
            >
                <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4 bg-slate-50">
                    <div>
                        <h2 id="add-category-title" className="text-sm font-bold text-slate-900">
                            Add New Category
                        </h2>
                        <p className="mt-0.5 text-xs text-slate-500">
                            Create a grouping folder for your shop products.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="rounded-lg p-1.5 cursor-pointer text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                    >
                        <FiX size={16} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Category Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Inverters, Batteries, Panels"
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="description" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Description
                        </label>
                        <textarea
                            id="description"
                            required
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Briefly explain what types of products belong in this folder..."
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
                        />
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-100 cursor-pointer transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-xs font-semibold hover:bg-purple-700 cursor-pointer shadow-xs transition-colors"
                        >
                            Create Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateCategory;
