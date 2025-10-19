import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/HomePage/js_files/LoginPage";
import SignUpPage from "./components/HomePage/js_files/SignUpPage";
import Dashboard from "./components/HomePage/js_files/DashBoard";
import SalePage from "./components/HomePage/js_files/Sale";
import CartItems from "./components/HomePage/js_files/CartProducts";

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sale" element={<SalePage />} />
          <Route path="/check-cart" element={<CartItems/>} />
          <Route path="/order-now" element={<div>Order Now Page</div>} />
          <Route path="/cart" element={<div>Cart Page</div>} />
          <Route path="/select-product" element={<div>Select Your Product Page</div>} />
          <Route path="/checkout-plan" element={<div>Checkout Your Plan Page</div>} />
          <Route path="/shop" element={<div>Shop Page</div>} />
          <Route path="/shopping-stores" element={<div>Shopping Stores Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;
