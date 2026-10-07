import { FiPlus, FiSearch, FiSliders } from 'react-icons/fi'

const Product = () => {
  const date = new Date()

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const mockProducts = [
    { id: 1, name: "Solar Panel 450W", sku: "SLR-450", category: "Energy", cost: 120, price: 180, qty: 34 },
    { id: 2, name: "Lithium Battery 100Ah", sku: "BAT-100", category: "Storage", cost: 350, price: 499, qty: 3 },
    { id: 3, name: "Inverter 3KVA", sku: "INV-3KV", category: "Electronics", cost: 210, price: 295, qty: 12 },
    { id: 4, name: "Charge Controller MPPT", sku: "CHG-MPT", category: "Electronics", cost: 45, price: 75, qty: 0 },
    { id: 5, name: "Solar Cable 6mm (100m)", sku: "CBL-6MM", category: "Accessories", cost: 60, price: 90, qty: 8 }
  ]

  return (
    <div className='min-h-screen p-8 bg-gray-50 text-gray-800'>
      <section>
        <div>
          <h1 className="text-xs text-slate-400 font-medium tracking-wider uppercase">{formattedDate}</h1>
        </div>

        <div className="my-3 flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
          <div className="flex gap-3 flex-col">
            <p className="text-2xl font-medium">Good Morning, Alex</p>
            <span className="text-xs font-semibold text-slate-500">Here's what's happening with your store today.</span>
          </div>
          <div>
            <button className="flex btn-new-sale cursor-pointer items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold transition-colors duration-200">
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
              placeholder="Search products, SKUs..." 
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
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Product Details</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Cost Price</th>
                <th className="py-4 px-6">Selling Price</th>
                <th className="py-4 px-6">Inventory</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {mockProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">{product.name}</span>
                      <span className="text-xs text-slate-400 font-mono mt-0.5">{product.sku}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-700">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-600">₦{product.cost}</td>
                  <td className="py-4 px-6 font-semibold text-gray-900">₦{product.price}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        product.qty === 0 ? 'bg-red-500' : product.qty <= 5 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`} />
                      <span className={`font-semibold ${
                        product.qty === 0 ? 'text-red-600' : product.qty <= 5 ? 'text-amber-600' : 'text-emerald-600'
                      }`}>
                        {product.qty === 0 ? 'Out of stock' : `${product.qty} units`}
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
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default Product
