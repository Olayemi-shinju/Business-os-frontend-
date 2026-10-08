import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import CreateStaff from '../modal/CreateStaff'
import '../App.css'

const Staff = () => {
  const date = new Date()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const staffMembers = [
    { id: 1, name: "Alex", email: "alex@store.com", role: "Admin / Owner", shiftStatus: "Active", access: "Full Control" },
    { id: 2, name: "Sarah", email: "sarah@store.com", role: "Store Staff", shiftStatus: "Active", access: "Sales & Stock Only" }
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
            <span className="text-xs font-semibold text-slate-500">Manage Your Staff.</span>
          </div>
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex btn-new-sale cursor-pointer items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold transition-colors duration-200"
            >
              <FiPlus className="text-base" />
              Add Staff
            </button>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-sm font-bold text-gray-900">System Users directory</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">User / Identity</th>
                <th className="py-4 px-6">System Role</th>
                <th className="py-4 px-6">Scope of Access</th>
                <th className="py-4 px-6 text-right">Session Security</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-gray-700">
              {staffMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600 border border-slate-200">
                        {member.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">{member.name}</span>
                        <span className="text-xs text-slate-400">{member.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">{member.role}</td>
                  <td className="py-4 px-6 text-xs text-slate-500 font-mono">{member.access}</td>
                  <td className="py-4 px-6 text-right">
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                      {member.shiftStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <CreateStaff
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default Staff
