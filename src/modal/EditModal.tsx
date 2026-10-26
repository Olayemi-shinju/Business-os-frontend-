
import { useEffect, useState } from "react";
import type { FormEvent, ChangeEvent, BaseSyntheticEvent } from "react";
import { FiX } from "react-icons/fi";
import { useUser } from "../context/useContext";
import { api } from "../utils/api";
import toast from "react-hot-toast";

type CategoryItem = {
    id: string;
    name: string;
    description: string;
};

interface EditCategoryProps {
    isOpen: boolean;
    onClose: () => void;
    category: CategoryItem | null;
}

const EditCategory = ({
    isOpen,
    onClose,
    category,
}: EditCategoryProps) => {
    const { setCategory } = useUser();
    
    const [loader, setLoader] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    useEffect(() => {
        if (!category) return;
        setFormData({
            name: category.name,
            description: category.description ?? "",
        });
    }, [category]);

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: BaseSyntheticEvent) => {
        event.preventDefault();

        if (!category) {
            toast.error("No category selected.");
            return;
        }

        const name = formData.name.trim();
        const description = formData.description.trim();

        if (!name || !description) {
            toast.error("Please fill in all fields.");
            return;
        }

        setLoader(true);

        try {
          
            const res = await api.put(
                `update-category/${category.id}`,
                {
                    name,
                    description,
                },
            );


            if (res?.success === true) {
                setCategory((prev) =>
                    prev.map((item: CategoryItem) =>
                        item.id === category.id
                            ? { ...item, name, description }
                            : item,
                    ),
                );

                toast.success(
                    res.message || "Category updated successfully.",
                );

                onClose();
            } else {
                toast.error(
                    res?.message || "Failed to update category.",
                );
            }
        } catch (error: unknown) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Server error. Please try again.",
            );
        } finally {
            setLoader(false);
        }
    };

    if (!isOpen || !category) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs"
            onMouseDown={(event) => {
                if (
                    event.target === event.currentTarget &&
                    !loader
                ) {
                    onClose();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="edit-category-title"
                className="flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
            >
                <div className="flex items-start justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
                    <div>
                        <h2
                            id="edit-category-title"
                            className="text-sm font-bold text-slate-900"
                        >
                            Edit Category
                        </h2>

                        <p className="mt-0.5 text-xs text-slate-500">
                            Update this category's details.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loader}
                        aria-label="Close modal"
                        className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <FiX size={16} />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 p-6"
                >
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="edit-category-name"
                            className="text-[10px] font-bold uppercase tracking-wider text-slate-400"
                        >
                            Category Name
                        </label>

                        <input
                            type="text"
                            id="edit-category-name"
                            name="name"
                            required
                            maxLength={80}
                            disabled={loader}
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. Inverters, Batteries, Panels"
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:bg-slate-50 disabled:text-slate-400"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="edit-category-description"
                            className="text-[10px] font-bold uppercase tracking-wider text-slate-400"
                        >
                            Description
                        </label>

                        <textarea
                            id="edit-category-description"
                            name="description"
                            required
                            rows={3}
                            maxLength={250}
                            disabled={loader}
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Describe the products in this category..."
                            className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:bg-slate-50 disabled:text-slate-400"
                        />
                    </div>

                    <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loader}
                            className="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loader}
                            className="cursor-pointer rounded-lg bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-400"
                        >
                            {loader ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCategory;
