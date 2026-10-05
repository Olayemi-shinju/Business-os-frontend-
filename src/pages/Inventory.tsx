import { FiPlus } from 'react-icons/fi'
import '../App.css'

const Inventory = () => {
  const date = new Date()

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const mockInventoryLogs = [
    { id: 1, name: "Solar Panel 450W", sku: "SLR-450", type: "Restock", qty: 20, operator: "Alex", date: "Today, 11:30 AM", status: "Completed" },
    { id: 2, name: "Lithium Battery 100Ah", sku: "BAT-100", type: "Sale", qty: 2, operator: "Sarah", date: "Today, 09:15 AM", status: "Completed" },
    { id: 3, name: "Inverter 3KVA", sku: "INV-3KV", type: "Adjustment", qty: -1, operator: "Alex", date: "Yesterday, 04:45 PM", status: "Completed" },
    { id: 4, name: "Charge Controller MPPT", sku: "CHG-MPT", type: "Restock", qty: 15, operator: "Sarah", date: "Oct 3, 2026", status: "Completed" },
    { id: 5, name: "Solar Cable 6mm (100m)", sku: "CBL-6MM", type: "Sale", qty: 4, operator: "Alex", date: "Oct 2, 2026", status: "Completed" }
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
              New sale
            </button>
          </div>
        </div>
      </section>

   

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-sm font-bold text-gray-900">Recent Stock Movements</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Product Details</th>
                <th className="py-4 px-6">Movement Type</th>
                <th className="py-4 px-6">Quantity Change</th>
                <th className="py-4 px-6">Authorized By</th>
                <th className="py-4 px-6">Timestamp</th>
                <th className="py-4 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {mockInventoryLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">{log.name}</span>
                      <span className="text-xs text-slate-400 font-mono mt-0.5">{log.sku}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${
                      log.type === 'Restock' ? 'bg-emerald-50 text-emerald-700' : 
                      log.type === 'Sale' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-semibold">
                    <span className={log.qty > 0 ? 'text-emerald-600' : 'text-red-600'}>
                      {log.qty > 0 ? `+${log.qty}` : log.qty}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-600">{log.operator}</td>
                  <td className="py-4 px-6 text-slate-500">{log.date}</td>
                  <td className="py-4 px-6 text-right">
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                      {log.status}
                    </span>
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

export default Inventory
