import React from "react";
import { RiPhoneLine, RiMailLine, RiMapPinLine } from "@remixicon/react";

const Contact = () => {
  return (
    <div className="w-full md:mt-4">
      {/* Map Section */}
      <div className="max-w-[1440px] m-auto h-[400px] md:h-[500px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110204.72538042418!2d78.01713465!3d30.32542845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929c356c888af%3A0x4c3562c032518799!2sDehradun%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1766143693552!5m2!1sen!2sin"
          className="w-full h-full border-0 rounded-xl"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Contact Info Section */}
      <div className="max-w-[1440px] mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone */}
          <div className="bg-[#e2e7fc] text-primary hover:bg-primary hover:text-white p-8 rounded-lg flex flex-col items-center justify-center gap-4 transition-transform hover:scale-105 duration-500">
            <RiPhoneLine size={38} className="mb-2" />
            <a
              href="tel:+913695548555"
              className="text-xl md:text-2xl font-base"
            >
              +91 3695-548555
            </a>
          </div>

          {/* Email */}
          <div className="bg-[#e2e7fc] text-primary hover:bg-primary hover:text-white p-8 rounded-lg flex flex-col items-center justify-center gap-4 transition-transform hover:scale-105 duration-500">
            <RiMailLine size={38} className="mb-2" />
            <a
              href="mailto:info@khasrakhatauni.com"
              className="text-xl md:text-2xl font-base"
            >
              info@khasrakhatauni.com
            </a>
          </div>

          {/* Address */}
          <div className="bg-[#e2e7fc] text-primary hover:bg-primary hover:text-white p-8 rounded-lg flex flex-col items-center justify-center gap-4 transition-transform hover:scale-105 text-center duration-500">
            <RiMapPinLine size={38} className="mb-2" />
            <p className="text-xl md:text-2xl font-base">
              Dhoran Road, Dehradun
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
