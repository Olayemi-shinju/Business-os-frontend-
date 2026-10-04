import { FiPlus } from "react-icons/fi";
import "../App.css"
import StatCard from "../components/StatCard";
import SalesOverviewChart from "../components/SalesOverviewChart";
import TopProductsChart from "../components/TopProductsChart";
import RecentSalesTable from "../components/RecentSalesTable";
import LowStockTable from "../components/LowStockTable";
const Overview = () => {
  const date = new Date()

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      {/* section 1 */}
      <section>
        <div>
          <h1 className="text-xs text-slate-500 font-light">{formattedDate}</h1>
        </div>

        <div className="my-3 flex justify-between w-full">
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



      {/* section 2 */}

      <section>
        <StatCard />
      </section>

      {/* section 3 */}
      <section className="w-full">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">


          <div className="lg:col-span-2 w-full">
            <SalesOverviewChart />
          </div>


          <div className="lg:col-span-1 w-full">
            <TopProductsChart />
          </div>

        </div>
      </section>


      {/* section 4 */}

      <section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mt-4">
          <div className="lg:col-span-1 w-full">
            <LowStockTable/>
          </div>
          <div className="lg:col-span-2 w-full">
            <RecentSalesTable/>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Overview