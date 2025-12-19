import React from "react";
import {
  RiPhoneLine,
  RiMailLine,
  RiMapPinLine,
  RiTimeLine,
} from "@remixicon/react";

const Contact = () => {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 py-4">
      {/* 1. Header (Wishlist Style) */}
      <div className="bg-[#e2e7fc] py-8 mb-12 rounded-2xl relative overflow-hidden text-center">
        <div className="relative z-10 p-4">
          <h1 className="text-2xl md:text-3xl font-medium text-primary mb-3">
            Get In Touch
          </h1>
          <p className="text-gray-600 max-w-md mx-auto text-base">
            Have questions about a property or need legal assistance? We are
            here to help you every step of the way.
          </p>
        </div>
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      </div>

      {/* 2. Main Content - Contact Cards */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Contact Information
          </h2>
          <p className="text-gray-600 mt-2">
            Reach out to us directly through any of these channels.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Phone */}
          <a
            href="tel:+913695548555"
            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-4 group"
          >
            <div className="bg-blue-50 p-5 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <RiPhoneLine size={32} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-400 text-sm uppercase tracking-wide mb-1">
                Call Us
              </h3>
              <p className="text-xl md:text-2xl font-medium text-gray-800">
                +91 3695-548555
              </p>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:info@khasrakhatauni.com"
            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-4 group"
          >
            <div className="bg-blue-50 p-5 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <RiMailLine size={32} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-400 text-sm uppercase tracking-wide mb-1">
                Email Us
              </h3>
              <p className="text-xl md:text-2xl font-medium text-gray-800">
                info@khasrakhatauni.com
              </p>
            </div>
          </a>

          {/* Address */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-4 group">
            <div className="bg-blue-50 p-5 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <RiMapPinLine size={32} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-400 text-sm uppercase tracking-wide mb-1">
                Visit HQ
              </h3>
              <p className="text-xl md:text-2xl font-medium text-gray-800">
                Dhoran Road, Dehradun
              </p>
            </div>
          </div>
        </div>

        {/* Support Hours Banner */}
        <div className="max-w-3xl mx-auto mt-8 bg-primary/5 p-4 rounded-xl border border-primary/10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-center sm:text-left">
          <div className="text-primary flex items-center gap-2 font-bold">
            <RiTimeLine size={24} /> Support Hours:
          </div>
          <p className="text-gray-700 text-lg">
            Monday to Saturday —{" "}
            <span className="font-medium">9:00 AM - 7:00 PM</span>
          </p>
        </div>
      </div>

      {/* 3. Map Section */}
      <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg border border-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110204.72538042418!2d78.01713465!3d30.32542845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929c356c888af%3A0x4c3562c032518799!2sDehradun%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1766143693552!5m2!1sen!2sin"
          className="w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
