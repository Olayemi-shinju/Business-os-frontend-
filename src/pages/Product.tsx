import { useEffect, useState } from "react";
import { FiPlus, FiSearch, FiSliders } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AddProductModal from "../modal/CreateProduct";
import ConfirmDelete from "../modal/ConfirmDelete";
import { useUser } from "../context/useContext";
import { api } from "../utils/api";

type Variation = {
  id?: string;
  name?: string;
  costPrice?: number;
  sellingPrice?: number;
  quantity?: number;
  reorderLevel?: number;
  barcode?: string;
};

type ProductItem = {
  id: string;
  name: string;
  variations?: Variation[];
};

const Product = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const [productToDelete, setProductToDelete] =
    useState<ProductItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;
    setLoading(true);

    const timeout = window.setTimeout(async () => {
      try {
        const endpoint = search.trim()
          ? `get-product?searchQuery=${encodeURIComponent(search.trim())}`
          : "get-product";

        const res = await api.get(endpoint);

        if (cancelled) return;

        if (!res?.success) {
          setProducts([]);
          return;
        }

      
        if (res.type === "barcode" && res.data) {
          const variation = res.data;
          const product = variation.product;

          if (product) {
            setProducts([
              {
                ...product,
                variations: [variation, ...(product.variations ?? [])],
              },
            ]);
          } else {
            setProducts([]);
          }
        } else {
          setProducts(Array.isArray(res.data) ? res.data : []);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to fetch products:", error);
          setProducts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [search, user]);

  const handleDelete = async () => {
    if (!productToDelete || isDeleting) return;

    setIsDeleting(true);

    try {
    
      const res = await api.delete(
        `delete-product/${productToDelete.id}`
      );

      if (!res?.success) {
        toast.error(res?.message || "Failed to delete product.");
        return;
      }

   
      setProducts((current) =>
        current.filter((product) => product.id !== productToDelete.id)
      );

      toast.success(res.message || "Product deleted successfully.");
      setProductToDelete(null);
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const renderInventory = (variation?: Variation) => {
    const quantity = Number(variation?.quantity ?? 0);
    const reorderLevel = Number(variation?.reorderLevel ?? 5);

    const status =
      quantity === 0
        ? { dot: "bg-red-500", text: "text-red-600" }
        : quantity <= reorderLevel
          ? { dot: "bg-amber-500", text: "text-amber-600" }
          : { dot: "bg-emerald-500", text: "text-emerald-600" };

    return (
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${status.dot}`} />
        <span className={`font-semibold ${status.text}`}>
          {quantity === 0
            ? "Out of stock"
            : `${quantity} unit${quantity === 1 ? "" : "s"}`}
        </span>
      </div>
    );
  };

  const renderProductActions = (product: ProductItem) => (
    <div className="flex justify-end gap-3 text-xs">
      <button
        type="button"
        className="font-semibold text-purple-600 hover:text-purple-800"
        onClick={() => toast("Product editing is not connected yet.")}
      >
        Edit
      </button>

      <button
        type="button"
        disabled={isDeleting}
        onClick={() => setProductToDelete(product)}
        className="font-semibold text-slate-400 hover:text-red-600 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );

  const renderProduct = (product: ProductItem, mobile = false) => {
    const variation = product.variations?.[0] ?? {
      name: "Default",
      costPrice: 0,
      sellingPrice: 0,
      quantity: 0,
      reorderLevel: 5,
    };

    if (mobile) {
      return (
        <div
          key={product.id}
          className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="font-semibold text-slate-900">
                {product.name}
              </div>
              <div className="mt-1 font-mono text-xs text-slate-500">
                {variation.name || "No variations"}
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-slate-600">Cost</div>
              <div className="font-semibold text-slate-900">
                ₦{Number(variation.costPrice ?? 0).toLocaleString()}
              </div>
              <div className="mt-1 text-xs text-slate-400">
                Sell: ₦
                {Number(variation.sellingPrice ?? 0).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            {renderInventory(variation)}
            {renderProductActions(product)}
          </div>
        </div>
      );
    }

    return (
      <tr key={product.id} className="hover:bg-slate-50/70">
        <td className="px-6 py-4">
          <div className="font-semibold text-slate-900">{product.name}</div>
          <div className="mt-0.5 font-mono text-xs text-slate-400">
            {variation.name || "No variations"}
          </div>
        </td>
        <td className="px-6 py-4">
          ₦{Number(variation.costPrice ?? 0).toLocaleString()}
        </td>
        <td className="px-6 py-4 font-semibold">
          ₦{Number(variation.sellingPrice ?? 0).toLocaleString()}
        </td>
        <td className="px-6 py-4">{renderInventory(variation)}</td>
        <td className="px-6 py-4">{renderProductActions(product)}</td>
      </tr>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-gray-800 md:p-8">
      <header className="mb-4">
        <h1 className="text-xs font-medium uppercase tracking-wider text-slate-400">
          {formattedDate}
        </h1>

        <div className="mt-3 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
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
            className="btn-new-sale flex cursor-pointer items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold hover:bg-purple-100"
          >
            <FiPlus />
            Add Product
          </button>
        </div>
      </header>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col items-center justify-between gap-3 border-b border-slate-100 p-4 md:flex-row">
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm focus:outline-none"
              placeholder="Search products, barcodes..."
            />
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            <FiSliders />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        <div className="p-4">
          {loading ? (
            <div className="py-12 text-center text-slate-500">
              Loading products…
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="mb-3 rounded-full bg-slate-100 p-4">
                <FiSearch size={24} className="text-slate-400" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                No products found
              </h3>
              <p className="mt-1 max-w-xs text-xs text-slate-500">
                Try searching or add a new product to get started.
              </p>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="mt-4 rounded-md border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold"
              >
                Add product
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {products.map((product) => renderProduct(product, true))}
              </div>

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase text-slate-400">
                      <th className="px-6 py-4">Product Details</th>
                      <th className="px-6 py-4">Cost Price</th>
                      <th className="px-6 py-4">Selling Price</th>
                      <th className="px-6 py-4">Inventory</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {products.map((product) => renderProduct(product))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </section>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />

      <ConfirmDelete
        isOpen={Boolean(productToDelete)}
        onClose={() => {
          if (!isDeleting) setProductToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to permanently delete "${productToDelete?.name ?? "this product"}"? This action cannot be undone.`}
        loader={isDeleting}
      />
    </div>
  );
};

export default Product;
