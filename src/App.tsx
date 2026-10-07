import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Overview from "./pages/Overview";
import Product from "./pages/Product";
import Inventory from "./pages/Inventory";
import Sales  from "./pages/Sales";
import Staff from "./pages/Staff";
import Settings from "./pages/Settings";
import Login from "./authentication/Login";
import Register from "./authentication/Register";

function App(){
    return(
       <BrowserRouter>

            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route element={<Layout/>}>
                <Route path="/" element={<Overview/>}/>
                <Route path="products" element={<Product/>}/>
                <Route path="inventory" element={<Inventory/>}/>
                <Route path="sales" element={<Sales/>}/>
                <Route path="staff" element={<Staff/>}/>
                <Route path="settings" element={<Settings/>}/>
              </Route>
            </Routes>
       
        </BrowserRouter>
    )
}


export default App;