import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import Home from "./pages/user/Home";
import Buy from "./pages/user/Buy";
import Rent from "./pages/user/Rent";
import Contact from "./pages/user/Contact";
import ListProperty from "./pages/user/ListProperty";
import SingleBuyProperty from "./pages/user/SingleBuyProperty";
import SingleRentProperty from "./pages/user/SingleRentProperty";
import Wishlist from "./pages/user/Wishlist";
import { AppContext } from "./context/AppContext";
import ServerDown from "./components/common/ServerDown";

const App = () => {
  const { isConnected, loading } = useContext(AppContext);

  if (!loading && !isConnected) {
    return <ServerDown />;
  }

  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/property/sale/:id" element={<SingleBuyProperty />} />
          <Route path="/property/rent/:id" element={<SingleRentProperty />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/list-property" element={<ListProperty />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
