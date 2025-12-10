import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { RiMapPinLine } from "@remixicon/react";

const CurrentLocation = ({ cityId, areaId }) => {
  const { backendUrl } = useContext(AppContext);
  const [cityName, setCityName] = useState("");
  const [areaName, setAreaName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNames = async () => {
      if (!cityId) {
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
          const city = cityRes.data.data.find((c) => c._id === cityId);
          setCityName(city ? city.name : "");
        }

        if (areaId) {
          // Fetch Areas for this city
          const areaRes = await axios.get(
            `${backendUrl}/master/areas?cityId=${cityId}`
          );
          if (areaRes.data.success) {
            const area = areaRes.data.data.find((a) => a._id === areaId);
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
  }, [cityId, areaId, backendUrl]);

  if (!cityId && !areaId) return null;

  return (
    <div className="flex items-center gap-1.5 text-gray-700">
      <RiMapPinLine size={20} className="text-primary" />
      <span className="text-base font-normal">
        {loading ? (
          <span className="loading loading-dots loading-xs"></span>
        ) : (
          <>
            {areaName ? `${areaName}, ` : ""}
            {cityName}
          </>
        )}
      </span>
    </div>
  );
};

export default CurrentLocation;
