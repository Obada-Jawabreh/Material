import { useState } from "react";
import "./App.css";
import { Route, BrowserRouter, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Material from "./pages/Material/Material";
import MaterialDetails from "./pages/MaterialDetails/MaterialDetails";
import { ToastContainer } from "react-toastify";
import Login from "./Pages/Login/Login";
import Register from "./Pages/register/register";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manage-material" element={<Material />} />
          <Route path="/material-details/:id" element={<MaterialDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>{" "}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
      />
    </>
  );
}

export default App;
