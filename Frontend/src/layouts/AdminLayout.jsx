import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  RiDashboardLine,
  RiHomeSmile2Line,
  RiBuilding2Line,
  RiMapPinAddLine,
  RiListSettingsLine,
  RiUserVoiceLine,
} from "@remixicon/react";
import logo from "../assets/Logo.svg";
import AdminNavbar from "../components/admin/AdminNavbar";
import AdminFooter from "../components/admin/AdminFooter";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/kk-admin");
    }
  }, [navigate]);

  const navItems = [
    { name: "Dashboard", path: "/admin-dashboard", icon: RiDashboardLine },
    {
      name: "Buy Listings",
      path: "/admin/buy-listings",
      icon: RiHomeSmile2Line,
    },
    {
      name: "Rent Listings",
      path: "/admin/rent-listings",
      icon: RiBuilding2Line,
    },
    {
      name: "Add Locations",
      path: "/admin/add-locations",
      icon: RiMapPinAddLine,
    },
    {
      name: "Add Amenities",
      path: "/admin/add-amenities",
      icon: RiListSettingsLine,
    },
    {
      name: "Seller Enquiries",
      path: "/admin/seller-enquiries",
      icon: RiUserVoiceLine,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-30 transform transition-transform duration-300 md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
          <Link to="/admin-dashboard" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-12" />
          
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                }`
              }
              onClick={() => setIsSidebarOpen(false)} // Close on mobile click
            >
              <item.icon
                size={22}
                className={({ isActive }) =>
                  isActive
                    ? "text-white"
                    : "text-gray-400 group-hover:text-primary"
                }
              />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Admin</p>
              <p className="text-xs text-gray-500">Super User</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <AdminNavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Accessing Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F4F7FE] p-6 flex flex-col">
          <div className="flex-1">
            <Outlet />
          </div>
          <AdminFooter />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
