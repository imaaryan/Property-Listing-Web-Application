import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  RiBuildingLine,
  RiMenu3Line,
  RiHome3Line,
  RiContactsLine,
  RiCommunityLine,
  RiHeart3Line,
} from "@remixicon/react";
import { assets } from "../../assets/dummyData.js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/", icon: RiHome3Line },
    { name: "Buy", href: "/buy", icon: RiBuildingLine },
    { name: "Rent", href: "/rent", icon: RiCommunityLine },
    { name: "Wishlist", href: "/wishlist", icon: RiHeart3Line },
    { name: "Contact", href: "/contact", icon: RiContactsLine },
  ];

  return (
    <>
      <div className="flex justify-between items-center p-2 md:p-4 pr-4 w-full max-w-[1440px] mx-auto">
        <img
          onClick={() => {
            navigate("/");
          }}
          src={assets.logo}
          alt="logo"
          className="w-56"
        />

        <div className="grid justify-items-center-safe w-full">
          {/* Desktop MenuBar */}
          <div className="hidden md:block">
            <ul className="flex gap-5 lg:gap-10 items-center ">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    {item.href === location.pathname ? (
                      <div className="flex cursor-pointer text-primary">
                        <a
                          className="flex items-center gap-1.5"
                          onClick={() => {
                            const params = new URLSearchParams(location.search);
                            // Keep specific filters (city, area)
                            const newParams = new URLSearchParams();
                            if (params.get("city"))
                              newParams.append("city", params.get("city"));
                            if (params.get("area"))
                              newParams.append("area", params.get("area"));

                            const queryString = newParams.toString();
                            navigate(
                              queryString
                                ? `${item.href}?${queryString}`
                                : `${item.href}`
                            );
                          }}
                        >
                          <Icon size={18} />
                          {item.name}
                        </a>
                      </div>
                    ) : (
                      <div className="flex cursor-pointer">
                        <a
                          className="flex items-center gap-1.5"
                          onClick={() => {
                            // Extract params from current URL to persist them
                            const params = new URLSearchParams(location.search);
                            const newParams = new URLSearchParams();
                            if (params.get("city"))
                              newParams.append("city", params.get("city"));
                            if (params.get("area"))
                              newParams.append("area", params.get("area"));

                            const queryString = newParams.toString();
                            navigate(
                              queryString
                                ? `${item.href}?${queryString}`
                                : `${item.href}`
                            );
                          }}
                        >
                          <Icon size={18} />
                          {item.name}
                        </a>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Mobile Menu Sidebar */}
          <div className="justify-self-end block md:hidden z-92">
            <div className="grid justify-items-end drawer drawer-end">
              <input
                id="my-drawer-5"
                type="checkbox"
                className="drawer-toggle"
                checked={isOpen}
                onChange={(e) => setIsOpen(e.target.checked)}
              />
              <div className="drawer-content">
                {/* Page content here */}
                <label
                  htmlFor="my-drawer-5"
                  className="drawer-button btn btn-sm btn-primary h-10"
                >
                  <RiMenu3Line size={20} />
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-5"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                  onClick={() => setIsOpen(false)}
                ></label>
                <ul className="menu menu-lg bg-base-200 min-h-full w-80 p-4  gap-3">
                  <h3 className="text-3xl font-medium pb-7 pl-4 ">Menu</h3>
                  {/* Sidebar content here */}
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.name}>
                        {item.href === location.pathname ? (
                          <div className="flex cursor-pointer text-primary">
                            <a
                              className="flex items-center gap-2"
                              onClick={() => {
                                setIsOpen(false);
                                navigate(`${item.href}`);
                              }}
                            >
                              <Icon size={18} />
                              {item.name}
                            </a>
                          </div>
                        ) : (
                          <div className="flex cursor-pointer">
                            <a
                              className="flex items-center gap-2"
                              onClick={() => {
                                setIsOpen(false);
                                navigate(`${item.href}`);
                              }}
                            >
                              <Icon size={18} />
                              {item.name}
                            </a>
                          </div>
                        )}
                      </li>
                    );
                  })}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/list-property");
                    }}
                    className="btn btn-primary mt-10 text-base font-normal gap-2"
                  >
                    <RiBuildingLine /> List Property
                  </button>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-42 hidden sm:block">
          <div className="justify-self-end">
            <button
              onClick={() => {
                navigate("/list-property");
              }}
              className="btn btn-primary text-base font-normal gap-2"
            >
              <RiBuildingLine size={20} /> List Property
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
