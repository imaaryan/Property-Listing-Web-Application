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
import BuyListings from "./pages/admin/BuyListings";
import AddBuyProperty from "./pages/admin/AddBuyProperty";
import AddRentProperty from "./pages/admin/AddRentProperty";
import RentListings from "./pages/admin/RentListings";
import Locations from "./pages/admin/Locations";
import Amenities from "./pages/admin/Amenities";
import SellerEnquiries from "./pages/admin/SellerEnquiries";

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
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/buy-listings" element={<BuyListings />} />
          <Route path="/admin/buy-listings/add" element={<AddBuyProperty />} />
          <Route
            path="/admin/buy-listings/edit/:id"
            element={<AddBuyProperty />}
          />
          <Route
            path="/admin/rent-listings/add"
            element={<AddRentProperty />}
          />
          <Route
            path="/admin/rent-listings/edit/:id"
            element={<AddRentProperty />}
          />
          <Route path="/admin/rent-listings" element={<RentListings />} />
          <Route path="/admin/add-locations" element={<Locations />} />
          <Route path="/admin/add-amenities" element={<Amenities />} />
          <Route path="/admin/seller-enquiries" element={<SellerEnquiries />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
