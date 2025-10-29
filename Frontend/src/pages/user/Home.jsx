import React from "react";
import { propertyToBuy } from "../../assets/dummyData.js";
import {
  RiMapPin2Fill,
  RiHotelBedFill,
  RiHandSanitizerFill,
  RiShadowFill,
} from "@remixicon/react";

const Home = () => {
  return (
    <>
      <div className="flex justify-between gap-4 md:gap-8 p-2 md:p-4 w-full max-w-[1440px] mx-auto">
        <div className="card bg-base-100  shadow-sm">
          <img
            className="h-80 w-full object-cover object-center rounded-t-lg "
            src={propertyToBuy[0].images.featuredImage}
            alt="Property Image"
          />

          <div className="card-body">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-medium text-primary ">₹45 Lakhs</h3>
              <div className="badge badge-sm badge-outline badge-success rounded-full">
                For Sale
              </div>
            </div>
            <h2 className="text-xl font-medium">
              Modern Glass Villa with Garden Views
            </h2>
            <p className="flex items-center gap-2 text-gray-500">
              <RiMapPin2Fill size={15} /> Indira Nagar, Rishikesh
            </p>
            <div className="flex flex-row justify-start gap-4 text-gray-500">
              <div className="flex flex-row items-center gap-2">
                <RiHotelBedFill size={18} /> 4
              </div>
              <div className="flex flex-row items-center gap-2">
                <RiHandSanitizerFill size={17} /> 3
              </div>
              <div className="flex flex-row items-center gap-2">
                <RiShadowFill size={16} /> 302 sq ft
              </div>
            </div>
          </div>
        </div>
        <div className="card bg-base-100  shadow-sm">
          <img
            className="h-80 w-full object-cover object-center rounded-t-lg "
            src={propertyToBuy[0].images.featuredImage}
            alt="Property Image"
          />

          <div className="card-body">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-medium text-primary ">₹45 Lakhs</h3>
              <div className="badge badge-sm badge-outline badge-success rounded-full">
                For Sale
              </div>
            </div>
            <h2 className="text-xl font-medium">
              Modern Glass Villa with Garden Views
            </h2>
            <p className="flex items-center gap-2 text-gray-500">
              <RiMapPin2Fill size={15} /> Indira Nagar, Rishikesh
            </p>
            <div className="flex flex-row justify-start gap-4 text-gray-500">
              <div className="flex flex-row items-center gap-2">
                <RiHotelBedFill size={18} /> 4
              </div>
              <div className="flex flex-row items-center gap-2">
                <RiHandSanitizerFill size={17} /> 3
              </div>
              <div className="flex flex-row items-center gap-2">
                <RiShadowFill size={16} /> 302 sq ft
              </div>
            </div>
          </div>
        </div>
        <div className="card bg-base-100  shadow-sm">
          <img
            className="h-80 w-full object-cover object-center rounded-t-lg "
            src={propertyToBuy[0].images.featuredImage}
            alt="Property Image"
          />

          <div className="card-body">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-medium text-primary ">₹45 Lakhs</h3>
              <div className="badge badge-sm badge-outline badge-success rounded-full">
                For Sale
              </div>
            </div>
            <h2 className="text-xl font-medium">
              Modern Glass Villa with Garden Views
            </h2>
            <p className="flex items-center gap-2 text-gray-500">
              <RiMapPin2Fill size={15} /> Indira Nagar, Rishikesh
            </p>
            <div className="flex flex-row justify-start gap-4 text-gray-500">
              <div className="flex flex-row items-center gap-2">
                <RiHotelBedFill size={18} /> 4
              </div>
              <div className="flex flex-row items-center gap-2">
                <RiHandSanitizerFill size={17} /> 3
              </div>
              <div className="flex flex-row items-center gap-2">
                <RiShadowFill size={16} /> 302 sq ft
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
