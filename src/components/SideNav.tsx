import { IoStorefrontSharp } from "react-icons/io5";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { AiFillProduct } from "react-icons/ai";
import { MdOutlineInventory } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdPerson } from "react-icons/io";
import { NavLink } from "react-router-dom";
import "../App.css";

const workSpace = [
    {
        label: "Overview",
        path: "/",
        icon: IoStorefrontSharp
    },
    {
        label: "Products",
        path: "/products",
        icon: AiFillProduct
    },
    {
        label: "Inventory",
        path: "/inventory",
        icon: MdOutlineInventory,
        notification: 3 
    },
    {
        label: "Sales",
        path: "/sales",
        icon: FiShoppingCart
    },
    {
        label: "Staff",
        path: "/staff",
        icon: IoMdPerson
    },
];

const Manage = [
    {
        label: "Purchase Order",
        path: "/order",
        icon: IoMdPerson
    },
    {
        label: "Report",
        path: "/report",
        icon: IoMdPerson
    },
    {
        label: "Suppliers",
        path: "/supplies",
        icon: IoMdPerson
    },
    {
        label: "Settings",
        path: "/settings",
        icon: IoMdPerson
    },
]

const date = new Date().getFullYear()

const SideNav = () => {
    return (
       
        <div className="w-16 md:w-1/6 bg-white/70 backdrop-blur-md h-screen border-r border-slate-300/50 text-gray-700 shadow-xl transition-all duration-300">

            {/* section 1 */}
            <section>
                <div className="flex gap-2 mt-4 items-center justify-center cursor-pointer">
                    <div>
                        <RiBarChartHorizontalLine className="font-extrabold text-xl text-purple-800" />
                    </div>
                    <div className="hidden md:block">
                        <p className="font-bold text-lg text-purple-800">Store Name</p>
                    </div>
                </div>
              
            </section>

            {/* section 2 */}
            <section>
                <div className="px-5 py-4 mt-7 hidden md:block">
                    <div>
                        <p className="text-xs font-semibold text-slate-400 text-shadow-2xs">WORK SPACE</p>
                    </div>
                </div>

                <div className="flex flex-col gap-1 px-2 md:px-3 mt-4 md:mt-0">
                    {workSpace?.map(({ label, path, icon: Icon, notification }) => (
                        <NavLink
                            key={path}
                            to={path}
                            className="nav-link flex items-center justify-center md:justify-between w-full"
                        >

                            <div className="flex items-center gap-3">
                                <Icon className="text-md shrink-0 text-slate-400" />
                                <span className="font-medium text-xs text-slate-500 hidden md:block">{label}</span>
                            </div>

                            {notification !== undefined && notification > 0 && (
                                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-3 text-center leading-none hidden md:block">
                                    {notification}
                                </span>
                            )}
                        </NavLink>
                    ))}
                </div>
            </section>

            {/* section 3 */}
            <section>
                <div className="px-5 py-4 hidden md:block">
                    <div>
                        <p className="text-xs font-semibold text-slate-400 text-shadow-2xs">MANAGE</p>
                    </div>
                </div>

                <div className="flex flex-col gap-1 px-2 md:px-3">
                    {Manage?.map(({ label, path, icon: Icon }) => (
                        <NavLink
                            key={path}
                            to={path}
                            className="nav-link flex items-center justify-center md:justify-between w-full"
                        >

                            <div className="flex items-center gap-3">
                                <Icon className="text-md shrink-0 text-slate-400" />
                                <span className="font-medium text-xs text-slate-500 hidden md:block">{label}</span>
                            </div>

                        </NavLink>
                    ))}

                </div>
                <div className="p-5 mt-9 hidden md:block">
                    <hr className="border-slate-400" />
                </div>
                <div className="hidden md:block">
                    <p className="text-xs text-center text-slate-500 font-extralight">© {`${date}`} AOD Solatricity</p>
                </div>
            </section>
        </div>
    );
};

export default SideNav;
