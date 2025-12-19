import React, { useState, useEffect, useContext, useRef } from "react";
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
import axios from "axios";
import { useSearchParams } from "react-router-dom"; // Import useSearchParams
import { AppContext } from "../../context/AppContext";
import {
  isYardType,
  formatPrice as utilsFormatPrice,
} from "../../utils/propertyUtils";

const propertyTypes = [
  "All",
  "Residential Plot",
  "Residential Apartment",
  "Independent House",
  "Commercial Plot",
  "Commercial Shop",
  "Commercial Apartment",
  "Warehouse / Godown",
  "Agricultural Land",
];

const Filter = ({ onSearch }) => {
  const { backendUrl, userLocation, updateUserLocation } =
    useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // Helper to get initial state from URL Params or fallback to localStorage/UserLocation
  const getInitialState = () => {
    // Priority: URL Params > LocalStorage (Migration) > User Location > Default

    // Check URL First
    if (searchParams.has("city")) {
      return {
        city: searchParams.get("city") || "",
        area: searchParams.get("area") || "",
        type: searchParams.get("type") || "",
        minArea: Number(searchParams.get("minArea")) || 0,
        maxArea: Number(searchParams.get("maxArea")), // undefined is fine here
        minPrice: Number(searchParams.get("minPrice")) || 0,
        maxPrice: Number(searchParams.get("maxPrice")),
      };
    }

    // Fallback to LocalStorage (Legacy support / Session persistence)
    const saved = localStorage.getItem("lastKnownFilters");
    if (saved) {
      try {
        return JSON.parse(saved) || {};
      } catch (e) {
        console.error("Error parsing saved filters", e);
      }
    }
    return {};
  };

  const initialState = getInitialState();

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  const [selectedCity, setSelectedCity] = useState(
    initialState.city || userLocation?.city || ""
  );
  const [selectedArea, setSelectedArea] = useState(
    initialState.area || userLocation?.area || ""
  );
  const [selectedPropertyType, setSelectedPropertyType] = useState(
    initialState.type || ""
  );

  const [dynamicMinArea, setDynamicMinArea] = useState(0);
  const [dynamicMaxArea, setDynamicMaxArea] = useState(10000);
  const [dynamicMinPrice, setDynamicMinPrice] = useState(0);
  const [dynamicMaxPrice, setDynamicMaxPrice] = useState(100000000);

  // Use Ref to track last unit type without triggering re-renders
  const lastUnitType = useRef(isYardType(initialState.type) ? "yard" : "ft");
  const isFirstRender = useRef(true);

  // Static ranges for fallbacks
  const fallbackMaxArea = 10000;
  const fallbackMaxPrice = 100000000;

  const [areaRange, setAreaRange] = useState([
    initialState.minArea || 0,
    initialState.maxArea || fallbackMaxArea,
  ]);
  const [priceRange, setPriceRange] = useState([
    initialState.minPrice || 0,
    initialState.maxPrice || fallbackMaxPrice,
  ]);

  // Update URL if userLocation loads and URL is empty (First Visit Logic)
  useEffect(() => {
    if (userLocation && !searchParams.has("city") && isFirstRender.current) {
      // NOTE: We don't auto-search here to avoid un-wanted navigation,
      // but we update local state to match user location.
      if (userLocation.city !== selectedCity)
        setSelectedCity(userLocation.city || "");
      if (userLocation.area !== selectedArea)
        setSelectedArea(userLocation.area || "");
    }
  }, [userLocation, searchParams, selectedCity, selectedArea]);

  // Sync state with URL params when they change (e.g. from LocationModal)

  const cityFromUrl = searchParams.get("city");
  const areaFromUrl = searchParams.get("area");

  useEffect(() => {
    if (cityFromUrl && cityFromUrl !== selectedCity) {
      setSelectedCity(cityFromUrl);
    }
    if (areaFromUrl && areaFromUrl !== selectedArea) {
      setSelectedArea(areaFromUrl);
    }
  }, [cityFromUrl, areaFromUrl]);

  // Fetch Cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/master/cities`);
        if (data.success) {
          setCities(data.data);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, [backendUrl]);

  // Fetch Areas when selectedCity changes
  useEffect(() => {
    if (!selectedCity) {
      setAreas([]);
      return;
    }
    const fetchAreas = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/master/areas?cityId=${selectedCity}`
        );
        if (data.success) {
          setAreas(data.data);
        }
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };
    fetchAreas();
  }, [selectedCity, backendUrl]);

  // Calculate Dynamic Ranges (using Stats Endpoint)
  useEffect(() => {
    const fetchRangeStats = async () => {
      try {
        let url = `${backendUrl}/properties/stats`;
        const params = new URLSearchParams();
        if (selectedCity) params.append("city", selectedCity);
        if (selectedArea) params.append("area", selectedArea);
        if (selectedPropertyType && selectedPropertyType !== "All")
          params.append("type", selectedPropertyType);

        const queryString = params.toString();
        if (queryString) url += `?${queryString}`;

        const { data } = await axios.get(url);

        if (data.success && data.data) {
          const stats = data.data;

          // Stats are in Sq Ft and Absolute Price
          const minA_SqFt = stats.minArea || 0;
          const maxA_SqFt = stats.maxArea || fallbackMaxArea;

          const minP_Buy = stats.minPriceBuy || 0;
          const maxP_Buy = stats.maxPriceBuy || fallbackMaxPrice;
          const minP_Rent = stats.minPriceRent || 0;
          const maxP_Rent = stats.maxPriceRent || fallbackMaxPrice;

          // Determine Unit Type
          const useYards = isYardType(selectedPropertyType);
          const currentUnitType = useYards ? "yard" : "ft";

          const unitChanged = currentUnitType !== lastUnitType.current;
          lastUnitType.current = currentUnitType;

          // Convert Area min/max if needed
          const minA = useYards ? minA_SqFt / 9 : minA_SqFt;
          const maxA = useYards ? maxA_SqFt / 9 : maxA_SqFt;

          // Determine Price min/max based on likely context (Buy vs Rent)
          // Since this is a general filter, we should probably cover both ranges
          // OR intelligent guess. For now, let's take the absolute min/max across both
          // to ensure no properties are hidden.
          // OR better: The user hasn't selected "Buy" or "Rent" in the filter explicitly
          // (it's not in the UI mockup provided initially, only property type).
          // So we should show range that covers everything found.

          const minP =
            Math.min(minP_Buy || minP_Rent, minP_Rent || minP_Buy) || 0;
          const maxP = Math.max(maxP_Buy, maxP_Rent) || fallbackMaxPrice;

          setDynamicMinArea(Math.floor(minA));
          setDynamicMaxArea(Math.ceil(maxA));
          setDynamicMinPrice(Math.floor(minP));
          setDynamicMaxPrice(Math.ceil(maxP));

          // Use Ref to track first render for preserving saved filters
          // If it's NOT the first render (i.e. user changed filters), default to full range.
          const shouldReset = unitChanged || !isFirstRender.current;

          setAreaRange((prev) => {
            if (shouldReset) {
              return [Math.floor(minA), Math.ceil(maxA)];
            }

            // Initial Load: Respect saved filters but ensure validity
            const newMin = Math.max(Math.floor(minA), prev[0]);
            const newMax = Math.min(
              Math.ceil(maxA),
              prev[1] > maxA
                ? maxA
                : prev[1] === fallbackMaxArea
                ? maxA
                : prev[1]
            );

            if (newMin > newMax) {
              return [Math.floor(minA), Math.ceil(maxA)];
            }
            return [newMin, newMax];
          });

          setPriceRange((prev) => {
            if (!isFirstRender.current) {
              return [Math.floor(minP), Math.ceil(maxP)];
            }

            // Initial Load: Respect saved filters
            return [
              Math.max(Math.floor(minP), prev[0]),
              Math.min(
                Math.ceil(maxP),
                prev[1] > maxP
                  ? maxP
                  : prev[1] === fallbackMaxPrice
                  ? maxP
                  : prev[1]
              ),
            ];
          });

          isFirstRender.current = false;
        } else {
          setDynamicMinArea(0);
          setDynamicMaxArea(fallbackMaxArea);
          setDynamicMinPrice(0);
          setDynamicMaxPrice(fallbackMaxPrice);
          isFirstRender.current = false;
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchRangeStats();
  }, [selectedCity, selectedArea, selectedPropertyType, backendUrl]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedArea("");
  };

  const handleSearch = () => {
    const useYards = isYardType(selectedPropertyType);

    const minAreaToSend = useYards ? areaRange[0] * 9 : areaRange[0];
    const maxAreaToSend = useYards ? areaRange[1] * 9 : areaRange[1];

    // Params to sync to URL
    const params = {};
    if (selectedCity) params.city = selectedCity;
    if (selectedArea) params.area = selectedArea;
    if (selectedPropertyType) params.type = selectedPropertyType;
    params.minArea = minAreaToSend;
    params.maxArea = maxAreaToSend;
    params.minPrice = priceRange[0];
    params.maxPrice = priceRange[1];

    // Persist to LocalStorage for good measure (backup)
    localStorage.setItem("lastKnownFilters", JSON.stringify(params));

    // Update Global User Location Context so CurrentLocation component stays in sync
    if (selectedCity || selectedArea) {
      updateUserLocation(selectedCity, selectedArea);
    }

    // Update URL - This is the Main Action
    setSearchParams(params);

    if (onSearch) onSearch();
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
            {cities.map((c) => (
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
            {areas.map((a) => (
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
            <h4>
              Property Area (
              {isYardType(selectedPropertyType) ? "Sq. yard" : "Sq. ft"})
            </h4>
          </div>
          <div className="w-full px-2">
            <Slider
              range
              min={dynamicMinArea}
              max={dynamicMaxArea}
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
              <span>
                {areaRange[0]}{" "}
                {isYardType(selectedPropertyType) ? "sq yds" : "sq ft"}
              </span>
              <span>
                {areaRange[1]}{" "}
                {isYardType(selectedPropertyType) ? "sq yds" : "sq ft"}
              </span>
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
              min={dynamicMinPrice}
              max={dynamicMaxPrice}
              value={priceRange}
              onChange={setPriceRange}
              step={1000}
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
              <span>{utilsFormatPrice(priceRange[0])}</span>
              <span>{utilsFormatPrice(priceRange[1])}</span>
            </div>
          </div>
        </div>

        <div>
          <button
            className="btn btn-primary text-base font-normal gap-2 w-full"
            onClick={handleSearch}
          >
            <RiSearchLine size={18} />
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default Filter;
