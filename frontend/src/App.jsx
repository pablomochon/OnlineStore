import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardAdmin from "./components/BoardAdmin";
import { Nav } from "./components/Nav";
import AddProduct  from "./components/form/AddProduct";
import PutProduct from "./components/form/PutProduct"
import AddCategory from "./components/form/AddCategory";
import DeleteProduct from "./components/form/DeleteProduct";
import EditCategory from "./components/form/EditCategory";
import DeleteCategory from "./components/form/DeleteCategory";
import CartDetail from "./components/CartDetail";
import Checkout from "./components/form/CheckoutForm";
import SeeOrders from "./components/SeeOrders";

const App = () => {

  return (
    <div>
      <Nav></Nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

          <Route path="/profile" element={<Profile/>} />
          <Route path="/admin" element={<BoardAdmin/>} />

          <Route path="/admin/addProducts" element={<AddProduct/>} />
          <Route path="/admin/putProduct" element={<PutProduct/>} />
          <Route path="/admin/deleteProduct" element={<DeleteProduct/>} />

          <Route path="/admin/addCategories" element={<AddCategory/>} />
          <Route path="/admin/editCategories" element={<EditCategory/>} />
          <Route path="/admin/deleteCategories" element={<DeleteCategory/>} />

          <Route path="/cart" element={<CartDetail/>}></Route>
          <Route path="/cart/checkout" element={<Checkout/>}></Route>
          <Route path="/myOrders" element={<SeeOrders/>}></Route>

        </Routes>
      </div>
    </div>
  );
};

export default App;