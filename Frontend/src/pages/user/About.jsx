import React from "react";
import {
  RiEyeLine,
  RiFlagLine,
  RiCheckDoubleLine,
  RiShieldCheckLine,
  RiTeamLine,
  RiTimeLine,
  RiArrowRightLine,
} from "@remixicon/react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 py-4">
      {/* 1. Header (Wishlist Style) */}
      <div className="bg-[#e2e7fc] py-8 mb-12 rounded-2xl relative overflow-hidden text-center">
        <div className="relative z-10 p-4">
          <h1 className="text-2xl md:text-3xl font-medium text-primary mb-3">
            Trust That Starts With Paperwork, Not Promises
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            At Khasra Khatauni, we work with one simple belief. Property
            decisions should be made on facts, not assumptions.
          </p>
        </div>
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      </div>

      {/* 2. Who We Are Content */}
      <section className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Redefining Real Estate Trust
          </h2>
          <p className="text-xl text-gray-700 font-medium">
            Buying or selling land is not just a financial step. It is a legal
            one.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start text-left">
          {/* Column 1: The Gap */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 h-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              The Reality
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Most platforms allow anyone to upload a listing. Details may look
              good, but ownership, land records, or approvals often remain
              unclear. We chose a different path.
            </p>
          </div>

          {/* Column 2: Our Solution */}
          <div className="bg-white p-8 rounded-2xl border border-primary/20 shadow-sm h-full">
            <h3 className="text-xl font-bold text-primary mb-4">
              Our Approach
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              At Khasra Khatauni, listings are added only after verification
              through real, on-ground brokers. Our team reviews land documents,
              confirms ownership history, and checks whether the title stands
              clear today, not just on paper.
            </p>
            <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100/50">
              <p className="font-semibold text-gray-800 mb-3">
                All properties listed:
              </p>
              <ul className="space-y-3">
                {[
                  "Have clear land titles",
                  "Include verified Khasra and Khatauni details",
                  "Are pre-approved by partner banks",
                  "Are free from active legal disputes",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 items-start text-sm md:text-base text-gray-700"
                  >
                    <div className="mt-1 text-green-500 shrink-0">
                      <RiShieldCheckLine size={18} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
            This is not an open marketplace. <br />
            <span className="text-primary relative inline-block mt-2">
              This is a filtered, verified property space.
              <span className="absolute bottom-1 left-0 w-full h-2 bg-yellow-300/30 -z-10 rounded-full"></span>
            </span>
          </p>
        </div>
      </section>

      {/* 2.1 Verification Before Visibility (New Section) */}
      <section className="mb-20 max-w-5xl mx-auto px-4">
        <div className="bg-gray-900 text-white rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <div className="inline-block bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-xs md:text-sm font-bold mb-8 border border-white/20 text-yellow-300 tracking-wider">
              OUR CORE VALUE
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">
              Verification Before Visibility
            </h2>
            <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed font-light">
              <p>We believe transparency should come first.</p>
              <p className="font-medium text-white text-xl md:text-2xl">
                Before a property is listed, the paperwork is reviewed.{" "}
                <br className="hidden md:block" />
                Before a buyer visits, the facts are confirmed.
              </p>
              <p>
                This approach protects both sides and reduces delays, confusion,
                and future disputes.
              </p>
            </div>
          </div>
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/40 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 opactiy-50"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 opacity-50"></div>
        </div>
      </section>

      {/* 3. What is Khasra Khatauni? */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden mb-16 shadow-2xl">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-6 border border-white/30">
            OUR CORE VALUE
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            What Is Khasra Khatauni?
          </h2>
          <div className="text-blue-100 text-lg md:text-xl leading-relaxed mb-8 space-y-6 text-left md:text-center">
            <p>
              <span className="font-bold text-white">Khasra and Khatauni</span>{" "}
              are official land records maintained by revenue authorities in
              India.
            </p>
            <ul className="list-none space-y-2">
              <li>
                <span className="font-bold text-white">Khasra number</span>{" "}
                identifies the exact parcel of land, its boundaries, and
                measurement
              </li>
              <li>
                <span className="font-bold text-white">Khatauni</span> records
                ownership history and links the land to its rightful holder
              </li>
            </ul>
            <p>
              Together, these records show who owns the land, how it is
              classified, and whether claims exist.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 text-left md:text-center">
            <p className="text-white text-lg font-medium mb-4">
              For every property listed on our platform, these records are:
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 text-green-300 font-semibold">
              <div className="flex items-center gap-2">
                <RiCheckDoubleLine size={20} /> Cross-checked with revenue data
              </div>
              <div className="flex items-center gap-2">
                <RiCheckDoubleLine size={20} /> Matched with seller details
              </div>
              <div className="flex items-center gap-2">
                <RiCheckDoubleLine size={20} /> Reviewed to confirm clear title
              </div>
            </div>
            <p className="mt-6 text-blue-100">
              Only after this process does a property move forward.
            </p>
          </div>
        </div>
        {/* Background patterns */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      </section>

      {/* 4. Bank-Approved Properties (New Section) */}
      <section className="mb-16 bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Bank-Approved Properties
          </h2>
          <p className="text-gray-600 text-lg mb-6 text-center">
            Several properties listed on Khasra Khatauni are pre-approved by
            leading banks, subject to final valuation and buyer eligibility.
            This means:
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              "The land has already cleared initial legal scrutiny",
              "Loan processing becomes faster",
              "Risk for buyers is significantly reduced",
            ].map((text, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-xs border border-gray-100 flex items-start gap-3"
              >
                <div className="mt-1 text-green-500 shrink-0">
                  <RiShieldCheckLine size={24} />
                </div>
                <p className="text-gray-700 font-medium">{text}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm italic">
            * Bank approval rates vary by project and location, and the exact
            details are shared transparently during inquiry.
          </p>
        </div>
      </section>

      {/* 4. Vision & Mission */}
      <section className="mb-16 grid md:grid-cols-2 gap-8">
        {/* Vision */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="bg-orange-50 w-14 h-14 rounded-full flex items-center justify-center text-orange-500 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
            <RiEyeLine size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            To build a real estate environment where buyers and sellers rely on
            verified data, not assumptions—creating confidence, clarity, and
            long-term trust across every transaction.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
            <RiFlagLine size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            To simplify property ownership by providing verified land records,
            clear legal status, and professional guidance—so buyers can move
            forward without hesitation.
          </p>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Why Choose Us?</h2>
          <p className="text-gray-500 mt-2 text-lg">
            Experience Backed by Integrity
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Verified Listings",
              desc: "Every property is checked against government land records before listing.",
              icon: RiShieldCheckLine,
            },
            {
              title: "Transparency",
              desc: "No hidden terms. No unclear ownership. What is shown is what exists.",
              icon: RiCheckDoubleLine,
            },
            {
              title: "Expert Team",
              desc: "Legal professionals and experienced brokers involved at every step.",
              icon: RiTeamLine,
            },
            {
              title: "Quick Process",
              desc: "Pre-verified documents reduce delays and unnecessary follow-ups. We focus on correctness first. Speed follows naturally.",
              icon: RiTimeLine,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-primary mb-4">
                <item.icon size={36} />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="bg-primary/5 rounded-3xl p-8 md:p-16 text-center border dashed border-primary/20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Ready to Sell Your Verified Property?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
          If your property has clear titles and complete land records, list it
          with confidence. Join a platform where buyers look for authenticity,
          not speculation.
        </p>
        <button
          onClick={() => navigate("/list-property")}
          className="btn btn-primary btn-lg rounded-full px-12 text-lg font-normal shadow-lg shadow-primary/30 hover:shadow-primary/50 mb-12"
        >
          List Your Property <RiArrowRightLine className="ml-2" />
        </button>

        {/* Contact Info Added here for visibility */}
        {/* <div className="border-t border-gray-200 pt-8 max-w-xl mx-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Khasra Khatauni
          </h3>
          <p className="text-gray-600 mb-2">
            Your Trusted Real Estate Partner in Dehradun
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 text-lg font-medium text-gray-700">
            <span>+91 3695-548555</span>
            <span className="hidden md:inline text-gray-300">|</span>
            <span>info@khasrakhatauni.com</span>
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default About;
