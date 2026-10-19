import React, { useEffect, useState, type BaseSyntheticEvent, type ChangeEvent } from "react";
import { FiX } from "react-icons/fi";
import { api } from "../utils/api";
import toast from "react-hot-toast";

type AddProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, }) => {
  const [category, setCategory] = useState<any[]>([]);
  const [loader, setLoader] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    brandId: "",
    variations: [
      {
        name: "",
        barcode: "",
        costPrice: "",
        sellingPrice: "",
        quantity: "0",
        reorderLevel: "5",
      },
    ],
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVariationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedVariations = [...prev.variations];
      updatedVariations[0] = { ...updatedVariations[0], [name]: value };
      return { ...prev, variations: updatedVariations };
    });
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await api.get("get-catgory");
        if (res.success === true) {
          setCategory(res.data);

        }
      } catch (error) {
        console.log(error || "server error");
      }
    };
    fetchCategory();
  }, []);

 const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setLoader(true);

    const parsedPayload = {
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      categoryId: formData.categoryId,
      brandId: formData.brandId.trim() || undefined,
      variations: [
        {
          name: formData.variations[0].name || "Default",
          barcode: formData.variations[0].barcode.trim() || undefined,
          costPrice: Number(formData.variations[0].costPrice) || 0,
          sellingPrice: Number(formData.variations[0].sellingPrice) || 0,
          quantity: Number(formData.variations[0].quantity) || 0,
          reorderLevel: Number(formData.variations[0].reorderLevel) || 0,
        },
      ],
    };

    try {
      const res = await api.post("create-product", parsedPayload);
      if (res.success === true) {
        toast.success(res.message || "Product created successfully!");
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.message || error?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setLoader(false);
    }
  };


  const inputClass =
    "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  const labelClass = "text-sm font-medium text-slate-700";


  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
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
            onClick={onClose}
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
                  value={formData.name}
                  onChange={handleInputChange}
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
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select category</option>
                  {category?.map((e) => (
                    <option value={e.id} key={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
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
                  name="name"
                  value={formData.variations[0].name}
                  onChange={handleVariationChange}
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
                  name="barcode"
                  value={formData.variations[0].barcode}
                  onChange={handleVariationChange}
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
                  name="costPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.variations[0].costPrice}
                  onChange={handleVariationChange}
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
                  value={formData.variations[0].sellingPrice}
                  onChange={handleVariationChange}
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
                  name="quantity"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.variations[0].quantity}
                  onChange={handleVariationChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="reorder-level" className={labelClass}>
                  Reorder level
                </label>
                <input
                  id="reorder-level"
                  name="reorderLevel"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.variations[0].reorderLevel}
                  onChange={handleVariationChange}
                  className={inputClass}
                />
                <p className="mt-1 text-xs text-slate-400">Alert when stock reaches this level.</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg cursor-pointer border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loader}
              className="rounded-lg cursor-pointer bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loader ? "Adding Product...." : "Add product"}
            </button>


          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
