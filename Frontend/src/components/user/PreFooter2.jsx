import React from "react";
import { useNavigate } from "react-router-dom";
import {
  RiCommunityLine,
  RiBuildingLine,
  RiHomeSmileLine,
  RiStoreLine,
  RiArrowRightLine,
  RiShieldCheckLine,
  RiFilePaperLine,
  RiHistoryLine,
} from "@remixicon/react";

const PreFooter2 = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = React.useState(0);

  const features = [
    {
      title: "Verified Listing",
      icon: RiShieldCheckLine,
      color: "bg-green-100 text-green-600",
      textColor: "text-green-600",
    },
    {
      title: "Legal Check Passed",
      icon: RiFilePaperLine,
      color: "bg-blue-100 text-blue-600",
      textColor: "text-blue-600",
    },
    {
      title: "Ownership History",
      icon: RiHistoryLine,
      color: "bg-purple-100 text-purple-600",
      textColor: "text-purple-600",
    },
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const propertyTypes = [
    {
      name: "Residential Plot",
      icon: RiCommunityLine,
      desc: "Verified plots ready for construction",
    },
    {
      name: "Flat / Apartment",
      icon: RiBuildingLine,
      desc: "Move-in ready homes in prime areas",
    },
    {
      name: "Independent House",
      icon: RiHomeSmileLine,
      desc: "Premium houses with ownership rights",
    },
    {
      name: "Commercial Space",
      icon: RiStoreLine,
      desc: "High-yield spaces for business growth",
    },
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 py-12 flex flex-col gap-20">
      {/* 1. Header Section */}
      {/* 1. Header Section - Separator */}
      <div className="bg-gray-50 rounded-[2.5rem] py-20 px-6 text-center border border-gray-100 relative overflow-hidden">
        {/* Subtle Background Blurs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-100/40 rounded-full blur-3xl translate-y-1/2"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-primary font-medium text-sm mb-6 shadow-sm">
            <RiShieldCheckLine size={18} />
            <span>Verified Real Estate Platform</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            This is not an open marketplace.
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-light">
            This is a{" "}
            <span className="font-semibold text-primary">filtered</span>,{" "}
            <span className="font-semibold text-primary">verified</span> text
            property space.
          </p>
        </div>
      </div>

      {/* 2. Property Types Grid */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-800">
            We Deal In Various Properties
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertyTypes.map((type, idx) => {
            const Icon = type.icon;
            return (
              <div
                key={idx}
                className="group p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-xl hover:shadow-gray-200/50 hover:border-blue-100 transition-all duration-300 cursor-pointer text-center"
                onClick={() => navigate("/buy")}
              >
                <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Icon size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {type.name}
                </h3>
                <p className="text-gray-500 text-sm">{type.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. About Us Split Layout */}
      <section className=" rounded-3xl overflow-hidden">
        <div className="grid md:grid-cols-2 items-center">
          <div className="p-10 md:p-16">
            <span className="text-primary font-bold tracking-wider text-sm uppercase mb-4 block">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Transparency is our currency.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Khasra Khatauni is Dehradun's first verified property marketplace.
              We utilize official land records to ensure every transaction is
              safe, clear, and undisputed. We believe trust starts with paper,
              not promises.
            </p>
            <button
              onClick={() => navigate("/about")}
              className="btn btn-primary btn-outline rounded-full px-8 hover:px-10 transition-all"
            >
              Read Our Story
            </button>
          </div>
          <div className="h-full min-h-[300px] bg-[#e2e7fc] rounded-3xl relative flex items-center justify-center overflow-hidden">
            {/* Decorative Abstract Shapes */}
            <div className="absolute w-64 h-64 bg-white/40 rounded-full blur-3xl -top-10 -right-10"></div>
            <div className="absolute w-64 h-64 bg-blue-400/10 rounded-full blur-3xl bottom-10 left-10"></div>

            {/* Dynamic Graphic Stack */}
            <div className="relative z-10 w-[280px] h-[180px]">
              {features.map((feature, idx) => {
                const offset =
                  (idx - activeCard + features.length) % features.length;

                // Calculate styles based on offset
                let cardStyle = "";
                if (offset === 0) {
                  // Active Card
                  cardStyle =
                    "z-30 opacity-100 scale-100 translate-y-0 rotate-0 shadow-xl";
                } else if (offset === 1) {
                  // Second Card (Behind)
                  cardStyle =
                    "z-20 opacity-100 scale-95 translate-y-3 rotate-2 shadow-lg";
                } else {
                  // Third Card (Back)
                  cardStyle =
                    "z-10 opacity-100 scale-90 translate-y-6 rotate-4 shadow-md";
                }

                return (
                  <div
                    key={idx}
                    className={`absolute inset-0 bg-white p-6 rounded-2xl border border-gray-100 transition-all duration-700 ease-in-out transform ${cardStyle}`}
                  >
                    <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${feature.color}`}
                      >
                        <feature.icon size={20} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Status</div>
                        <div
                          className={`text-sm font-bold ${feature.textColor}`}
                        >
                          {feature.title}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-100 rounded w-full"></div>
                      <div className="h-2 bg-gray-100 rounded w-2/3"></div>
                      <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. What Is KK-Verified? (UNCHANGED SECTION from PreFooter.jsx) */}
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

      {/* 5. CTA Section - Subtle Style */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-b from-white to-blue-50/50 border border-blue-100 text-center py-16 px-6">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Ready to list your property?
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Join a marketplace built on trust. If your documents are clear, our
            buyers are waiting.
          </p>
          <button
            onClick={() => navigate("/list-property")}
            className="btn btn-primary rounded-full px-10 h-12 text-base font-medium shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all transform hover:-translate-y-0.5"
          >
            Start Your Listing <RiArrowRightLine className="ml-2" size={18} />
          </button>
        </div>

        {/* Very Subtle Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </section>
    </div>
  );
};

export default PreFooter2;
