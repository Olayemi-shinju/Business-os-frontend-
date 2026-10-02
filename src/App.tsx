import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Overview from "./pages/Overview";
import Product from "./pages/Product";
import Inventory from "./pages/Inventory";
import Sales  from "./pages/Sales";
import Staff from "./pages/Staff";
import PurchaseOrder from "./pages/PurchaseOrder";
import Supplies from "./pages/Supplies";
import Report from "./pages/Report";
import Settings from "./pages/Settings";

function App(){
    return(
       <BrowserRouter>
            <Routes>
              <Route element={<Layout/>}>
                <Route path="/" element={<Overview/>}/>
                <Route path="products" element={<Product/>}/>
                <Route path="inventory" element={<Inventory/>}/>
                <Route path="sales" element={<Sales/>}/>
                <Route path="staff" element={<Staff/>}/>
                <Route path="order" element={<PurchaseOrder/>}/>
                <Route path="supplies" element={<Supplies/>}/>
                <Route path="report" element={<Report/>}/>
                <Route path="settings" element={<Settings/>}/>


              </Route>
            </Routes>
       
        </BrowserRouter>
    )
}


export default App;