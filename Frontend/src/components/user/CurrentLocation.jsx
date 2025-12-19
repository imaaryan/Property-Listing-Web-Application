import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { RiMapPinLine } from "@remixicon/react";

const CurrentLocation = ({ cityId, areaId }) => {
  const { backendUrl, userLocation } = useContext(AppContext);
  const [cityName, setCityName] = useState("");
  const [areaName, setAreaName] = useState("");
  const [loading, setLoading] = useState(false);

  const effectiveCityId = cityId || userLocation?.city;
  const effectiveAreaId = areaId || userLocation?.area;

  useEffect(() => {
    const fetchNames = async () => {
      if (!effectiveCityId) {
        setCityName("");
        setAreaName("");
        return;
      }

      setLoading(true);
      try {
        // Fetch Cities to find City Name
        // Ideally we would have an endpoint to get single city by ID,
        // but fetching list is standard here based on other components.
        const cityRes = await axios.get(`${backendUrl}/master/cities`);
        if (cityRes.data.success) {
          const city = cityRes.data.data.find((c) => c._id === effectiveCityId);
          setCityName(city ? city.name : "");
        }

        if (effectiveAreaId) {
          // Fetch Areas for this city
          const areaRes = await axios.get(
            `${backendUrl}/master/areas?cityId=${effectiveCityId}`
          );
          if (areaRes.data.success) {
            const area = areaRes.data.data.find(
              (a) => a._id === effectiveAreaId
            );
            setAreaName(area ? area.name : "");
          }
        } else {
          setAreaName("");
        }
      } catch (error) {
        console.error("Error fetching location names:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNames();
  }, [effectiveCityId, effectiveAreaId, backendUrl]);

  return (
    <>
      <div className="flex items-center gap-1.5 text-gray-700">
        <RiMapPinLine size={22} className="text-primary mt-[5px]" />
        <div>
          <p className="text-xs text-gray-500 font-light mb-[-2px]">
            Current Selected Location
          </p>
          <span className="text-base font-normal line-clamp-1">
            {loading ? (
              <span className="loading loading-dots loading-xs  "></span>
            ) : !cityName ? (
              "Select Location"
            ) : (
              <>
                {areaName ? `${areaName}, ` : ""}
                {cityName}
              </>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default CurrentLocation;
