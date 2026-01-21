import React from "react";
import { useNavigate } from "react-router-dom";
import {
  RiCommunityLine,
  RiBuildingLine,
  RiHomeSmileLine,
  RiStoreLine,
  RiArrowRightLine,
} from "@remixicon/react";

const PreFooter = () => {
  const navigate = useNavigate();

  const propertyTypes = [
    {
      name: "Residential Plot",
      icon: RiCommunityLine,
      desc: "Perfect spots for your dream home",
    },
    {
      name: "Flat / Apartment",
      icon: RiBuildingLine,
      desc: "Modern living spaces in prime locations",
    },
    {
      name: "Independent House",
      icon: RiHomeSmileLine,
      desc: "Spacious homes with complete privacy",
    },
    {
      name: "Commercial Space",
      icon: RiStoreLine,
      desc: "Strategic spots to grow your business",
    },
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 py-8 flex flex-col gap-24">
      {/* 1. Not an open marketplace (Separator) */}
      <div className="text-center py-12">
        <p className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
          This is not an open marketplace.
        </p>
        <div className="relative inline-block mt-3">
          <span className="text-2xl md:text-3xl font-bold text-primary relative z-10">
            This is a filtered, verified property space.
          </span>
          <div className="absolute bottom-1 left-0 w-full h-3 bg-yellow-300/40 z-0 rounded-full"></div>
        </div>
      </div>

      {/* 2. We Deal In Various Properties */}
      <section className="text-center">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            We Deal In Various Properties
          </h2>
          <p className="text-gray-500 mt-2 text-lg">
            Find the Right Category for Your Asset
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {propertyTypes.map((type, idx) => {
            const Icon = type.icon;
            return (
              <div
                key={idx}
                className="group p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => navigate("/buy")}
              >
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-primary">
                  <Icon size={32} />
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {type.name}
                </h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. About Us Section */}
      <div className="bg-[#e2e7fc] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">About Us</h2>
          <p className="text-gray-700 mb-8 text-lg md:text-xl leading-relaxed">
            Khasra Khatauni is Dehradun's first verified property marketplace.
            We utilize official land records to ensure every transaction is
            safe, clear, and undisputed.
          </p>
          <button
            onClick={() => navigate("/about")}
            className="btn btn-primary rounded-full px-8 text-white hover:shadow-lg transition-all"
          >
            Read Our Story
          </button>
        </div>
        {/* Soft Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/50 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/50 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      </div>

      {/* 4. What Is KK-Verified? (UNCHANGED SECTION) */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-4 border border-white/30">
              TRUST & SAFETY
            </div>
            <h2 className="text-3xl font-bold mb-4">What Is KK-Verified?</h2>
            <div className="text-blue-100 leading-relaxed text-lg mb-6 space-y-4">
              <p>
                A KK-Verified property means the land records have been reviewed
                against official government data.
              </p>
              <div>
                <p className="font-semibold text-white mb-2">
                  Before a listing is marked verified, we ensure:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Ownership matches revenue records</li>
                  <li>Titles are clear and transferable</li>
                  <li>No active disputes are reflected in records</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span>Clean Documents</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span>No Disputes</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex justify-end">
            {/* Abstract Certification Graphic */}
            <div className="bg-white/10 p-8 rounded-xl border border-white/20 backdrop-blur-md rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-xl">Verified Properties</div>
              <div className="mt-4 h-2 bg-white/20 rounded-full w-full">
                <div className="h-full bg-green-400 rounded-full w-[90%]"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Background patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>
      </section>

      {/* 5. Ready to Sell CTA (Restored Native Style) */}
      <section className="bg-primary/5 rounded-3xl p-8 md:p-16 text-center border-2 dashed border-primary/20 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Ready to Sell Your Verified Property?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
          If your property has clear titles and complete land records, list it
          with confidence. Join a platform where buyers look for authenticity.
        </p>
        <button
          onClick={() => navigate("/list-property")}
          className="btn btn-primary rounded-full px-12 text-lg shadow-lg hover:shadow-primary/30"
        >
          List Your Property <RiArrowRightLine className="ml-2" />
        </button>
      </section>
    </div>
  );
};

export default PreFooter;
