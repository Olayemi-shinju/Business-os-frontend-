import { useEffect, useState } from 'react'
import { FiPlus, FiSearch, FiSliders } from 'react-icons/fi'
import AddProductModal from '../modal/CreateProduct'
import { useUser } from '../context/useContext'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'

const Product = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const date = new Date()
  const [isModalOpen, setModalOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [productList, setProductList] = useState<any[]>([])

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  useEffect(() => {
    if (!user) return

    const fetchProduct = async () => {
      try {
        const endpoint = search.trim() !== "" 
          ? `get-product?searchQuery=${encodeURIComponent(search)}` 
          : "get-product"

        const res = await api.get(endpoint)
        if (res.success === true) {
          if (res.type === "barcode" && res.data?.product) {
            setProductList([res.data.product])
          } else if (Array.isArray(res.data)) {
            setProductList(res.data)
          } else {
            setProductList([])
          }
        }
      } catch (error) {
        console.log(error || "server error")
      }
    }

 
    const delayDebounceFn = setTimeout(() => {
      fetchProduct()
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [search, user])

  if (!user) {
    navigate("/login")
    return null
  }

  return (
    <div className='min-h-screen p-8 bg-gray-50 text-gray-800'>
      <section>
        <div>
          <h1 className="text-xs text-slate-400 font-medium tracking-wider uppercase">{formattedDate}</h1>
        </div>

        <div className="my-3 flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
          <div className="flex gap-3 flex-col">
            <p className="text-2xl font-medium">Good Morning, {user?.firstName}</p>
            <span className="text-xs font-semibold text-slate-500">Here's what's happening with your store today.</span>
          </div>
          <div>
            <button
              onClick={() => setModalOpen(true)}
              className="flex btn-new-sale cursor-pointer items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold transition-colors duration-200 hover:bg-purple-100"
            >
              <FiPlus className="text-base" />
              Add Product
            </button>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, barcodes..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <button className="flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 cursor-pointer transition-colors">
              <FiSliders className="text-slate-500" />
              Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {productList.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="rounded-full bg-slate-100 p-4 mb-3">
                <FiSearch size={24} className="text-slate-400" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">No products found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Try searching for something else or create a new inventory product to get started.
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Product Details</th>
                  <th className="py-4 px-6">Cost Price</th>
                  <th className="py-4 px-6">Selling Price</th>
                  <th className="py-4 px-6">Inventory</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {productList.map((prod) => {
                  // Fallbacks to grab data properties safely out of the first variation index array securely
                  const activeVar = prod.variations?.[0] || {
                    name: "Default",
                    costPrice: 0,
                    sellingPrice: 0,
                    quantity: 0,
                    reorderLevel: 5
                  }

                  const qty = Number(activeVar.quantity) || 0
                  const reorder = Number(activeVar.reorderLevel) || 5

                  return (
                    <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">{prod.name}</span>
                          <span className="text-xs text-slate-400 font-mono mt-0.5">
                            {activeVar.name !== "Default" ? activeVar.name : "No variations defined"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium text-slate-600">
                        ₦{Number(activeVar.costPrice || 0).toLocaleString()}
                      </td>
                      <td className="py-4 px-6 font-semibold text-gray-900">
                        ₦{Number(activeVar.sellingPrice || 0).toLocaleString()}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            qty === 0 ? 'bg-red-500' : qty <= reorder ? 'bg-amber-500' : 'bg-emerald-500'
                          }`} />
                          <span className={`font-semibold ${
                            qty === 0 ? 'text-red-600' : qty <= reorder ? 'text-amber-600' : 'text-emerald-600'
                          }`}>
                            {qty === 0 ? 'Out of stock' : `${qty} units`}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right font-medium">
                        <div className="flex justify-end gap-3 text-xs">
                          <button className="text-purple-600 hover:text-purple-800 cursor-pointer transition-colors font-semibold">Edit</button>
                          <button className="text-slate-400 hover:text-red-600 cursor-pointer transition-colors font-semibold">Delete</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  )
}

export default Product
