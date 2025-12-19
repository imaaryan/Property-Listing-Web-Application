import React, { useState } from "react";
import {
  RiCheckDoubleLine,
  RiBuildingLine,
  RiHomeSmileLine,
  RiStoreLine,
  RiCommunityLine,
  RiArrowRightLine,
  RiShieldCheckLine,
  RiTeamLine,
  RiTimeLine,
} from "@remixicon/react";
import { useNavigate } from "react-router-dom";

const ListProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    propertyType: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  const propertyTypes = [
    { name: "Residential Plot", icon: RiCommunityLine },
    { name: "Flat / Apartment", icon: RiBuildingLine },
    { name: "Independent House", icon: RiHomeSmileLine },
    { name: "Commercial Space", icon: RiStoreLine },
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 py-4">
      {/* 1. Wishlist-style Header */}
      <div className="bg-[#e2e7fc] py-12 mb-12 rounded-2xl relative overflow-hidden">
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-3">
            List Your Property With Us
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Join our exclusive network of verified sellers and connect with
            genuine buyers instantly.
          </p>
        </div>
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        {/* Left: Why Choose Us (Replaces Images) */}
        <div className="md:col-span-7 flex flex-col gap-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Why Choose Khasra Khatauni?
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  title: "Verified Network",
                  desc: "We only deal with verified buyers and sellers to ensure safety.",
                  icon: RiShieldCheckLine,
                },
                {
                  title: "Expert Legal Support",
                  desc: "Get end-to-end assistance with property documentation and verification.",
                  icon: RiTeamLine,
                },
                {
                  title: "Faster Deals",
                  desc: "Our optimized platform ensures your property gets sold quicker.",
                  icon: RiTimeLine,
                },
                {
                  title: "Zero Hidden Costs",
                  desc: "Transparent pricing and processes. No surprises later.",
                  icon: RiCheckDoubleLine,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex gap-5 items-start p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="bg-[#e2e7fc] p-3 rounded-lg text-primary shrink-0">
                    <item.icon size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-base">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Sticky Form */}
        <div className="md:col-span-5 relative">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100/50 sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Submit Listing
              </h2>
              <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">
                FREE
              </span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name */}
              <div className="form-control">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered w-full bg-gray-50 focus:bg-white focus:outline-none focus:border-primary transition-all"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="input input-bordered w-full bg-gray-50 focus:bg-white focus:outline-none focus:border-primary transition-all"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="input input-bordered w-full bg-gray-50 focus:bg-white focus:outline-none focus:border-primary transition-all"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Address */}
              <div className="form-control">
                <input
                  type="text"
                  name="address"
                  placeholder="Property Address"
                  className="input input-bordered w-full bg-gray-50 focus:bg-white focus:outline-none focus:border-primary transition-all"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Property Type */}
              <select
                name="propertyType"
                className="select select-bordered w-full bg-gray-50 focus:bg-white focus:outline-none focus:border-primary font-normal text-base text-gray-500"
                value={formData.propertyType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Property Type
                </option>
                <option value="Residential Plot">Residential Plot</option>
                <option value="Flat">Flat / Apartment</option>
                <option value="House">Independent House</option>
                <option value="Commercial">Commercial Space</option>
                <option value="Agricultural">Agricultural Land</option>
                <option value="Other">Other</option>
              </select>

              {/* Message */}
              <textarea
                name="message"
                className="textarea textarea-bordered w-full h-28 bg-gray-50 focus:bg-white focus:outline-none focus:border-primary text-base"
                placeholder="Additional Details (e.g. Size, Price, Features)..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-2 text-white text-lg font-normal shadow-lg shadow-primary/30 hover:shadow-primary/50"
              >
                Submit Listing <RiArrowRightLine size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 3. Property Types Section */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            We Deal In Various Properties
          </h2>
          <p className="text-gray-500 mt-2">
            Find the perfect category for your asset
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {propertyTypes.map((type, idx) => {
            const Icon = type.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col items-center justify-center p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default relative overflow-hidden"
              >
                {/* Hover bg effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="bg-blue-50 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={32} className="text-primary" />
                </div>
                <span className="text-lg font-semibold text-gray-800 z-10">
                  {type.name}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. KK-Verified Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden mb-16 shadow-2xl">
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-4 border border-white/30">
              TRUST & SAFETY
            </div>
            <h2 className="text-3xl font-bold mb-4">What is KK-Verified?</h2>
            <p className="text-blue-100 leading-relaxed text-lg mb-6">
              <span className="font-bold text-white">
                Khasra Khatauni Verified
              </span>{" "}
              properties are strictly vetted for legal authenticity. We check
              government records to ensure clean titles, so you can buy or sell
              with 100% confidence.
            </p>
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

      {/* 5. About Us CTA Section */}
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          More About Khasra Khatauni
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-8 text-lg">
          We are dedicated to bringing transparency to the real estate market.
          Learn more about our mission and how we protect your investments.
        </p>
        <button
          onClick={() => navigate("/about")}
          className="btn btn-outline btn-primary px-10 rounded-full hover:px-12 transition-all duration-300"
        >
          Know More
        </button>
      </div>
    </div>
  );
};

export default ListProperty;
