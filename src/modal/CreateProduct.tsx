import { useState } from "react";
import { FiX } from "react-icons/fi";

type Category = {
    id: string;
    name: string;
};

const demoCategories: Category[] = [
    { id: "cat-1", name: "Electronics" },
    { id: "cat-2", name: "Groceries" },
    { id: "cat-3", name: "Clothing" },
    { id: "cat-4", name: "Home & Living" },
    { id: "cat-5", name: "Accessories" },
];


type DemoProduct = {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    category: string;
    brandId: string;
    brand: string;
    imageUrl: string;
    variation: {
        name: string;
        costPrice: number;
        sellingPrice: number;
        barcode: string;
        quantity: number;
        reorderLevel: number;
    };
};

type AddProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onProductAdded?: (product: DemoProduct) => void;
};

const AddProductModal = ({
    isOpen,
    onClose,
}: AddProductModalProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [variationName, setVariationName] = useState("Default");
    const [costPrice, setCostPrice] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [barcode, setBarcode] = useState("");
    const [quantity, setQuantity] = useState("0");
    const [reorderLevel, setReorderLevel] = useState("5");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const inputClass =
        "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

    const labelClass = "text-sm font-medium text-slate-700";

    const resetForm = () => {
        setName("");
        setDescription("");
        setCategoryId("");
        setVariationName("Default");
        setCostPrice("");
        setSellingPrice("");
        setBarcode("");
        setQuantity("0");
        setReorderLevel("5");
        setError("");
        setSuccess(false);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) handleClose();
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-product-title"
                className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
            >
                {/* Header */}
                <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
                    <div>
                        <h2
                            id="add-product-title"
                            className="text-xl font-semibold text-slate-900"
                        >
                            Add new product
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Add a product and its initial stock details.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        aria-label="Close modal"
                        className="rounded-lg p-2 cursor-pointer text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                {/* Form */}
                <form
                    //   onSubmit={handleSubmit}
                    className="flex-1 space-y-6 overflow-y-auto px-6 py-5"
                >

                    <section>
                        <h3 className="mb-4 text-sm font-semibold text-slate-900">
                            Product information
                        </h3>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="product-name" className={labelClass}>
                                    Product name <span className="text-red-500">*</span>
                                </label>

                                <input
                                    id="product-name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    placeholder="e.g. Samsung Galaxy A15"
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="product-category" className={labelClass}>
                                    Category <span className="text-red-500">*</span>
                                </label>

                                <select
                                    id="product-category"
                                    value={categoryId}
                                    onChange={(event) => setCategoryId(event.target.value)}
                                    className={inputClass}
                                    required
                                >
                                    <option value="">Select category</option>

                                    {demoCategories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="product-description" className={labelClass}>
                                    Description
                                </label>

                                <textarea
                                    id="product-description"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    placeholder="A short description of the product..."
                                    rows={3}
                                    className={`${inputClass} resize-y`}
                                />
                            </div>
                        </div>
                    </section>

                    <div className="border-t border-slate-100" />

                    {/* Pricing and stock */}
                    <section>
                        <h3 className="mb-1 text-sm font-semibold text-slate-900">
                            Pricing and stock
                        </h3>

                        <p className="mb-4 text-xs text-slate-500">
                            Set the price and initial stock for this product.
                        </p>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="variation-name" className={labelClass}>
                                    Variation name <span className="text-red-500">*</span>
                                </label>

                                <input
                                    id="variation-name"
                                    value={variationName}
                                    onChange={(event) => setVariationName(event.target.value)}
                                    placeholder="e.g. 128GB or Default"
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="barcode" className={labelClass}>
                                    Barcode
                                </label>

                                <input
                                    id="barcode"
                                    value={barcode}
                                    onChange={(event) => setBarcode(event.target.value)}
                                    placeholder="Optional barcode"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label htmlFor="cost-price" className={labelClass}>
                                    Cost price (₦) <span className="text-red-500">*</span>
                                </label>

                                <input
                                    id="cost-price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={costPrice}
                                    onChange={(event) => setCostPrice(event.target.value)}
                                    placeholder="0.00"
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="selling-price" className={labelClass}>
                                    Selling price (₦) <span className="text-red-500">*</span>
                                </label>

                                <input
                                    id="selling-price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={sellingPrice}
                                    onChange={(event) => setSellingPrice(event.target.value)}
                                    placeholder="0.00"
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="quantity" className={labelClass}>
                                    Initial quantity
                                </label>

                                <input
                                    id="quantity"
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={quantity}
                                    onChange={(event) => setQuantity(event.target.value)}
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="reorder-level" className={labelClass}>
                                    Reorder level
                                </label>

                                <input
                                    id="reorder-level"
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={reorderLevel}
                                    onChange={(event) => setReorderLevel(event.target.value)}
                                    className={inputClass}
                                    required
                                />

                                <p className="mt-1 text-xs text-slate-400">
                                    Alert when stock reaches this level.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Feedback */}
                    {error && (
                        <p
                            role="alert"
                            className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600"
                        >
                            {error}
                        </p>
                    )}

                    {success && (
                        <p
                            role="status"
                            className="rounded-lg bg-green-50 px-3 py-2.5 text-sm text-green-700"
                        >
                            Demo product added successfully!
                        </p>
                    )}

                    {/* Footer */}
                    <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="rounded-lg cursor-pointer border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={success}
                            className="rounded-lg cursor-pointer bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {success ? "Product added" : "Save product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;

