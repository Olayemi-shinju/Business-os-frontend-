import { useState } from "react";
import { useUser } from "../context/useContext";
import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";
import CreateCategory from "../modal/CreateCategory";
import EditCategory from "../modal/EditModal";
import ConfirmDelete from "../modal/ConfirmDelete";
import { api } from "../utils/api";

type CategoryItem = {
    id: string;
    name: string;
    description: string;
};

const Category = () => {
    const [search, setSearch] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedCategory, setSelectedCategory] =
        useState<CategoryItem | null>(null);

    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] =
        useState<CategoryItem | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const { user, category, setCategory } = useUser();

    const formattedDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const filteredCategories = category.filter((item: CategoryItem) =>
        item.name.toLowerCase().includes(search.toLowerCase().trim()),
    );

    const closeDeleteModal = () => {
        if (isDeleting) return;

        setOpenConfirmModal(false);
        setCategoryToDelete(null);
    };

    const handleDeleteConfirm = async () => {
        if (!categoryToDelete || isDeleting) return;

        setIsDeleting(true);

        try {
            const res = await api.delete(
                `delete-category/${categoryToDelete.id}`,
            );

            if (res.success) {
                setCategory((previousCategories: CategoryItem[]) =>
                    previousCategories.filter(
                        (item) => item.id !== categoryToDelete.id,
                    ),
                );

                toast.success(res.message || "Category deleted successfully.");

                setOpenConfirmModal(false);
                setCategoryToDelete(null);
            } else {
                toast.error(res.message || "Failed to delete category.");
            }
        } catch (error) {
            console.error("Failed to delete category:", error);
            toast.error("Failed to delete category. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-8">
            <div className="mx-auto max-w-6xl">
                <section>
                    <h1 className="text-xs font-medium uppercase tracking-wider text-slate-400">
                        {formattedDate}
                    </h1>

                    <div className="my-3 flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                        <div className="flex flex-col gap-3">
                            <p className="text-2xl font-medium">
                                Welcome Back, {user?.firstName}
                            </p>

                            <span className="text-xs font-semibold text-slate-500">
                                Here's what's happening with your store today.
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() => setModalOpen(true)}
                            className="btn-new-sale flex cursor-pointer items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold transition-colors duration-200"
                        >
                            <FiPlus className="text-base" />
                            Add Category
                        </button>
                    </div>
                </section>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <div className="border-b border-slate-200 p-4">
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search categories..."
                            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 sm:max-w-sm"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[500px] text-left">
                            <thead className="bg-slate-50 text-sm text-slate-500">
                                <tr>
                                    <th className="px-5 py-4 font-medium">
                                        Category name
                                    </th>
                                    <th className="px-5 py-4 font-medium">
                                        Description
                                    </th>
                                    <th className="px-5 py-4 text-right font-medium">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {filteredCategories.map((item: CategoryItem) => (
                                    <tr key={item.id} className="hover:bg-slate-50">
                                        <td className="px-5 py-4 font-medium">
                                            {item.name}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-500">
                                            {item.description || "—"}
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedCategory(item);
                                                        setOpenEditModal(true);
                                                    }}
                                                    className="cursor-pointer rounded-md border border-slate-200 px-3 py-2 text-sm hover:bg-slate-100"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setCategoryToDelete(item);
                                                        setOpenConfirmModal(true);
                                                    }}
                                                    className="cursor-pointer rounded-md border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filteredCategories.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="px-5 py-10 text-center text-sm text-slate-500"
                                        >
                                            No categories found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <CreateCategory
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
            />

            <EditCategory
                isOpen={openEditModal}
                onClose={() => {
                    setOpenEditModal(false);
                    setSelectedCategory(null);
                }}
                category={selectedCategory}
            />

            <ConfirmDelete
                isOpen={openConfirmModal}
                onClose={closeDeleteModal}
                onConfirm={handleDeleteConfirm}
                title="Delete Category"
                message={`Are you sure you want to permanently delete "${
                    categoryToDelete?.name ?? "this category"
                }"? This action cannot be undone.`}
                loader={isDeleting}
            />
        </div>
    );
};

export default Category;