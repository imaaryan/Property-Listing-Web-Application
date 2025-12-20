import React from "react";
import { RiMenuLine, RiLogoutBoxRLine } from "@remixicon/react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/kk-admin");
  };

  return (
    <header className="h-20 bg-white shadow-sm flex items-center justify-between px-6 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <RiMenuLine size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800 ">
         Admin Dashboard
        </h1>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
      >
        <RiLogoutBoxRLine size={20} />
        <span>Logout</span>
      </button>
    </header>
  );
};

export default AdminNavbar;
