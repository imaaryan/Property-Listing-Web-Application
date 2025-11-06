import React, { useEffect, useState } from "react";
import { area } from "../../assets/dummyData";
import {
  RiMapPin2Fill,
  RiHotelBedFill,
  RiHandSanitizerFill,
  RiShadowFill,
  RiHeart3Line,
  RiHeart3Fill,
  RiPhoneLine,
  RiExternalLinkLine,
} from "@remixicon/react";
import { useNavigate } from "react-router-dom";

const Card = ({ Property }) => {
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(false);

  const {
    _id,
    title,
    bedrooms,
    bathrooms,
    propertySize,
    propertyType,
    propertyFor,
    images: { featuredImage },
    pricing: {
      askingPrice,
      stampDuty,
      advocateFee,
      receiptFee,
      brokerCommission,
    },
    areaId,
  } = Property;

  const selectedArea = area.find((a) => a._id === areaId);
  const areaName = selectedArea?.name || "Unknown Area";
  const cityName = selectedArea?.city?.name || "Unknown City";

  useEffect(() => {
    try {
      const stored = localStorage.getItem("likedProperties");
      const likedProperties = stored ? JSON.parse(stored) : [];
      if (likedProperties.includes(_id)) {
        setIsLiked(true);
      }
    } catch (err) {
      console.error("Error reading liked properties:", err);
      localStorage.removeItem("likedProperties");
    }
  }, [_id]);

  const handleToggle = () => {
    try {
      const stored = localStorage.getItem("likedProperties");
      let likedProperties = stored ? JSON.parse(stored) : [];

      if (isLiked) {
        likedProperties = likedProperties.filter((id) => id !== _id);
      } else {
        likedProperties.push(_id);
      }

      localStorage.setItem("likedProperties", JSON.stringify(likedProperties));
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Error updating liked properties:", err);
    }
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

  const price = () => {
    const finelAmount =
      askingPrice * stampDuty + advocateFee + receiptFee + brokerCommission;

    const formattedAmount = formatPrice(finelAmount);
    return formattedAmount;
  };

  const convertToYardsIfNeeded = (size, type) => {
    const yardTypes = [
      "Residential Plot",
      "Commercial Plot",
      "Commercial Apartment",
      "Warehouse / Godown",
    ];

    if (yardTypes.includes(type)) {
      const inYards = Math.round(size / 9);
      return { size: inYards, unit: "sq yards" };
    }

    return { size, unit: "sq ft" };
  };

  const propertyBadge = () => {
    if (propertyFor === "Buy") {
      return (
        <div className="badge badge-sm badge-outline badge-success rounded-full">
          For Sale
        </div>
      );
    } else {
      return (
        <div className="badge badge-sm badge-outline badge-neutral rounded-full">
          For Rent
        </div>
      );
    }
  };

  return (
    <div className="relative card bg-base-100 shadow-sm group hover:shadow-xl overflow-hidden rounded-t-lg border border-blue-100">
      <div
        className="overflow-hidden rounded-t-lg"
        onClick={() =>
          navigate(
            `/property/${propertyFor === "Buy" ? "sale" : "rent"}/${_id}`
          )
        }
      >
        <img
          className="aspect-3/2 w-full object-cover object-center transform transition-transform duration-500 ease-in-out group-hover:scale-110"
          src={featuredImage}
          alt={title + " Image"}
        />
      </div>

      <div className="absolute p-3 flex justify-between items-top w-full">
        <div className="badge badge-sm badge-base-100 rounded-full">
          {propertyType}
        </div>
        <div
          className={
            isLiked
              ? "bg-red-100 p-2 rounded-full"
              : "bg-base-200 hover:bg-base-100 p-2 rounded-full "
          }
          onClick={handleToggle}
        >
          {isLiked ? (
            <RiHeart3Fill size={20} className="text-red-600 cursor-pointer" />
          ) : (
            <RiHeart3Line
              size={20}
              className="text-gray-400 hover:text-red-600 cursor-pointer"
            />
          )}
        </div>
      </div>

      <div className="card-body p-5">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-medium text-primary">{price()}</h3>
          {propertyBadge()}
        </div>

        <h2
          className="text-lg md:text-xl font-medium line-clamp-1 cursor-pointer group-hover:text-primary"
          onClick={() =>
            navigate(
              `/property/${propertyFor === "Buy" ? "sale" : "rent"}/${_id}`
            )
          }
        >
          {title}
        </h2>
        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-2 text-gray-500">
            <RiMapPin2Fill size={15} /> {areaName}, {cityName}
          </p>

          <div className="flex flex-row justify-start gap-4 text-gray-500">
            <div className={!bedrooms ? "hidden" : "flex flex-row items-center gap-2"}>
              <RiHotelBedFill size={18} /> {bedrooms}
            </div>

            <div className={!bathrooms ? "hidden" : "flex flex-row items-center gap-2"}>
              <RiHandSanitizerFill size={17} /> {bathrooms}
            </div>
            {(() => {
              const { size, unit } = convertToYardsIfNeeded(
                propertySize,
                propertyType
              );
              return (
                <div className="flex flex-row items-center gap-2">
                  <RiShadowFill size={16} /> {size} {unit}
                </div>
              );
            })()}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button className="btn btn-primary w-1/2 ">
            <RiPhoneLine size={18} />
            Contact Owner
          </button>
          <button
            className="btn btn-outline w-1/2 "
            onClick={() =>
              navigate(
                `/property/${propertyFor === "Buy" ? "sale" : "rent"}/${_id}`
              )
            }
          >
            <RiExternalLinkLine size={18} />
            Know More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
