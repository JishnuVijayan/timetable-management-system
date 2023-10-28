import React from "react";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Users from "./pages/Users";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/users" element={<Users />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}
