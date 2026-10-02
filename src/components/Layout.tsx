import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import TopNav from "./TopNav";

const Layout = () => {
    return (
        <div className="flex h-scree">
            <SideNav />
            <main className="flex-1 overflow-y-auto">
                <TopNav/>
                <Outlet />
            </main>
        </div>
    );
  
}

export default Layout