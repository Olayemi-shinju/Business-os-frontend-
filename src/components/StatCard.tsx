import React from 'react'
import { AiFillProduct } from "react-icons/ai"
import { MdOutlineInventory } from "react-icons/md";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { LuCircleDollarSign } from "react-icons/lu";
const StatCards = () => {
  return (
   
    <div className='flex flex-col sm:flex-row gap-4 w-full p-4'>
        
     
        <div className='flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm flex-1'>
               <div className='flex items-center justify-center p-2 rounded-lg bg-purple-100 text-purple-600 shrink-0 w-9 h-9'>
                <AiFillProduct className='text-lg'/>
            </div>

            
            <div className='flex flex-col gap-1'>
                <span className='text-xs text-slate-400 font-semibold tracking-wide'>Total Products</span>
                <p className='text-xl font-bold text-slate-800'>254</p>
                <p className='text-xs text-slate-400 font-medium mt-1'>12 this month</p>
            </div>
        </div>

     
        <div className='flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm flex-1'>

            <div className='flex items-center justify-center p-2 rounded-lg bg-green-100 text-green-600 shrink-0 w-9 h-9'>
                <MdOutlineInventory className='text-lg'/>
            </div>

         
            <div className='flex flex-col gap-1'>
                <span className='text-xs text-slate-400 font-semibold tracking-wide'>Total Stock Units</span>
                <p className='text-xl font-bold text-slate-800'>1,864</p>
                <p className='text-xs text-green-400 font-medium mt-1'>8.2% from last week</p>
            </div>
        </div>

          <div className='flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm flex-1'>

            <div className='flex items-center justify-center p-2 rounded-lg bg-orange-100 text-orange-600 shrink-0 w-9 h-9'>
                <HiOutlineExclamationTriangle className='text-lg'/>
            </div>

         
            <div className='flex flex-col gap-1'>
                <span className='text-xs text-slate-400 font-semibold tracking-wide'>Low Stock Product</span>
                <p className='text-xl font-bold text-slate-800'>254</p>
                <p className='text-xs text-orange-300 font-medium mt-1'>Needs your attention</p>
            </div>
        </div>

          <div className='flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm flex-1'>

            <div className='flex items-center justify-center p-2 rounded-lg bg-sky-100 text-sky-600 shrink-0 w-9 h-9'>
                <LuCircleDollarSign className='text-lg'/>
            </div>

         
            <div className='flex flex-col gap-1'>
                <span className='text-xs text-slate-400 font-semibold tracking-wide'>Today's Sales</span>
                <p className='text-xl font-bold text-slate-800'>₦233,480.50</p>
                <p className='text-xs text-sky-400 font-medium mt-1'>14.6% from yesterday</p>
            </div>
        </div>
    </div>
  )
}

export default StatCards
