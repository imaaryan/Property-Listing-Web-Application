import React, { useState, useMemo, useEffect } from "react";
import {
  RiMapPinLine,
  RiSignpostLine,
  RiCommunityLine,
  RiShadowLine,
  RiMoneyRupeeCircleLine,
  RiSearchLine,
} from "@remixicon/react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { city, area, properties } from "../../assets/dummyData";

const propertyTypes = [
  "Residential Plot",
  "Residential Apartment",
  "Independent House",
  "Commercial Plot",
  "Commercial Shop",
  "Commercial Apartment",
  "Warehouse / Godown",
];

const Filter = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");

  // Calculate dynamic min/max for Area and Price
  const { minArea, maxArea, minPrice, maxPrice } = useMemo(() => {
    if (properties.length === 0)
      return { minArea: 0, maxArea: 10000, minPrice: 0, maxPrice: 100000000 };

    let minA = Infinity;
    let maxA = -Infinity;
    let minP = Infinity;
    let maxP = -Infinity;

    properties.forEach((p) => {
      // Area
      if (p.propertySize) {
        minA = Math.min(minA, p.propertySize);
        maxA = Math.max(maxA, p.propertySize);
      }
      // Price
      const price = p.pricing.price || p.pricing.rent;
      if (price) {
        minP = Math.min(minP, price);
        maxP = Math.max(maxP, price);
      }
    });

    return {
      minArea: minA === Infinity ? 0 : minA,
      maxArea: maxA === -Infinity ? 10000 : maxA,
      minPrice: minP === Infinity ? 0 : minP,
      maxPrice: maxP === -Infinity ? 100000000 : maxP,
    };
  }, []);

  const [areaRange, setAreaRange] = useState([minArea, maxArea]);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  // Update state if min/max changes (e.g. data load)
  useEffect(() => {
    setAreaRange([minArea, maxArea]);
    setPriceRange([minPrice, maxPrice]);
  }, [minArea, maxArea, minPrice, maxPrice]);

  // Filter areas based on selected city
  const filteredAreas = useMemo(() => {
    if (!selectedCity) return [];
    return area.filter((item) => item.city._id === selectedCity);
  }, [selectedCity]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedArea(""); // Reset area when city changes
  };

  const formatPrice = (amount) => {
    if (amount >= 10000000) {
      return (amount / 10000000).toFixed(1) + " Cr";
    } else if (amount >= 100000) {
      return (amount / 100000).toFixed(1) + " L";
    } else {
      return (amount / 1000).toFixed(1) + " K";
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 items-center gap-4 lg:gap-6 px-6 pt-6 pb-8 w-full max-w-[1410px] mx-auto rounded-xl bg-[#e2e7fc]">
        <div>
          <div className="flex items-center gap-1 mb-2">
            <RiMapPinLine size={18} className="text-primary" />
            <h4>City</h4>
          </div>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="select appearance-none w-full"
          >
            <option value="" disabled>
              Select City
            </option>
            {city.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-2">
            <RiSignpostLine size={18} className="text-primary" />
            <h4>Area</h4>
          </div>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="select appearance-none w-full"
            disabled={!selectedCity}
          >
            <option value="" disabled>
              {selectedCity ? "Select Area" : "Select City First"}
            </option>
            {filteredAreas.map((a) => (
              <option key={a._id} value={a._id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-2">
            <RiCommunityLine size={18} className="text-primary" />
            <h4>Property Type</h4>
          </div>
          <select
            value={selectedPropertyType}
            onChange={(e) => setSelectedPropertyType(e.target.value)}
            className="select appearance-none w-full"
          >
            <option value="" disabled>
              Select Type
            </option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-2">
            <RiShadowLine size={18} className="text-primary" />
            <h4>Property Area (Sq ft)</h4>
          </div>
          <div className="w-full px-2">
            <Slider
              range
              min={minArea}
              max={maxArea}
              value={areaRange}
              onChange={setAreaRange}
              trackStyle={{ 
                backgroundColor: "var(--color-primary)",
                height: 6,
               }}
              handleStyle={[
                {
                  borderColor: "var(--color-primary)",
                  backgroundColor: "white",
                  opacity: 1,
                },
                {
                  borderColor: "var(--color-primary)",
                  backgroundColor: "white",
                  opacity: 1,
                },
              ]}
              railStyle={{ backgroundColor: "#d1d5db" }}
            />

            <div className="flex justify-between mt-2 text-xs">
              <span>{areaRange[0]} sq ft</span>
              <span>{areaRange[1]} sq ft</span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-2">
            <RiMoneyRupeeCircleLine size={18} className="text-primary" />
            <h4>Price (₹)</h4>
          </div>
          <div className="w-full px-2">
            <Slider
              range
              min={minPrice}
              max={maxPrice}
              value={priceRange}
              onChange={setPriceRange}
              step={10000}
              trackStyle={{ backgroundColor: "var(--color-primary)", height: 6, }}
              handleStyle={[
                {
                  borderColor: "var(--color-primary)",
                  backgroundColor: "white",
                  opacity: 1,
                },
                {
                  borderColor: "var(--color-primary)",
                  backgroundColor: "white",
                  opacity: 1,
                },
              ]}
              railStyle={{ backgroundColor: "#d1d5db" }}
            />

            <div className="flex justify-between mt-2 text-xs">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
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
