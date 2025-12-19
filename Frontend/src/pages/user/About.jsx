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
            Who We Are
          </h1>
          <p className="text-gray-600 max-w-md mx-auto text-base">
            Building trust in real estate through transparency, verification,
            and expert guidance.
          </p>
        </div>
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      </div>

      {/* 2. Who We Are Content */}
      <section className="mb-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Redefining Real Estate Trust
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            At Divya Real Estate, we understand that buying or selling a
            property is one of the most significant decisions in life. That's
            why we founded
            <span className="font-semibold text-primary"> Khasra Khatauni</span>
            —a platform dedicated to eliminating the uncertainties of real
            estate transactions.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            We are not just a listing platform; we are your partners in due
            diligence. Our team of experts ensures that every property listed is
            thoroughly vetted, giving you the confidence to move forward without
            hesitation.
          </p>
        </div>
        <div className="order-1 md:order-2 bg-gray-100 rounded-2xl h-[300px] md:h-[400px] relative overflow-hidden group">
          {/* Placeholder for an About Us Image */}
          <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
            Our Team / Office Image
          </div>
        </div>
      </section>

      {/* 3. What is Khasra Khatauni? */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden mb-16 shadow-2xl">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-6 border border-white/30">
            OUR CORE VALUE
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            What is Khasra Khatauni?
          </h2>
          <p className="text-blue-100 text-lg md:text-xl leading-relaxed mb-8">
            <span className="font-bold text-white">Khasra Khatauni</span> is the
            legal bedrock of land ownership in India. It comprises official
            government records detailing the land's survey numbers, dimensions,
            and ownership history.
          </p>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-left md:text-center">
            <p className="text-white text-lg">
              We verify these records for{" "}
              <span className="font-bold text-green-400">
                every single listing
              </span>
              , ensuring that the property you see is free from legal disputes,
              encroachments, and title defects.
            </p>
          </div>
        </div>
        {/* Background patterns */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
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
            To create a transparent, safe, and efficient real estate ecosystem
            where every transaction is backed by verified data, fostering trust
            between buyers and sellers across the nation.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
            <RiFlagLine size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            To empower individuals with verified property information, simplify
            legal complexities, and provide professional support to ensure
            hassle-free ownership transfer.
          </p>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Why Choose Us?</h2>
          <p className="text-gray-500 mt-2 text-lg">
            We bring expertise and integrity to the table
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Verified Listings",
              desc: "Every property is cross-checked with government land records.",
              icon: RiShieldCheckLine,
            },
            {
              title: "Expert Team",
              desc: "Legal advisors and real estate veterans guiding you at every step.",
              icon: RiTeamLine,
            },
            {
              title: "Quick Process",
              desc: "Streamlined documentation and verification for faster closings.",
              icon: RiTimeLine,
            },
            {
              title: "Transparency",
              desc: "No hidden charges, no ambiguity. What you see is what you get.",
              icon: RiCheckDoubleLine,
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
          Join the most trusted platform for real estate. List your property
          today and connect with genuine buyers who value authenticity.
        </p>
        <button
          onClick={() => navigate("/list-property")}
          className="btn btn-primary btn-lg rounded-full px-12 text-lg font-normal shadow-lg shadow-primary/30 hover:shadow-primary/50"
        >
          List Your Property <RiArrowRightLine className="ml-2" />
        </button>
      </section>
    </div>
  );
};

export default About;
