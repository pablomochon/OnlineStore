import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Home";
import Profile from "./components/layout/Profile";
import BoardAdmin from "./components/BoardAdmin";
import { Nav } from "./components/layout/Nav";
import AddProduct  from "./components/form/AddProduct";
import PutProduct from "./components/form/PutProduct"
import AddCategory from "./components/form/AddCategory";
import DeleteProduct from "./components/form/DeleteProduct";
import EditCategory from "./components/form/EditCategory";
import CartDetail from "./components/cart/CartDetail";
import Checkout from "./components/cart/Checkout";

const App = () => {

  return (
    <>
      <Nav></Nav>
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
          <Route path="/cart" element={<CartDetail/>}></Route>
          <Route path="/cart/checkout" element={<Checkout/>}></Route>

        </Routes>
    </>
  );
};

export default App;