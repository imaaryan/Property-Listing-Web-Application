import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import Home from "./pages/user/Home";
import Buy from "./pages/user/Buy";
import Rent from "./pages/user/Rent";
import Contact from "./pages/user/Contact";
import ListProperty from "./pages/user/ListProperty";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/list-property" element={<ListProperty />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
