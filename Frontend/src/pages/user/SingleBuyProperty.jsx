import React from "react";
import { useParams } from "react-router-dom";
import { propertyToBuy, area } from "../../assets/dummyData.js";
import {
  RiMapPin2Fill,
  RiHotelBedFill,
  RiHandSanitizerFill,
  RiShadowFill,
  RiPhoneLine,
  RiInbox2Line,
  RiCalculatorLine,
} from "@remixicon/react";

const SingleBuyProperty = () => {
  const { id } = useParams();
  const currentProperty = propertyToBuy.find((item) => item._id === id);

  const selectedArea = area.find((a) => a._id === currentProperty.areaId);
  const areaName = selectedArea?.name || "Unknown Area";
  const cityName = selectedArea?.city?.name || "Unknown City";

  const convertToYardsIfNeeded = (size, type) => {
    const yardTypes = [
      "Residential Plot",
      "Commercial Plot",
      "Commercial Apartment",
      "Warehouse / Godown",
      "Independent House",
    ];

    if (yardTypes.includes(type)) {
      const inYards = Math.round(size / 9);
      return { size: inYards, unit: "sq. yards" };
    }

    return { size, unit: "sq. ft" };
  };

  const formatPrice = (amount) => {
    if (amount >= 10000000) {
      return (amount / 10000000).toFixed(2) + " Cr.";
    } else if (amount >= 100000) {
      return (amount / 100000).toFixed(2) + " Lakh";
    } else {
      return amount.toLocaleString("en-IN");
    }
  };

  return currentProperty ? (
    <>
      <div className="flex gap-8 p-2 md:p-4 pr-4 w-full max-w-[1440px] mx-auto ">
        <div className="w-full">
          <div>
            <img
              className="aspect-3/2 w-full object-cover object-center transform transition-transform duration-500 ease-in-out group-hover:scale-110 rounded-xl"
              src={currentProperty.images.featuredImage}
              alt={currentProperty.title + " Image"}
            />
          </div>
        </div>
        <div className="flex flex-col w-[720px] gap-3 p-6 border-2 border-secondary rounded-xl bg-[#fdfdfd] ">
          <div className="badge badge-sm badge-primary rounded-full">
            {currentProperty.propertyType}
          </div>
          <h2 className="text-lg md:text-3xl font-medium">
            {currentProperty.title}
          </h2>
          <p className="flex items-center gap-2 text-gray-500">
            <RiMapPin2Fill size={15} /> {areaName}, {cityName}
          </p>

          <h3 className="text-4xl font-medium text-primary">
            ₹{formatPrice(currentProperty.pricing.finelPricing)}
          </h3>

          <div className="flex flex-row justify-start gap-2 my-3 ">
            <div
              className={
                !currentProperty.bedrooms
                  ? "hidden"
                  : "flex flex-row items-center gap-2 p-3 bg-[#1244e320] hover:bg-[#1244e330] select-none text-sm rounded-lg"
              }
            >
              <RiHotelBedFill size={24} color="#1244e3" />{" "}
              {currentProperty.bedrooms + " Bedrooms"}
            </div>

            <div
              className={
                !currentProperty.bathrooms
                  ? "hidden"
                  : "flex flex-row items-center gap-2 p-3 bg-[#1244e320] hover:bg-[#1244e330] select-none text-sm rounded-lg"
              }
            >
              <RiHandSanitizerFill size={23} color="#1244e3" />{" "}
              {currentProperty.bathrooms + " Bathrooms"}
            </div>
            {(() => {
              const { size, unit } = convertToYardsIfNeeded(
                currentProperty.propertySize,
                currentProperty.propertyType
              );
              return (
                <div className="flex flex-row items-center gap-2 p-3 bg-[#1244e320] hover:bg-[#1244e330] select-none text-sm rounded-lg">
                  <RiShadowFill size={22} color="#1244e3" /> {size} {unit}
                </div>
              );
            })()}
          </div>

          <div className="flex flex-col gap-3 mb-3">
            <h2 className="text-xl font-medium">Khatauni Details</h2>
            <div>
              <h3 className="text-md font-medium ">Current Owner:</h3>
              <p className="text-base text-gray-500">
                {currentProperty.khatuniDetails.currentOwner}
              </p>
            </div>
            <div>
              <h3 className="text-md font-medium ">Previous Owner:</h3>
              <p className="text-base text-gray-500">
                {currentProperty.khatuniDetails.previousOwner}
              </p>
            </div>
            <div c>
              <h3 className="text-md font-medium ">Khasra Number:</h3>
              <p className="text-base text-gray-500">
                {currentProperty.khatuniDetails.khasraNumber}
              </p>
            </div>
          </div>

          <button
            className="btn btn-primary text-lg font-normal "
            onClick={() =>
              (window.location.href = `tel:${currentProperty.khatuniDetails.currentOwnerPhoneNumber}`)
            }
          >
            <RiPhoneLine size={22} />
            Call Current Owner
          </button>

          <button
            className="btn btn-outline text-lg font-normal "
            onClick={() =>
              navigate(
                `/property/${propertyFor === "Buy" ? "sale" : "rent"}/${_id}`
              )
            }
          >
            <RiInbox2Line size={22} />
            Send Enquiry
          </button>

          <button
            className="btn btn-outline text-lg font-normal "
            onClick={() =>
              navigate(
                `/property/${propertyFor === "Buy" ? "sale" : "rent"}/${_id}`
              )
            }
          >
            <RiCalculatorLine size={22} />
            EMI Calculator
          </button>
        </div>
      </div>
    </>
  ) : (
    <div> No Property Avalable </div>
  );
};

export default SingleBuyProperty;
