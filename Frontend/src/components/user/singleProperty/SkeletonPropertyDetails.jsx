import React from "react";

const SkeletonPropertyDetails = () => {
  return (
    <div className="flex gap-8 p-2 md:p-4 lg:pr-4 w-full max-w-[1440px] mx-auto max-md:flex-wrap animate-pulse">
      {/* Left Column (Main Content) */}
      <div className="w-full min-w-0 flex flex-col gap-6">
        {/* Gallery Section */}
        <div className="w-full">
          {/* Main Image */}
          <div className="skeleton w-full h-[300px] md:h-[450px] rounded-xl mb-4"></div>
          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="skeleton h-20 md:h-24 w-full rounded-lg"
              ></div>
            ))}
          </div>
        </div>

        {/* Mobile Sidebar Placeholder */}
        <div className="md:hidden">
          <div className="skeleton h-64 w-full rounded-xl"></div>
        </div>

        {/* Short Description */}
        <div className="flex flex-col gap-3 p-6 border border-gray-100 rounded-xl bg-white">
          <div className="skeleton h-6 w-1/3 rounded-md"></div>
          <div className="skeleton h-4 w-full rounded-md"></div>
          <div className="skeleton h-4 w-5/6 rounded-md"></div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 border-b border-gray-200 pb-2">
            <div className="skeleton h-8 w-24 rounded-md"></div>
            <div className="skeleton h-8 w-24 rounded-md"></div>
            <div className="skeleton h-8 w-24 rounded-md"></div>
          </div>
          <div className="skeleton h-40 w-full rounded-xl"></div>
        </div>

        {/* Map */}
        <div className="skeleton h-[300px] w-full rounded-xl"></div>
      </div>

      {/* Right Column (Sidebar - Desktop) */}
      <div className="max-md:hidden max-w-[470px] w-full min-w-[300px] sticky top-4 h-fit">
        <div className="border border-gray-200 rounded-xl p-6 bg-white flex flex-col gap-6">
          <div className="skeleton h-8 w-1/2 rounded-md"></div>
          <div className="skeleton h-10 w-2/3 rounded-md"></div>
          <div className="skeleton h-px w-full my-2"></div>
          <div className="flex flex-col gap-2">
            <div className="skeleton h-4 w-full rounded-md"></div>
            <div className="skeleton h-4 w-full rounded-md"></div>
            <div className="skeleton h-4 w-3/4 rounded-md"></div>
          </div>
          <div className="skeleton h-12 w-full rounded-btn mt-4"></div>
          <div className="skeleton h-12 w-full rounded-btn"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonPropertyDetails;
