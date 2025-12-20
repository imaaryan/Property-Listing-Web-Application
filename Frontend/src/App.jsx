import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import Home from "./pages/user/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Buy from "./pages/user/Buy";
import Rent from "./pages/user/Rent";
import Contact from "./pages/user/Contact";
import ListProperty from "./pages/user/ListProperty";
import SingleBuyProperty from "./pages/user/SingleBuyProperty";
import SingleRentProperty from "./pages/user/SingleRentProperty";
import Wishlist from "./pages/user/Wishlist";
import { AppContext } from "./context/AppContext";
import ServerDown from "./components/common/ServerDown";
import ScrollToTop from "./components/common/ScrollToTop";
import About from "./pages/user/About";
import Login from "./pages/admin/Login";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";

const App = () => {
  const { isConnected, loading } = useContext(AppContext);

  if (!loading && !isConnected) {
    return <ServerDown />;
  }

  return (
    <>
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* User Routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/property/sale/:id" element={<SingleBuyProperty />} />
          <Route path="/property/rent/:id" element={<SingleRentProperty />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/list-property" element={<ListProperty />} />
          <Route path="/about" element={<About />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/kk-admin" element={<Login />} />

        <Route element={<AdminLayout />}>
          <Route path="/admin-dashboard" element={<Dashboard />} />
          {/* Placeholders for other admin pages */}
          <Route
            path="/admin/buy-listings"
            element={<div className="p-4">Buy Listings Content</div>}
          />
          <Route
            path="/admin/rent-listings"
            element={<div className="p-4">Rent Listings Content</div>}
          />
          <Route
            path="/admin/add-locations"
            element={<div className="p-4">Add Locations Content</div>}
          />
          <Route
            path="/admin/add-amenities"
            element={<div className="p-4">Add Amenities Content</div>}
          />
          <Route
            path="/admin/seller-enquiries"
            element={<div className="p-4">Seller Enquiries Content</div>}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
