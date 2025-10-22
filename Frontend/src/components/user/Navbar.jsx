import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Text } from "@radix-ui/themes";
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
      <div className="flex justify-between items-center p-2 md:p-4 max-w-[1440px] mx-auto">
        <img
          onClick={() => {
            navigate("/");
          }}
          src={assets.logo}
          alt="logo"
          className="w-56"
        />

        <div className="justify-items-center w-full">
          <div className="justify-self-end pr-4 block md:hidden">
            <Button size={3}>
              <RiMenu3Line size={22} />
            </Button>
          </div>
          <div className="hidden md:block">
            <ul className="flex gap-10 items-center ">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li>
                    {item.href === location.pathname ? (
                      <div className="flex cursor-pointer text-[var(--primary-color)]">
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
            </ul>
          </div>
        </div>

        <div className="w-80 hidden sm:block">
          <div className="justify-self-end">
            <Button
              size={{
                initial: "0",
                sm: "2",
                lg: "3",
              }}
            >
              <RiBuildingLine />
              <a
                onClick={() => {
                  navigate("/list");
                }}
              >
                List Property
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
