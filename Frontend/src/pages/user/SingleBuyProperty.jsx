import React from "react";
import { useParams } from "react-router-dom";
import { propertyToBuy, area, amenities } from "../../assets/dummyData.js";
import {
  RiMapPin2Fill,
  RiHotelBedFill,
  RiHandSanitizerFill,
  RiShadowFill,
  RiPhoneLine,
  RiInbox2Line,
  RiCalculatorLine,
} from "@remixicon/react";

import { FaRegCheckCircle } from "react-icons/fa";
import Map from "../../components/user/Map";

import Moment from "moment";

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
          {/* Featured Image and Gallery */}
          <div>
            <img
              className="aspect-3/2 w-full object-cover object-center transform transition-transform duration-500 ease-in-out group-hover:scale-110 rounded-xl"
              src={currentProperty.images.featuredImage}
              alt={currentProperty.title + " Image"}
            />
          </div>

          {/* Short Description */}
          <div className="flex flex-col my-6 gap-3 p-6 border-2 border-secondary rounded-xl bg-[#fdfdfd]">
            <h2 className="text-lg font-medium ">Short Description</h2>
            <p className="text-base text-gray-500">
              {currentProperty.shortDescription}
            </p>
          </div>

          {/* Extra Info Tabs */}
          <div className="flex flex-col my-6 gap-3 p-6 border-2 border-secondary rounded-xl bg-[#fdfdfd]">
            {/* name of each tab group should be unique */}
            <div className="tabs tabs-box bg-gray-100 rounded-md">
              <input
                type="radio"
                name="my_tabs_1"
                className="tab rounded-md w-1/3 text-base font-medium"
                aria-label="Details"
                defaultChecked
              />
              {/* Property Details Tab */}
              <div className="tab-content bg-white rounded-md py-3">
                <div className="grid grid-cols-2 gap-6 p-4">
                  <div className="flex gap-2 text-base items-start justify-between">
                    <h5 className="text-gray-500">Dimension:</h5>
                    <p>{currentProperty.propertyDetails.dimension}</p>
                  </div>
                  <div className="flex gap-2 text-base items-start justify-between">
                    <h5 className="text-gray-500">Facing:</h5>
                    <p>{currentProperty.propertyDetails.facing}</p>
                  </div>
                  <div className="flex gap-2 text-base items-start justify-between">
                    <h5 className="text-gray-500">Width Of Facing Road:</h5>
                    <p>{currentProperty.propertyDetails.widthOfFacingRoad}</p>
                  </div>
                  <div className="flex gap-2 text-base items-start justify-between">
                    <h5 className="text-gray-500">Approved By:</h5>
                    <p>{currentProperty.propertyDetails.approvedBy}</p>
                  </div>
                  <div className="flex gap-2 text-base items-start justify-between">
                    <h5 className="text-gray-500">
                      Allowable Construction Stilt:
                    </h5>
                    <p>
                      {
                        currentProperty.propertyDetails
                          .allowableConstructionStilt
                      }
                    </p>
                  </div>
                  <div className="flex gap-2 text-base items-start justify-between">
                    <h5 className="text-gray-500">Ownership:</h5>
                    <p>{currentProperty.propertyDetails.ownership}</p>
                  </div>
                  <div className="flex gap-2 text-base items-start justify-between">
                    <h5 className="text-gray-500">Land Title:</h5>
                    <p>{currentProperty.propertyDetails.landTitle}</p>
                  </div>
                  <div className="flex gap-2 text-base items-start justify-between">
                    <h5 className="text-gray-500">Development Status:</h5>
                    <p>{currentProperty.propertyDetails.developmentStatus}</p>
                  </div>
                  <div className="flex gap-2 text-base items-start justify-between">
                    <h5 className="text-gray-500">Last Land Transaction:</h5>
                    <p>
                      {Moment(
                        currentProperty.propertyDetails.lastLandTransaction
                      ).format(" Do MMMM YYYY")}
                    </p>
                  </div>
                  <div className="flex gap-2 text-base items-start justify-between">
                    <h5 className="text-gray-500">Under MDDA:</h5>
                    <p>
                      {currentProperty.propertyDetails.underMDDA ? "Yes" : "No"}
                    </p>
                  </div>
                  <div className="flex gap-2 text-base items-start justify-between">
                    <h5 className="text-gray-500">Under Nagar Nigam:</h5>
                    <p>
                      {currentProperty.propertyDetails.underNagarNigam
                        ? "Yes"
                        : "No"}
                    </p>
                  </div>
                  <div className="flex gap-2 text-base items-start justify-between">
                    <h5 className="text-gray-500">Water Supply:</h5>
                    <p>
                      {currentProperty.propertyDetails.waterSupply
                        ? "Yes"
                        : "No"}
                    </p>
                  </div>
                  <div className="flex gap-2 text-base items-start justify-between">
                    <h5 className="text-gray-500">Power Supply:</h5>
                    <p>
                      {currentProperty.propertyDetails.powerSupply
                        ? "Yes"
                        : "No"}
                    </p>
                  </div>
                  <div className="flex gap-2 text-base items-start justify-between">
                    <h5 className="text-gray-500">Loan Available:</h5>
                    <p>
                      {currentProperty.propertyDetails.loanAvailable
                        ? "Yes"
                        : "No"}
                    </p>
                  </div>
                  <div className="flex gap-2 text-base items-start justify-between col-span-full">
                    <h5 className=" text-gray-500">Address:</h5>
                    <p>{currentProperty.propertyDetails.address}</p>
                  </div>
                </div>
              </div>

              <input
                type="radio"
                name="my_tabs_1"
                className="tab rounded-md w-1/3 text-base font-medium"
                aria-label="Pricing"
              />
              {/* Pricing Tab */}
              <div className="tab-content bg-white rounded-md py-3">
                <div className="grid grid-cols-1 gap-4 p-4">
                  <div className="flex gap-2 text-base items-start justify-between">
                    <h5 className="text-gray-500">Asking Price:</h5>
                    <p>
                      ₹{" "}
                      {currentProperty.pricing.askingPrice?.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2 text-base items-start justify-between">
                    <h5 className="text-gray-500">
                      Stamp Duty Cost (
                      {currentProperty.pricing.stampDutyPercentage}%):
                    </h5>
                    <p>
                      ₹{" "}
                      {currentProperty.pricing.stampDutyCost?.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2 text-base items-start justify-between">
                    <h5 className="text-gray-500">Advocate Fee:</h5>
                    <p>
                      ₹{" "}
                      {currentProperty.pricing.advocateFee?.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2 text-base items-start justify-between">
                    <h5 className="text-gray-500">Receipt Fee:</h5>
                    <p>
                      ₹{" "}
                      {currentProperty.pricing.receiptFee?.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2 text-base items-start justify-between">
                    <h5 className="text-gray-500">
                      Broker Commission (
                      {currentProperty.pricing.brokerCommissionPercentage}%):
                    </h5>
                    <p>
                      ₹{" "}
                      {currentProperty.pricing.brokerCommissionCost?.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2 text-base items-start justify-between mt-2 pt-4 border-t border-t-gray-300">
                    <h5 className="text-xl font-medium">Finel Pricing:</h5>
                    <p className="text-xl text-primary">
                      ₹{" "}
                      {currentProperty.pricing.finelPricing?.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <input
                type="radio"
                name="my_tabs_1"
                className="tab rounded-md w-1/3 text-base font-medium"
                aria-label="Nearby Amenities"
              />
              {/* Amenities Tab */}
              <div className="tab-content bg-white rounded-md py-3">
                <div className="grid grid-cols-4 gap-6 p-4">
                  {currentProperty.amenitiesId.map((amenityId) => {
                    const amenity = amenities.find((a) => a._id === amenityId);
                    return amenity ? (
                      <div
                        key={amenityId}
                        className="flex gap-2 text-base items-center"
                      >
                        <FaRegCheckCircle className="text-primary" />
                        <p>{amenity.name}</p>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Property Cordinates in Map */}
          <div className="flex flex-col my-6 gap-3 p-6 border-2 border-secondary rounded-xl bg-[#fdfdfd] h-[400px]">
            <Map
              items={[
                {
                  ...currentProperty,
                  image: currentProperty.images.featuredImage,
                  pricing: {
                    ...currentProperty.pricing,
                    price: currentProperty.pricing.finelPricing,
                  },
                },
              ]}
              center={[
                currentProperty.locationOnMap.latitude,
                currentProperty.locationOnMap.longitude,
              ]}
            />
          </div>
        </div>

        {/* Sticky Sidebar */}
        <div className="w-[755px] sticky top-4 h-fit">
          <div className="flex flex-col gap-3 p-6 border-2 border-secondary rounded-xl bg-[#fdfdfd] ">
            {/* Property Type Badge */}
            <div className="badge badge-sm badge-primary rounded-full">
              {currentProperty.propertyType}
            </div>

            {/* Property Title */}
            <h2 className="text-lg md:text-3xl font-medium">
              {currentProperty.title}
            </h2>

            {/* Property Location */}
            <p className="flex items-center gap-2 text-gray-500">
              <RiMapPin2Fill size={15} /> {areaName}, {cityName}
            </p>

            {/* Property Price */}
            <h3 className="text-4xl font-medium text-primary">
              ₹{formatPrice(currentProperty.pricing.finelPricing)}
            </h3>

            {/* Property BHK & Size Info */}
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

            {/* Khatauni Details */}
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
              className="btn btn-outline text-lg font-normal hover:bg-secondary"
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
              className="btn btn-outline hover:bg-secondary text-lg font-normal "
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
      </div>
    </>
  ) : (
    <div> No Property Avalable </div>
  );
};

export default SingleBuyProperty;
