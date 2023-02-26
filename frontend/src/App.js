import {BrowserRouter as Router ,Routes, Route , Switch} from "react-router-dom"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Categories from "./pages/Categories";
import Home from "./pages/Home";
import Mycart from "./pages/Mycart";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import 'react-slideshow-image/dist/styles.css'
import Admin from "./pages/Admin";
import AddCategory from "./pages/AddCategory";
import Addproducts from "./pages/Addproducts";
import Mainchart from "./charts/Mainchart";
import Success from "./pages/Success";
import Failure from "./pages/Failure";
import Reset from "./pages/Reset";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" element={<Signin/>}/>
          <Route path = ":custid/categories" element={<Categories/>}/>
          <Route path = ":custid/products/:catId" element={<Products/>}/>
          <Route path = ":custid/product/:ProductId" element = {<Product/>}/>
          <Route path = "/register" element={<Register/>}/>
          <Route path = "/signin" element ={<Signin/>}/>
          <Route path = ":custid/Cart" element ={<Mycart/>}/>
          <Route path="/63e3adfdd2d5589da11012f1/admin" element = {<Admin/>}/>
          <Route path = "/63e3adfdd2d5589da11012f1/admin/Addcat" element ={<AddCategory/>}/>
          <Route path = "/63e3adfdd2d5589da11012f1/admin/Addproduct" element ={<Addproducts/>}/>
          <Route path = "/63e3adfdd2d5589da11012f1/admin/charts" element ={<Mainchart/>}/>
          <Route path = "/success" element ={<Success/>}/>
          <Route path = "/failure" element ={<Failure/>}/>
          <Route path = "/reset" element = {<Reset/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
