import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import UserRegister from "./pages/User/UserRegister";
import UserLogin from "./pages/User/UserLogin";
import CreatorRegister from "./pages/Creator/CreatorRegister";
import CreatorLogin from "./pages/Creator/CreatorLogin";
import AdminRegister from "./pages/Admin/AdminRegister";
import AdminLogin from "./pages/Admin/AdminLogin";
import SelectRole from "./pages/SelectRole";
import UploadVideo from "./pages/Creator/Videoupload";
import UserFeed from "./pages/User/UserDashboard";
const App = () => {
  return (
    
      <Routes>
      <Route path="/" element={<SelectRole />} />c

        {/* User Routes */}
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
      </Routes>
   
  );
};

export default App;
