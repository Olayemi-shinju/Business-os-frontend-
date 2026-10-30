import { useEffect, useState, type BaseSyntheticEvent, type FormEvent } from "react";
import { FiX } from "react-icons/fi";
import { api } from "../utils/api";
import toast from "react-hot-toast";
import { useUser } from "../context/useContext";

type EditProductProps = {
  isOpen: boolean;
  onClose: () => void;
  product: any;
};

const EditProduct = ({ isOpen, onClose, product }: EditProductProps) => {
  const { category } = useUser();
  const [loader, setLoader] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    variationName: "",
    barcode: "",
    costPrice: "",
    sellingPrice: "",
    quantity: "",
    reorderLevel: "",
  });

  useEffect(() => {
    if (!product) return;

    const variation = product.variations?.[0];

    setFormData({
      name: product.name || "",
      description: product.description || "",
      categoryId: product.categoryId || "",
      variationName: variation?.name || "",
      barcode: variation?.barcode || "",
      costPrice: String(variation?.costPrice ?? 0),
      sellingPrice: String(variation?.sellingPrice ?? 0),
      quantity: String(variation?.quantity ?? 0),
      reorderLevel: String(variation?.reorderLevel ?? 5),
    });
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (loader || !product) return;

    setLoader(true);

    try {
      const res = await api.put(`update-product/${product.id}`, {
        name: formData.name.trim(),
        description: formData.description.trim(),
        categoryId: formData.categoryId,
        variations: [
          {
            ...(product.variations?.[0]?.id
              ? { id: product.variations[0].id }
              : {}),
            name: formData.variationName || "Default",
            barcode: formData.barcode || undefined,
            costPrice: Number(formData.costPrice),
            sellingPrice: Number(formData.sellingPrice),
            quantity: Number(formData.quantity),
            reorderLevel: Number(formData.reorderLevel),
          },
        ],
      });

      if (res.success) {
        toast.success(res.message || "Product updated successfully");
        onClose();
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Edit product</h2>
            <p className="mt-1 text-sm text-slate-500">
              Update product information and stock details.
            </p>
          </div>

          <button type="button" onClick={onClose} disabled={loader}>
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
          <div>
            <h3 className="mb-4 font-semibold text-slate-800">Product information</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">Product name</label>
                <input name="name" value={formData.name} onChange={handleChange} className={inputClass} required />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Category</label>
                <select name="categoryId" value={formData.categoryId} onChange={handleChange} className={inputClass} required>
                  <option value="">Select category</option>
                  {category?.map((item: any) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-slate-700">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className={inputClass} rows={3} />
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-800">Pricing and stock</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["variationName", "Variation name"],
                ["barcode", "Barcode"],
                ["costPrice", "Cost price"],
                ["sellingPrice", "Selling price"],
                ["quantity", "Quantity"],
                ["reorderLevel", "Reorder level"],
              ].map(([name, label]) => (
                <div key={name}>
                  <label className="text-sm font-medium text-slate-700">{label}</label>
                  <input
                    name={name}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                    className={inputClass}
                    type={["costPrice", "sellingPrice", "quantity", "reorderLevel"].includes(name) ? "number" : "text"}
                    min={["costPrice", "sellingPrice", "quantity", "reorderLevel"].includes(name) ? "0" : undefined}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button type="button" onClick={onClose} disabled={loader} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700">
              Cancel
            </button>

            <button type="submit" disabled={loader} className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60">
              {loader ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
