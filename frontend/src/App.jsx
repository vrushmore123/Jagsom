import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import UserRegister from "./pages/User/UserRegister";
import UserLogin from "./pages/User/UserLogin";
import CreatorRegister from "./pages/Creator/CreatorRegister";
import CreatorLogin from "./pages/Creator/CreatorLogin";
import AdminRegister from "./pages/Admin/AdminRegister";
import AdminLogin from "./pages/Admin/AdminLogin";
import Navbar from "./components/Navbar";
import Visuals from "./pages/User/UserVisuals";
import CreaterDashboard from "./pages/Creator/CreatorDashboard";
import SelectRole from "./pages/SelectRole";
import UserDashboard from "./pages/User/Dashboard";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/dashboard" element={<UserFeed />} />

        {/* Creator Routes */}
        <Route path="/creator/register" element={<CreatorRegister />} />
        <Route path="/creator/login" element={<CreatorLogin />} />
        <Route path="/creator/upload" element={<UploadVideo />} />

        {/* Admin Routes */}
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/User/UserVisuals" element={<Visuals />} />
        <Route path="/select-role" element={<SelectRole />} />
      </Routes>
    </>
  );
};

export default App;
