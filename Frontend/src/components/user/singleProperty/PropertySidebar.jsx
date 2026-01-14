import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiMapPin2Fill,
  RiHotelBedFill,
  RiHandSanitizerFill,
  RiShadowFill,
  RiPhoneLine,
  RiInbox2Line,
  RiCalculatorLine,
  RiFileTextLine,
} from "@remixicon/react";
import {
  convertToYardsIfNeeded,
  formatPrice,
} from "../../../utils/propertyUtils";
import PDFThumbnail from "./PDFThumbnail";
import PDFViewerModal from "./PDFViewerModal";
import dummyPdf from "../../../assets/pdf/dummy.pdf";

const PropertySidebar = ({
  currentProperty,
  areaName,
  cityName,
  propertyFor = "Buy",
  onOpenEmiCalculator,
}) => {
  const navigate = useNavigate();
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Removed local convertToYardsIfNeeded in favor of utils

  // Removed local formatPrice in favor of utils

  return (
    <>
      <div className="flex flex-col gap-3 md:p-6 p-3 border-2 border-secondary rounded-xl bg-[#fdfdfd] ">
        {/* Property Type Badge */}
        <div className="badge badge-sm badge-primary rounded-full">
          {currentProperty.propertyType}
        </div>

        {/* Property Title */}
        <h2 className="text-3xl font-medium">{currentProperty.title}</h2>

        {/* Property Location */}
        <p className="flex items-center gap-2 text-gray-500">
          <RiMapPin2Fill size={15} /> {areaName}, {cityName}
        </p>

        {/* Property Price */}
        <h3 className="text-4xl font-medium text-primary">
          ₹
          {propertyFor === "Buy"
            ? formatPrice(currentProperty.pricing.finelPricing)
            : formatPrice(currentProperty.pricing.rentPerMonth) + "/month"}
        </h3>

        {propertyFor === "Rent" && (
          <div className="flex gap-1 items-end">
            <span className="text-2xl">
              ₹{formatPrice(currentProperty.pricing.securityDeposit)}
            </span>
            <p className="flex items-center text-gray-500">Security Deposit</p>
          </div>
        )}

        {/* Property BHK & Size Info */}
        <div className="flex flex-row flex-wrap justify-start gap-2 my-3 ">
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
              currentProperty.propertyType,
              currentProperty.propertySizeInYard
            );
            return (
              <div className="flex flex-row items-center gap-2 p-3 bg-[#1244e320] hover:bg-[#1244e330] select-none text-sm rounded-lg">
                <RiShadowFill size={22} color="#1244e3" /> {size} {unit}
              </div>
            );
          })()}
        </div>

        {/* Khatauni Details - Only for Buy */}

        <div className="flex flex-col gap-3 mb-3">
          <h2 className="text-xl font-medium">
            {!propertyFor === "Buy" ? "Khatauni Details" : "Owner Details"}
          </h2>
          <div>
            {propertyFor === "Buy" && (
              <h3 className="text-md font-medium ">Current Owner:</h3>
            )}
            <p className="text-base text-gray-500">
              {currentProperty.khatuniDetails.currentOwner}
            </p>
          </div>
          {propertyFor === "Buy" && (
            <div>
              <div>
                <h3 className="text-md font-medium ">Previous Owner:</h3>
                <p className="text-base text-gray-500">
                  {currentProperty.khatuniDetails.previousOwner}
                </p>
              </div>
              <div>
                <h3 className="text-md font-medium ">Khasra Number:</h3>
                <p className="text-base text-gray-500">
                  {currentProperty.khatuniDetails.khasraNumber}
                </p>
              </div>
              <div className="mt-2">
                <h3 className="text-md font-medium mb-2">Khatauni Details:</h3>
                {/* PDF Thumbnail */}
                <PDFThumbnail
                  pdfUrl={dummyPdf}
                  onClick={() => setIsPdfModalOpen(true)}
                />
              </div>
            </div>
          )}
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

        {/* <button
        className="btn btn-outline border-gray-400 text-gray-600 text-lg font-normal hover:bg-secondary hover:text-primary"
        onClick={() =>
          navigate(
            `/property/${propertyFor === "Buy" ? "sale" : "rent"}/${
              currentProperty._id
            }`
          )
        }
      >
        <RiInbox2Line size={22} />
        Send Enquiry
      </button> */}

        {propertyFor === "Buy" &&
          // Button removed as EMI calculator is now inline
          null}
      </div>

      {isPdfModalOpen && (
        <PDFViewerModal
          pdfUrl={dummyPdf}
          onClose={() => setIsPdfModalOpen(false)}
        />
      )}
    </>
  );
};

export default PropertySidebar;
