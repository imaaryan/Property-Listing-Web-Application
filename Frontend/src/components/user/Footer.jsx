import React from "react";
import { assets, city } from "../../assets/dummyData";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className="max-w-[1440px] mx-auto footer grid gap-8 border-t border-gray-300 max-md:grid-rows-2 max-md:grid-cols-[1fr_1fr_1fr] md:grid-cols-[7fr_1fr_1fr] text-base-content px-3 py-10 md:px-4 md:py-20">
        <aside className="max-md:col-span-3">
          <Link to="/" onClick={scrollToTop}>
            <img src={assets.logo} alt="logo" className="w-56" />
          </Link>
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
          <Link to="/buy" onClick={scrollToTop} className="link link-hover">
            Buy
          </Link>
          <Link to="/rent" onClick={scrollToTop} className="link link-hover">
            Rent
          </Link>
          <Link
            to="/list-property"
            onClick={scrollToTop}
            className="link link-hover"
          >
            Sell
          </Link>
          <Link to="/contact" onClick={scrollToTop} className="link link-hover">
            Contact
          </Link>
        </nav>
        {/* <nav className="p">
          <h6 className="footer-title">Find in</h6>
          {city.map((item, index) => {
            if (item.showOnFooter) {
              return (
                <Link
                  key={index}
                  to={`/buy?city=${item._id}`}
                  onClick={scrollToTop}
                  className="link link-hover"
                >
                  {item.name}
                </Link>
              );
            }
          })}
        </nav> */}
        <nav className="p">
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Terms of Use</a>
          <Link to="/about" onClick={scrollToTop} className="link link-hover">
            About us
          </Link>
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
