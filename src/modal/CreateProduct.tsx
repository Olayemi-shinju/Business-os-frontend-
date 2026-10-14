import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { api } from "../utils/api";

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

type Category = {
  id: string;
  name: string;
};

type AddProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded?: (product: DemoProduct) => void;
};

const initialForm = {
  name: "",
  description: "",
  categoryId: "",
  variationName: "Default",
  costPrice: "",
  sellingPrice: "",
  barcode: "",
  quantity: "0",
  reorderLevel: "5",
};

const AddProductModal = ({ isOpen, onClose, onProductAdded }: AddProductModalProps) => {
  const [form, setForm] = useState(() => ({ ...initialForm }));
  const [category, setCategory] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch categories only when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const fetchCategory = async () => {
      try {
        const res = await api.get("get-catgory");
        if (res?.success === true) {
          setCategory(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategory();
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setForm({ ...initialForm });
      setError("");
      setSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  const labelClass = "text-sm font-medium text-slate-700";

  const resetForm = () => {
    setForm({ ...initialForm });
    setError("");
    setSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Generic change handler for inputs, textarea and select
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const validateForm = () => {
    if (!form.name.trim()) return "Product name is required.";
    if (!form.categoryId) return "Please select a category.";
    if (!form.variationName.trim()) return "Variation name is required.";
    if (form.costPrice === "" || isNaN(Number(form.costPrice))) return "Enter a valid cost price.";
    if (form.sellingPrice === "" || isNaN(Number(form.sellingPrice))) return "Enter a valid selling price.";
    if (form.quantity === "" || isNaN(Number(form.quantity))) return "Enter a valid quantity.";
    if (form.reorderLevel === "" || isNaN(Number(form.reorderLevel))) return "Enter a valid reorder level.";
    return null;
  };

  // Demo submit: build product object, mark success and call optional callback.
  // Replace with real API call if needed.
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // If you want to call a real API, replace this block with the API call:
      // const payload = { ...converted values... }
      // const res = await api.post("add-product", payload)
      // handle response accordingly

      // Demo product object (constructed from form state)
      const selectedCategory = category.find((c) => c.id === form.categoryId);
      const demoProduct: DemoProduct = {
        id: String(Date.now()),
        name: form.name,
        description: form.description,
        categoryId: form.categoryId,
        category: selectedCategory?.name ?? "",
        brandId: "",
        brand: "",
        imageUrl: "",
        variation: {
          name: form.variationName,
          costPrice: Number(form.costPrice),
          sellingPrice: Number(form.sellingPrice),
          barcode: form.barcode,
          quantity: Number(form.quantity),
          reorderLevel: Number(form.reorderLevel),
        },
      };

      setSuccess(true);
      setError("");

      // Call optional callback so parent can update lists
      if (onProductAdded) onProductAdded(demoProduct);

      // keep the success message visible a short while then reset and close
      setTimeout(() => {
        resetForm();
        onClose();
      }, 900);
    } catch (err) {
      console.error(err);
      setError("Failed to add product. Try again.");
    }
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
            <h2 id="add-product-title" className="text-xl font-semibold text-slate-900">
              Add new product
            </h2>

            <p className="mt-1 text-sm text-slate-500">Add a product and its initial stock details.</p>
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
        <form onSubmit={handleSubmit} className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
          <section>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Product information</h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="product-name" className={labelClass}>
                  Product name <span className="text-red-500">*</span>
                </label>

                <input
                  id="product-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Samsung Galaxy A15"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label htmlFor="product-category" className={labelClass}>
                  Category <span className="text-red-500">*</span>
                </label>

                <select id="product-category" name="categoryId" value={form.categoryId} onChange={handleChange} className={inputClass} required>
                  <option value="">Select category</option>

                  {category.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
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
                  name="description"
                  value={form.description}
                  onChange={handleChange}
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
            <h3 className="mb-1 text-sm font-semibold text-slate-900">Pricing and stock</h3>

            <p className="mb-4 text-xs text-slate-500">Set the price and initial stock for this product.</p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="variation-name" className={labelClass}>
                  Variation name <span className="text-red-500">*</span>
                </label>

                <input
                  id="variation-name"
                  name="variationName"
                  value={form.variationName}
                  onChange={handleChange}
                  placeholder="e.g. 128GB or Default"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label htmlFor="barcode" className={labelClass}>
                  Barcode
                </label>

                <input id="barcode" name="barcode" value={form.barcode} onChange={handleChange} placeholder="Optional barcode" className={inputClass} />
              </div>

              <div>
                <label htmlFor="cost-price" className={labelClass}>
                  Cost price (₦) <span className="text-red-500">*</span>
                </label>

                <input
                  id="cost-price"
                  name="costPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.costPrice}
                  onChange={handleChange}
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
                  name="sellingPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.sellingPrice}
                  onChange={handleChange}
                  placeholder="0.00"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label htmlFor="quantity" className={labelClass}>
                  Initial quantity
                </label>

                <input id="quantity" name="quantity" type="number" min="0" step="1" value={form.quantity} onChange={handleChange} className={inputClass} required />
              </div>

              <div>
                <label htmlFor="reorder-level" className={labelClass}>
                  Reorder level
                </label>

                <input id="reorder-level" name="reorderLevel" type="number" min="0" step="1" value={form.reorderLevel} onChange={handleChange} className={inputClass} required />

                <p className="mt-1 text-xs text-slate-400">Alert when stock reaches this level.</p>
              </div>
            </div>
          </section>

          {/* Feedback */}
          {error && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p role="status" className="rounded-lg bg-green-50 px-3 py-2.5 text-sm text-green-700">
              Demo product added successfully!
            </p>
          )}

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button type="button" onClick={handleClose} className="rounded-lg cursor-pointer border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
              Cancel
            </button>

            <button type="submit" disabled={success} className="rounded-lg cursor-pointer bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">
              {success ? "Product added" : "Save product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;