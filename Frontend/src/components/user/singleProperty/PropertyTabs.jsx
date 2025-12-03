import React from "react";
import Moment from "moment";
import { FaRegCheckCircle } from "react-icons/fa";
import PriceTrendGraph from "./PriceTrendGraph";

const PropertyTabs = ({ currentProperty, amenities, propertyFor = "Buy" }) => {
  return (
    <div className="flex flex-col my-6 gap-3 md:p-6 p-3 border-2 border-secondary rounded-xl bg-[#fdfdfd]">
      {/* name of each tab group should be unique */}
      <div className="tabs tabs-box bg-gray-100 rounded-md">
        <input
          type="radio"
          name="my_tabs_1"
          className={
            propertyFor === "Buy"
              ? "tab rounded-md w-1/3 max-sm:w-full text-base font-medium"
              : "tab rounded-md w-1/4 max-sm:w-full text-base font-medium"
          }
          aria-label="Details"
          defaultChecked
        />
        {/* Property Details Tab for Buy */}
        {propertyFor === "Buy" && (
          <div className="tab-content bg-white rounded-md py-3">
            <div className="grid xl:grid-cols-2 gap-6 p-4">
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
                <h5 className="text-gray-500">Allowable Construction Stilt:</h5>
                <p>
                  {currentProperty.propertyDetails.allowableConstructionStilt}
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
                  {currentProperty.propertyDetails.waterSupply ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex gap-2 text-base items-start justify-between">
                <h5 className="text-gray-500">Power Supply:</h5>
                <p>
                  {currentProperty.propertyDetails.powerSupply ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex gap-2 text-base items-start justify-between">
                <h5 className="text-gray-500">Loan Available:</h5>
                <p>
                  {currentProperty.propertyDetails.loanAvailable ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex gap-2 text-base items-start justify-between col-span-full">
                <h5 className=" text-gray-500">Address:</h5>
                <p>{currentProperty.propertyDetails.address}</p>
              </div>
            </div>
          </div>
        )}

        {/* Property Details Tab for Rent */}
        {propertyFor === "Rent" && (
          <div className="tab-content bg-white rounded-md py-3">
            <div className="grid xl:grid-cols-1 gap-6 p-4">
              <div className="flex gap-2 text-base items-start justify-between">
                <h5 className="text-gray-500">Furnishing:</h5>
                <p>{currentProperty.propertyDetails.furnishing}</p>
              </div>
              <div className="flex gap-2 text-base items-start justify-between">
                <h5 className="text-gray-500">Avalabe For:</h5>
                <p>{currentProperty.propertyDetails.avalabeFor}</p>
              </div>
              <div className="flex gap-2 text-base items-start justify-between">
                <h5 className="text-gray-500">Availability:</h5>
                <p>{currentProperty.propertyDetails.availability}</p>
              </div>
              <div className="flex gap-2 text-base items-start justify-between">
                <h5 className="text-gray-500">Features:</h5>
                <p>{currentProperty.propertyDetails.features}</p>
              </div>
            </div>
          </div>
        )}
        {/* Society Tab for Rent */}
        {propertyFor === "Rent" && (
          <>
            <input
              type="radio"
              name="my_tabs_1"
              className="tab rounded-md w-1/4 max-sm:w-full text-base font-medium"
              aria-label="Society"
              defaultChecked
            />
            <div className="tab-content bg-white rounded-md py-3">
              <div className="grid xl:grid-cols-1 gap-6 p-4">
                <div className="flex gap-2 text-base items-start justify-between">
                  <h5 className="text-gray-500">Society:</h5>
                  <p>{currentProperty.propertyDetails.society}</p>
                </div>
                <div className="flex gap-2 text-base items-start justify-between">
                  <h5 className="text-gray-500">Address:</h5>
                  <p>{currentProperty.propertyDetails.address}</p>
                </div>
              </div>
            </div>
          </>
        )}
        {/* Why This Tab for Rent */}
        {propertyFor === "Rent" && (
          <>
            <input
              type="radio"
              name="my_tabs_1"
              className="tab rounded-md w-1/4 max-sm:w-full text-base font-medium"
              aria-label="Why This?"
              defaultChecked
            />
            <div className="tab-content bg-white rounded-md py-3">
              <div className="grid xl:grid-cols-1 gap-6 p-4">
                <div className="flex gap-2 text-base items-start justify-between">
                  <p>{currentProperty.propertyDetails.whyConsider}</p>
                </div>
              </div>
            </div>
          </>
        )}

        {propertyFor === "Buy" && (
          <>
            <input
              type="radio"
              name="my_tabs_1"
              className="tab rounded-md w-1/3 max-sm:w-full text-base font-medium"
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
                    {currentProperty.pricing.stampDutyPercentage}
                    %):
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
                {currentProperty.pricing.priceHistory && (
                  <div className="mt-2 pt-6 border-t border-t-gray-300">
                    <h5 className="text-xl font-medium mb-4">Price History</h5>
                    <PriceTrendGraph
                      data={currentProperty.pricing.priceHistory.map(
                        (item) => ({
                          year: item.year,
                          price: item.cost,
                        })
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <input
          type="radio"
          name="my_tabs_1"
          className={
            propertyFor === "Buy"
              ? "tab rounded-md w-1/3 max-sm:w-full text-base font-medium"
              : "tab rounded-md w-1/4 max-sm:w-full text-base font-medium"
          }
          aria-label="Nearby Amenities"
        />
        {/* Amenities Tab */}
        <div className="tab-content bg-white rounded-md py-3">
          <div className="grid xl:grid-cols-4 gap-6 p-4">
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
  );
};

export default PropertyTabs;
