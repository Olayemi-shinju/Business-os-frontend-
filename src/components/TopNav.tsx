import React from 'react'
import { useLocation } from 'react-router-dom';
import { FaBell } from "react-icons/fa6";
const TopNav = () => {
    const location = useLocation()

    const rawPath = location.pathname.split("/")[1];
    const pageName = rawPath
        ? rawPath.charAt(0).toUpperCase() + rawPath.slice(1)
        : "Overview";
    return (

        <div className='w-full border-b border-b-slate-300/50 p-5 h-15 bg-white/70 backdrop-blur-md shadow-md flex items-center'>
            <div className='flex justify-between items-center w-full'>
                <div className='flex gap-2'>
                    <p className="font-extralight text-xs text-gray-700">WorkShop</p>
                    <span className="font-extralight text-xs text-gray-700">/</span>
                    <p className="font-bold text-xs text-gray-700">{pageName}</p>
                </div>
                <div className='flex items-center gap-4'>
                    <div className="relative cursor-pointer">
                       
                        <FaBell className="text-xl text-gray-600" />

          
                        <span className="absolute top-0 right-1 transform translate-x-0.5 -translate-y-0.5 bg-red-500 w-1 h-1 rounded-full border border-white"></span>
                    </div>

                    <div className='cursor-pointer'>
                        <h1 className='bg-blue-900 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center'>AB</h1>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TopNav;
