import React from "react";
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
//import "bootstrap/js/src/collapse.js";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import AddProduct from "./components/Admin/AddProduct.js";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import ListProducts from "./components/User/ListProducts.js";
import EditProfile from "./components/User/EditProfile.js";
import SelectedProd from "./components/User/SelectedProd.js";
import Home from "./components/General/Home.js";
import LogOut from "./components/General/LogOut.js";
import Cart from "./components/User/Cart.js";
import EditProducts from "./components/Admin/EditProduct";
import PayPal from "./components/User/PayPal";
import Footer from "./components/General/Footer";
import Success from "./components/User/Success";
import Orders from "./components/User/Orders";
import SelectedOrder from "./components/User/SelectedOrder";

import { ReactSession } from "react-client-session";
import KommunicateChat from "./chat.js";

ReactSession.setStoreType("localStorage"); // like cookies

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/addProd" element={<AddProduct />} />
              <Route exact path="/signup" element={<Register />} />
              <Route exact path="/products" element={<ListProducts />} />
              <Route exact path="/editprofile" element={<EditProfile />} />
              <Route exact path="/productDetails" element={<SelectedProd />} />
              <Route exact path="/logout" element={<LogOut />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/paypal" element={<PayPal />} />
              <Route exact path="/editproducts" element={<EditProducts />} />
              <Route exact path="/success" element={<Success />} />
              <Route exact path="/orders" element={<Orders />} />
              <Route exact path="/orderDetails" element={<SelectedOrder />} />
            </Routes>
          </div>
          {ReactSession.get("userEmail") !== "admin@gmail.com" && (
            <div>
              <KommunicateChat />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
