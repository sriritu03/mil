import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// Import components
import Front from "./Components/Front";
import User_login from "./Components/User/User_login";
import User_registration from "./Components/User/User_registration";
import User_dashboard from "./Components/User/User_dashboard";
import Vendor_login from "./Components/Vendor/Vendor_login";
import Vendor_registration from "./Components/Vendor/Vendor_registration";
import Vendor_dashboard from "./Components/Vendor/Vendor_dashboard";

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/");
  };

  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Front />} />

      {/* User */}
      <Route path="/user_login" element={<User_login />} />
      <Route path="/user_registration" element={<User_registration />} />
      <Route path="/user_dashboard" element={<User_dashboard onLogout={handleLogout} />} />

      {/* Vendor */}
      <Route path="/vendor_login" element={<Vendor_login />} />
      <Route path="/vendor_registration" element={<Vendor_registration />} />
      <Route path="/vendor_dashboard" element={<Vendor_dashboard onLogout={handleLogout} />} />

      {/* 404 */}
      <Route
        path="*"
        element={<h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2>}
      />
    </Routes>
  );
}

export default App;