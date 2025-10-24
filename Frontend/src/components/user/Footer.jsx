import React from "react";
import { assets, city } from "../../assets/dummyData";

const Footer = () => {
  return (
    <>
      <div className="max-w-[1440px] mx-auto footer grid gap-8 border-t-1 border-gray-300 max-sm:grid-rows-2 max-sm:grid-cols-[1fr_1fr_1fr] md:grid-cols-[7fr_1fr_1fr_1fr] text-base-content px-3 py-10 md:px-4 md:py-20">
        <aside className="max-sm:col-span-3">
          <img src={assets.logo} alt="logo" className="w-56" />
          <p className="p-2">
            Your trusted real estate partner in Dehradun
            <br />
            <br />
            📞 +91 3695-548555 <br />
            📧 info@khasarakhatauni.com
          </p>
        </aside>
        <nav className="pl-2">
          <h6 className="footer-title">Quick Links</h6>
          <a className="link link-hover">Buy</a>
          <a className="link link-hover">Rent</a>
          <a className="link link-hover">Sell</a>
          <a className="link link-hover">Contact</a>
        </nav>
        <nav className="p">
          <h6 className="footer-title">Find in</h6>
          {city.map((item) => {
            if (item.showOnFooter) {
              return <a className="link link-hover">{item.name}</a>;
            }
          })}
        </nav>
        <nav className="p">
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Terms of Use</a>
          <a className="link link-hover">About us</a>
        </nav>
      </div>
      <footer className=" bg-neutral text-neutral-content items-center p-4">
        <div className="md:flex md:justify-between max-w-[1440px] mx-auto  md:px-4">
          <p className="text-sm text-center">
            Copyright © {new Date().getFullYear()}  Khasara Khatauni - All right
            reserved
          </p>
          <p className="text-sm text-center">
            <a
              target="_blank"
              href="https://www.rankoneleads.com/?khasrakhatuni-footer-credit"
            >
              Developed with ❤️ by Rank One Leads
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
