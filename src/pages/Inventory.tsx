import { FiPlus } from 'react-icons/fi'

const Inventory = () => {
  const date = new Date()

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div>
      <section>
        <div>
          <h1 className="text-xs text-slate-400 font-medium tracking-wider uppercase">{formattedDate}</h1>
        </div>

        <div className="my-3 flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
          <div className="flex gap-1 flex-col">
            <p className="text-2xl font-bold tracking-tight text-gray-900">Good Morning, Alex</p>
            <span className="text-xs font-medium text-slate-500">Manage your inventory and keep operations moving.</span>
          </div>
          <div>
            <button className="flex cursor-pointer items-center gap-2 rounded-xl border border-purple-200 bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 transition-all duration-200">
              <FiPlus className="text-base" />
              New Sale
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Inventory