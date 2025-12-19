import React, { useState, useEffect, useContext } from "react";
import {
  RiMapPinLine,
  RiSignpostLine,
  RiArrowDownSLine,
} from "@remixicon/react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { useSearchParams } from "react-router-dom";

const LocationModal = () => {
  const { backendUrl, updateUserLocation, userLocation, loadingLocation } =
    useContext(AppContext);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [loadingCities, setLoadingCities] = useState(true);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [step, setStep] = useState(1);

  // Fetch Cities on Mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/master/cities`);
        if (data.success) {
          setCities(data.data);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoadingCities(false);
      }
    };
    fetchCities();
  }, [backendUrl]);

  // Fetch Areas when City Changes
  useEffect(() => {
    if (!selectedCity) {
      setAreas([]);
      return;
    }

    const fetchAreas = async () => {
      setLoadingAreas(true);
      try {
        const { data } = await axios.get(
          `${backendUrl}/master/areas?cityId=${selectedCity}`
        );
        if (data.success) {
          setAreas(data.data);
        }
      } catch (error) {
        console.error("Error fetching areas:", error);
      } finally {
        setLoadingAreas(false);
      }
    };
    fetchAreas();
  }, [selectedCity, backendUrl]);

  const handleSubmit = () => {
    if (!selectedCity || !selectedArea) return;

    // Update Context
    updateUserLocation(selectedCity, selectedArea);

    // Update URL (Sync)
    // We should preserve other Params if needed?
    // Usually Location change implies a fresh search for that location.
    const params = {};
    params.city = selectedCity;
    params.area = selectedArea;
    setSearchParams(params);
  };

  // Sync URL Params to Context and Suppress Modal
  const cityParam = searchParams.get("city");
  const areaParam = searchParams.get("area");

  useEffect(() => {
    if (cityParam && areaParam) {
      if (
        userLocation?.city !== cityParam ||
        userLocation?.area !== areaParam
      ) {
        updateUserLocation(cityParam, areaParam);
      }
    }
  }, [cityParam, areaParam, userLocation, updateUserLocation]);

  // Do not show anything if:
  // 1. Loading location check
  // 2. Location is already set (in context)
  // 3. URL has location params (we handle this via effect above)
  if (loadingLocation || userLocation || (cityParam && areaParam)) return null;

  return (
    <dialog id="location_modal" className="modal modal-open">
      <div className="modal-box w-11/12 max-w-2xl bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
        <h3 className="font-bold text-2xl text-center mb-2 text-gray-800">
          Select Your Location
        </h3>

        <div className="flex flex-col gap-8">
          {step === 1 && (
            <div className="w-full text-center animate-fade-in">
              <p className="text-gray-500 text-center font-light mb-8 text-md">
                Please select your city and area to see the best properties near
                you.
              </p>
              <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center justify-center gap-2">
                <RiMapPinLine size={21} className="text-primary" />
                Select City
              </h4>

              {loadingCities ? (
                <span className="loading loading-dots loading-md text-primary"></span>
              ) : (
                <div className="flex flex-wrap justify-center gap-3">
                  {cities.map((city) => (
                    <button
                      key={city._id}
                      onClick={() => {
                        setSelectedCity(city._id);
                        setSelectedArea("");
                        setStep(2);
                      }}
                      className="btn px-6 py-2 h-auto min-h-12 rounded-lg border text-base font-normal bg-white border-gray-300 text-gray-600 hover:border-primary hover:text-primary hover:bg-blue-50 transition-all duration-200"
                    >
                      {city.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="w-full text-center animate-fade-in">
              <p className="text-gray-500 text-center mb-8 text-lg mt-4 md:flex md:justify-center gap-2">
                Now select your preferred area in{" "}
                <span
                  onClick={() => setStep(1)}
                  className="font-semibold text-primary flex items-center justify-center gap cursor-pointer"
                >
                  {cities.find((c) => c._id === selectedCity)?.name}
                  <RiArrowDownSLine />
                </span>
              </p>

              <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center justify-center gap-2">
                <RiSignpostLine size={21} className="text-primary" />
                Select Area
              </h4>

              {loadingAreas ? (
                <span className="loading loading-dots loading-md text-primary"></span>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {areas.map((area) => (
                    <button
                      key={area._id}
                      onClick={() => setSelectedArea(area._id)}
                      className={`btn w-full h-auto min-h-10 py-2 rounded-lg border text-sm font-normal transition-all duration-200 ${
                        selectedArea === area._id
                          ? "btn-primary shadow-md"
                          : "bg-white border-gray-300 text-gray-600 hover:border-primary hover:text-primary"
                      }`}
                    >
                      {area.name}
                    </button>
                  ))}
                  {areas.length === 0 && (
                    <p className="col-span-full text-gray-400 text-sm">
                      No areas found for this city.
                    </p>
                  )}
                </div>
              )}

              <div className="modal-action justify-center mt-8">
                <button
                  className="btn btn-primary w-full max-w-sm text-lg rounded-xl shadow-lg"
                  onClick={handleSubmit}
                  disabled={!selectedArea}
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default LocationModal;
