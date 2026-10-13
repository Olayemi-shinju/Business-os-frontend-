import React, { useState, type ChangeEvent } from 'react'
import toast from 'react-hot-toast';
import { FiX } from 'react-icons/fi'
import { api } from '../utils/api';

interface CategoryModal {
    isOpen: boolean;
    onClose: () => void;
}

const CreateCategory = ({ isOpen, onClose }: CategoryModal) => {
    const [loader, setLoader] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    if (!isOpen) return null;

    const handleSubmit = async (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        if (!formData.name.trim() || !formData.description.trim()) {
            toast.error("Please fill in all fields");
            return;
        }
        setLoader(true)
        try {
            const res = await api.post("create-category", {
                name: formData.name.trim(),
                description: formData.description
            })

            if (res?.success === true) {
                toast.success(res?.message)
                onClose()
            }
        } catch (error: any) {
            toast.error(error?.message || error?.data?.message || "server error");
        } finally {
            setLoader(false)
        }
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
                        disabled={loader}
                        aria-label="Close modal"
                        className="rounded-lg p-1.5 cursor-pointer text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
                            disabled={loader}
                            value={formData.name}
                            onChange={handleInputChange}
                            name="name"
                            placeholder="e.g. Inverters, Batteries, Panels"
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:bg-slate-50 disabled:text-slate-400"
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
                            disabled={loader}
                            value={formData.description}
                            onChange={handleInputChange}
                            name="description"
                            placeholder="Briefly explain what types of products belong in this folder..."
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none disabled:bg-slate-50 disabled:text-slate-400"
                        />
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loader}
                            className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-100 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loader}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-xs font-semibold hover:bg-purple-700 cursor-pointer shadow-xs transition-colors disabled:bg-purple-400 disabled:cursor-not-allowed"
                        >
                            {loader ? "Creating..." : "Create Category"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateCategory;
