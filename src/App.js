import React from "react";
import Login from "./Pages/Login";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "./Pages/AdminLogin";
import Users from "./Pages/Users";
import Admin from "./Pages/Admin";

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
