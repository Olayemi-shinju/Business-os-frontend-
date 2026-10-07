import { IoStorefrontSharp } from "react-icons/io5";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { AiFillProduct } from "react-icons/ai";
import { MdOutlineInventory } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdPerson } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import "../App.css";

const workSpace = [
    { label: "Overview", path: "/", icon: IoStorefrontSharp },
    { label: "Products", path: "/products", icon: AiFillProduct },
    { label: "Inventory", path: "/inventory", icon: MdOutlineInventory, notification: 3 },
    { label: "Sales", path: "/sales", icon: FiShoppingCart },
    { label: "Staff", path: "/staff", icon: IoMdPerson },
];

const Manage = [
    { label: "Settings", path: "/settings", icon: IoSettingsOutline },
];

const currentYear = new Date().getFullYear();

const SideNav = () => {
    return (

        <div className="w-16 md:w-1/6  inset-y-0 left-0 z-50 bg-white/70 backdrop-blur-md h-screen border-r border-slate-200 text-gray-700 shadow-xl transition-all duration-300 flex flex-col justify-between pb-4">


            <div>

                <section className="h-16 flex items-center px-4 md:px-6 border-b border-slate-100">
                    <div className="flex gap-3 items-center w-full justify-center md:justify-start cursor-pointer">
                        <RiBarChartHorizontalLine className="font-extrabold text-xl text-purple-800 shrink-0" />
                        <span className="font-bold text-base text-purple-800 hidden md:block tracking-wide">Store Name</span>
                    </div>
                </section>


                <section className="mt-4">
                    <div className="px-4 md:px-6 py-2 hidden md:block">
                        <p className="text-[10px] font-bold text-slate-400 tracking-wider">WORK SPACE</p>
                    </div>

                    <div className="flex flex-col gap-1 px-2 md:px-3">
                        {workSpace.map(({ label, path, icon: Icon, notification }) => (
                            <NavLink
                                key={path}
                                to={path}

                                className='flex items-center nav-link justify-center md:justify-between w-full p-2.5 rounded-lg text-sm'

                            >
                                <div className="flex items-center gap-3">

                                    <Icon className="text-lg shrink-0 transition-colors duration-200" />
                                    <span className="hidden md:block">{label}</span>
                                </div>

                                {notification !== undefined && notification > 0 && (

                                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4 text-center leading-none hidden md:block">
                                        {notification}
                                    </span>
                                )}
                            </NavLink>
                        ))}
                    </div>
                </section>


                <section className="mt-4">
                    <div className="px-4 md:px-6 py-2 hidden md:block">
                        <p className="text-[10px] font-bold text-slate-400 tracking-wider">MANAGE</p>
                    </div>

                    <div className="flex flex-col gap-1 px-2 md:px-3">
                        {Manage.map(({ label, path, icon: Icon }) => (
                            <NavLink
                                key={path}
                                to={path}
                                className='flex items-center nav-link justify-center md:justify-between w-full p-2.5 rounded-lg text-sm'
                                
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className="text-lg shrink-0 transition-colors duration-200" />
                                    <span className="hidden md:block">{label}</span>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </section>
            </div>


            <section className="hidden md:block px-4 md:px-6">
                <div className="mb-3">
                    <hr className="border-slate-200" />
                </div>
                <p className="text-[10px] text-center text-slate-400 font-normal">
                    © {currentYear} AOD Solatricity
                </p>
            </section>
        </div>
    );
};

export default SideNav;
