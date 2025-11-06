import React, { useState } from "react";
import {
  RiMapPinLine,
  RiSignpostLine,
  RiCommunityLine,
  RiShadowLine,
  RiMoneyRupeeCircleLine,
  RiSearchLine,
} from "@remixicon/react";

const Filter = () => {
  const [areaValue, setAreaValue] = useState(25);
  const [priceValue, setPriceValue] = useState(25);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 items-center gap-4 lg:gap-6 px-6 pt-6 pb-8 w-full max-w-[1410px] mx-auto rounded-xl bg-[#1244e320]">
        <div>
          <div className="flex items-center gap-1 mb-2">
            <RiMapPinLine size={18} className="text-primary" />
            <h4>City</h4>
          </div>
          <select defaultValue="Any" className="select appearance-none w-full">
            <option disabled={true}>Any</option>
            <option>Crimson</option>
            <option>Amber</option>
            <option>Velvet</option>
          </select>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-2">
            <RiSignpostLine size={18} className="text-primary" />
            <h4>Area</h4>
          </div>
          <select defaultValue="Any" className="select appearance-none w-full">
            <option disabled={true}>Any</option>
            <option>Crimson</option>
            <option>Amber</option>
            <option>Velvet</option>
          </select>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-2">
            <RiCommunityLine size={18} className="text-primary" />
            <h4>Property Type</h4>
          </div>
          <select
            defaultValue="Select Type"
            className="select appearance-none w-full"
          >
            <option disabled={true}>Select Type</option>
            <option>Crimson</option>
            <option>Amber</option>
            <option>Velvet</option>
          </select>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-2">
            <RiShadowLine size={18} className="text-primary" />
            <h4>Property Area (Sq m)</h4>
          </div>
          <div className="w-full">
            <input
              type="range"
              min={0}
              max="100"
              value={areaValue}
              onChange={(e) => setAreaValue(e.target.value)}
              className="range range-xs range-primary w-full"
              step="10"
            />

            <div className="flex justify-between  mt-1 text-xs">
              <span>100m²</span>
              <span>10000m²</span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-2">
            <RiMoneyRupeeCircleLine size={18} className="text-primary" />
            <h4>Price (₹)</h4>
          </div>
          <div className="w-full ">
            <input
              type="range"
              min={0}
              max="100"
              value={priceValue}
              onChange={(e) => setPriceValue(e.target.value)}
              className="range range-xs range-primary w-full"
              step="5"
            />

            <div className="flex justify-between  mt-1 text-xs">
              <span>10 Lakh</span>
              <span>50 Cr.</span>
            </div>
          </div>
        </div>

        <div>
          <button className="btn btn-primary text-base font-normal gap-2 w-full">
            <RiSearchLine size={18} />
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default Filter;
