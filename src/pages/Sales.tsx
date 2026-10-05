import { FiPlus } from 'react-icons/fi'
import '../App.css'

const Sales = () => {
  const date = new Date()

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const mockSalesLogs = [
    { id: 1, invoice: "INV-2026-001", customer: "AOD Solatricity", items: 4, total: 720, method: "Bank Transfer", date: "Today, 11:30 AM", status: "Paid" },
    { id: 2, invoice: "INV-2026-002", customer: "Highland Greens", items: 1, total: 499, method: "Card", date: "Today, 09:15 AM", status: "Paid" },
    { id: 3, invoice: "INV-2026-003", customer: "Capital Hub Ltd", items: 2, total: 590, method: "Bank Transfer", date: "Yesterday, 04:45 PM", status: "Pending" },
    { id: 4, invoice: "INV-2026-004", customer: "Private Client", items: 1, total: 75, method: "Cash", date: "Oct 3, 2026", status: "Paid" },
    { id: 5, invoice: "INV-2026-005", customer: "Olayemi Towers", items: 3, total: 270, method: "Card", date: "Oct 2, 2026", status: "Paid" }
  ]

  return (
    <div className='min-h-screen p-8 bg-gray-50 text-gray-800'>
      <section>
        <div>
          <h1 className="text-xs text-slate-400 font-medium tracking-wider uppercase">{formattedDate}</h1>
        </div>

        <div className="my-3 flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
          <div className="flex gap-3 flex-col">
            <p className="text-2xl font-medium text-gray-900">Good Morning, Alex</p>
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

   
      <section className="mt-8 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-sm font-bold text-gray-900">Recent Sales Transactions</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Invoice Number</th>
                <th className="py-4 px-6">Client / Customer</th>
                <th className="py-4 px-6">Items Sold</th>
                <th className="py-4 px-6">Payment Method</th>
                <th className="py-4 px-6">Timestamp</th>
                <th className="py-4 px-6 text-right">Amount / Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-gray-700">
              {mockSalesLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-mono text-xs font-bold text-gray-900">{log.invoice}</td>
                  <td className="py-4 px-6 font-medium text-gray-900">{log.customer}</td>
                  <td className="py-4 px-6 text-slate-500">{log.items} {log.items === 1 ? 'item' : 'items'}</td>
                  <td className="py-4 px-6 text-slate-500">{log.method}</td>
                  <td className="py-4 px-6 text-slate-400 text-xs">{log.date}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex flex-col items-end">
                      <span className="font-semibold text-gray-900">₦{log.total.toLocaleString()}</span>
                      <span className={`text-[10px] uppercase font-bold tracking-wider mt-0.5 ${
                        log.status === 'Paid' ? 'text-gray-500' : 'text-amber-600'
                      }`}>
                        {log.status}
                      </span>
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

export default Sales
