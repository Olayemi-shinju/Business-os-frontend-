import { useEffect, useState, type BaseSyntheticEvent } from 'react'
import { FiPlus, FiSearch, FiSliders } from 'react-icons/fi'
import AddProductModal from '../modal/CreateProduct'
import { useUser } from '../context/useContext'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import toast from 'react-hot-toast'

const Product = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const [isModalOpen, setModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [productId, setProductId] = useState("")

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // redirect if not signed in
  useEffect(() => {
    if (!user) navigate('/login')
  }, [user, navigate])

  // fetch products when search changes (simple debounce)
  useEffect(() => {
    if (!user) return
    setLoading(true)
    const id = window.setTimeout(async () => {
      try {
        const endpoint = search.trim()
          ? `get-product?searchQuery=${encodeURIComponent(search.trim())}`
          : 'get-product'
        const res = await api.get(endpoint)

        if (res?.success) {
          // barcode result: productVariation with included product
          if (res.type === 'barcode' && res.data) {
            const variation = res.data
            const product = variation.product || {}
            // put the matched variation first so UI can use product.variations[0]
            const merged = {
              ...product,
              variations: [
                {
                  id: variation.id,
                  name: variation.name ?? 'Default',
                  barcode: variation.barcode,
                  costPrice: variation.costPrice ?? 0,
                  sellingPrice: variation.sellingPrice ?? 0,
                  quantity: variation.quantity ?? 0,
                  reorderLevel: variation.reorderLevel ?? 5,
                  ...variation,
                },
                ...(product.variations ?? []),
              ],
            }
            setProducts([merged])
          } else if (Array.isArray(res.data)) {
            setProducts(res.data)
          } else {
            setProducts([])
          }
        } else {
          setProducts([])
        }
      } catch (err) {
        console.error(err)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => window.clearTimeout(id)
  }, [search, user])

  // const handleDelete = async(e:BaseSyntheticEvent)=>{
  //   e.preventDefault()
  //   try {
  //     const res = await api.delete(`/delete-product/${productId}`)
  //     if(res?.success === true){
        
  //     }
  //   } catch (error) {
  //     toast.error(error.message || "An error occurred")
  //     console.log(error.message)
  //   }
  // }

  const renderInventory = (v: any) => {
    const qty = Number(v?.quantity ?? 0)
    const reorder = Number(v?.reorderLevel ?? 5)
    const bg = qty === 0 ? 'bg-red-500' : qty <= reorder ? 'bg-amber-500' : 'bg-emerald-500'
    const text = qty === 0 ? 'text-red-600' : qty <= reorder ? 'text-amber-600' : 'text-emerald-600'
    return (
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${bg}`} />
        <span className={`font-semibold ${text}`}>{qty === 0 ? 'Out of stock' : `${qty} unit${qty > 1 ? 's' : ''}`}</span>
      </div>
    )
  }

  const SmallCard = ({ p }: { p: any }) => {
    const v = p.variations?.[0] ?? { name: 'Default', costPrice: 0, sellingPrice: 0, quantity: 0, reorderLevel: 5 }
    return (
      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-base font-semibold text-slate-900">{p.name}</div>
            <div className="text-xs text-slate-500 mt-1 font-mono">{v.name !== 'Default' ? v.name : 'No variations'}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-600">Cost</div>
            <div className="font-semibold text-slate-900">₦{Number(v.costPrice ?? 0).toLocaleString()}</div>
            <div className="text-xs text-slate-400 mt-1">Sell: ₦{Number(v.sellingPrice ?? 0).toLocaleString()}</div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          {renderInventory(v)}
          <div className="flex gap-3">
            <button className="text-purple-600 hover:text-purple-800 font-semibold text-sm">Edit</button>
            <button className="text-slate-400 hover:text-red-600 font-semibold text-sm">Delete</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 text-gray-800">
      <header className="mb-4">
        <div>
          <h1 className="text-xs text-slate-400 font-medium tracking-wider uppercase">{formattedDate}</h1>
        </div>
        <div className="mt-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-2xl font-medium">Good Morning, {user?.firstName}</p>
            <span className="text-xs font-semibold text-slate-500">Here's what's happening with your store today.</span>
          </div>
          <div>
            <button onClick={() => setModalOpen(true)} className="flex btn-new-sale cursor-pointer items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold hover:bg-purple-100">
              <FiPlus />
              Add Product
            </button>
          </div>
        </div>
      </header>

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="w-full md:w-80 relative">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none"
              placeholder="Search products, barcodes..."
            />
          </div>
          <button className="flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50">
            <FiSliders />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        <div className="p-4">
          {loading ? (
            <div className="py-12 text-center text-slate-500">Loading products…</div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="rounded-full bg-slate-100 p-4 mb-3">
                <FiSearch size={24} className="text-slate-400" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">No products found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">Try searching or add a new product to get started.</p>
              <div className="mt-4">
                <button onClick={() => setModalOpen(true)} className="rounded-md bg-purple-50 px-4 py-2 text-sm font-semibold border border-purple-200">Add product</button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {products.map((p) => (
                  <SmallCard key={p.id ?? p.name} p={p} />
                ))}
              </div>

              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase">
                      <th className="py-4 px-6">Product Details</th>
                      <th className="py-4 px-6">Cost Price</th>
                      <th className="py-4 px-6">Selling Price</th>
                      <th className="py-4 px-6">Inventory</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {products.map((p) => {
                      const v = p.variations?.[0] ?? { name: 'Default', costPrice: 0, sellingPrice: 0, quantity: 0, reorderLevel: 5 }
                      return (
                        <tr key={p.id ?? p.name} className="hover:bg-slate-50/70">
                          <td className="py-4 px-6">
                            <div>
                              <div className="font-semibold text-slate-900">{p.name}</div>
                              <div className="text-xs text-slate-400 font-mono mt-0.5">{v.name !== 'Default' ? v.name : 'No variations'}</div>
                            </div>
                          </td>
                          <td className="py-4 px-6">₦{Number(v.costPrice ?? 0).toLocaleString()}</td>
                          <td className="py-4 px-6 font-semibold">₦{Number(v.sellingPrice ?? 0).toLocaleString()}</td>
                          <td className="py-4 px-6">{renderInventory(v)}</td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex justify-end gap-3 text-xs">
                              <button className="text-purple-600 hover:text-purple-800 font-semibold">Edit</button>
                              <button onClick={()=> setProductId(p.id) } className="text-slate-400 hover:text-red-600 font-semibold" >Delete</button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </section>

      <AddProductModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}

export default Product