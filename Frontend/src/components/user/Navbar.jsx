import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  RiBuildingLine,
  RiMenu3Line,
  RiHome3Line,
  RiContactsLine,
  RiCommunityLine,
} from "@remixicon/react";
import { assets } from "../../assets/dummyData";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState("false");

  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/", icon: RiHome3Line },
    { name: "Buy", href: "/buy", icon: RiBuildingLine },
    { name: "Rent", href: "/rent", icon: RiCommunityLine },
    { name: "Contact", href: "/contact", icon: RiContactsLine },
  ];

  return (
    <>
      <div className="flex justify-between items-center p-2 md:p-4 w-full max-w-[1440px] mx-auto">
        <img
          onClick={() => {
            navigate("/");
          }}
          src={assets.logo}
          alt="logo"
          className="w-56"
        />

        <div className="justify-items-center w-full">
          {/* Desktop MenuBar */}
          <div className="hidden md:block">
            <ul className="flex gap-5 lg:gap-10 items-center ">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li>
                    {item.href === location.pathname ? (
                      <div className="flex cursor-pointer text-primary">
                        <a
                          className="flex items-center gap-1.5"
                          onClick={() => {
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
                          className="flex items-center gap-1.5"
                          onClick={() => {
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
            </ul>
          </div>

          {/* Mobile Menu Sidebar */}
          <div className="justify-self-end block md:hidden">
            <div className="flex justify-items-end drawer drawer-end">
              <input
                id="my-drawer-5"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                {/* Page content here */}
                <label
                  htmlFor="my-drawer-5"
                  className="drawer-button btn btn-primary"
                >
                  <RiMenu3Line />
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-5"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu menu-lg bg-base-200 min-h-full w-80 p-4 gap-3">
                  {/* Sidebar content here */}
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li>
                        {item.href === location.pathname ? (
                          <div className="flex cursor-pointer text-primary">
                            <a
                              className="flex items-center gap-2"
                              onClick={() => {
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
