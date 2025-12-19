import React from "react";
import { RiPhoneLine, RiMailLine, RiMapPinLine } from "@remixicon/react";

const Contact = () => {
  return (
    <div className="w-full">
      {/* Map Section */}
      <div className="w-full h-[400px] md:h-[500px]">
        <iframe
          title="Google Map"
          className="w-full h-full border-0"
          src="https://maps.google.com/maps?q=Khasra+Khatauni+Office+Shiv+Shakti+Enclave+Dhoran+Road+Dehradun&t=&z=15&ie=UTF8&iwloc=&output=embed"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Contact Info Section */}
      <div className="max-w-[1440px] mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone */}
          <div className="bg-[#4169E1] text-white p-8 rounded-lg flex flex-col items-center justify-center gap-4 transition-transform hover:scale-105">
            <RiPhoneLine size={48} className="mb-2" />
            <a
              href="tel:+913695548555"
              className="text-xl md:text-2xl font-medium"
            >
              +91 3695-548555
            </a>
          </div>

          {/* Email */}
          <div className="bg-[#4169E1] text-white p-8 rounded-lg flex flex-col items-center justify-center gap-4 transition-transform hover:scale-105">
            <RiMailLine size={48} className="mb-2" />
            <a
              href="mailto:info@khasrakhatauni.com"
              className="text-xl md:text-2xl font-medium"
            >
              info@khasrakhatauni.com
            </a>
          </div>

          {/* Address */}
          <div className="bg-[#4169E1] text-white p-8 rounded-lg flex flex-col items-center justify-center gap-4 transition-transform hover:scale-105 text-center">
            <RiMapPinLine size={48} className="mb-2" />
            <p className="text-xl md:text-2xl font-medium">
              Dhoran Road, Dehradun
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
