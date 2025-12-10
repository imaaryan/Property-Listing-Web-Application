import React, { useState, useContext, useEffect, useCallback } from "react";
import Card from "../../components/user/Card.jsx";
import Filter from "../../components/user/Filter.jsx";
import { RiEqualizerLine, RiLoader4Line } from "@remixicon/react";
import Map from "../../components/user/Map.jsx";
import { AppContext } from "../../context/AppContext.jsx";
import axios from "axios";
import LocationModal from "../../components/user/LocationModal.jsx";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [drawerStatus, setDrawerStatus] = useState(false);
  const { backendUrl, loadingLocation } = useContext(AppContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [searchParams] = useSearchParams();

  const fetchProperties = useCallback(
    async (currentPage, shouldReset = false) => {
      if (shouldReset) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      try {
        let url = `${backendUrl}/properties/get-all`;
        const params = new URLSearchParams();

        // Pagination Params
        const LIMIT = 12;
        params.append("page", currentPage);
        params.append("limit", LIMIT);

        // Filter Params from URL
        if (searchParams.get("city"))
          params.append("city", searchParams.get("city"));
        if (searchParams.get("area"))
          params.append("area", searchParams.get("area"));
        const type = searchParams.get("type");
        if (type && type !== "All") params.append("type", type);

        if (searchParams.get("minPrice"))
          params.append("minPrice", searchParams.get("minPrice"));
        if (searchParams.get("maxPrice"))
          params.append("maxPrice", searchParams.get("maxPrice"));
        if (searchParams.get("minArea"))
          params.append("minArea", searchParams.get("minArea"));
        if (searchParams.get("maxArea"))
          params.append("maxArea", searchParams.get("maxArea"));

        const queryString = params.toString();
        if (queryString) url += `?${queryString}`;

        const { data } = await axios.get(url);

        if (data.success) {
          if (shouldReset) {
            setProperties(data.data);
            // If we received fewer items than limit, no more pages
            setHasMore(data.data.length === LIMIT);
          } else {
            setProperties((prev) => [...prev, ...data.data]);
            setHasMore(data.data.length === LIMIT);
          }
          setPage(currentPage);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [backendUrl, searchParams]
  );

  // Initial Fetch & Reset on Filter Change
  useEffect(() => {
    if (loadingLocation) return;

    // Reset to Page 1 whenever filters change (URL changes)
    fetchProperties(1, true);
  }, [fetchProperties, loadingLocation, searchParams]);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchProperties(page + 1, false);
    }
  };

  return (
    <>
      <LocationModal />
      <div className="flex justify-between m-4">
        <div>
          {/* {Current Selected Area,City} */}
        </div>
        <div className="block sm:hidden">
          <button
            className="btn btn-primary text-base w-30 font-normal "
            onClick={() => {
              setDrawerStatus(true);
            }}
          >
            <RiEqualizerLine size={18} />
            Filter
          </button>
          <div
            className={`${
              !drawerStatus ? "hidden" : ""
            } fixed bottom-0 right-0 left-0 top-0 z-97`}
          >
            <div
              className=" fixed bottom-0 right-0 left-0 top-0 z-98 w-full bg-[#00000070]  h-100dvh"
              onClick={() => {
                setDrawerStatus(false);
              }}
            ></div>
            <div className="bg-[#e2e7fc]  pb-0 rounded-t-4xl fixed -bottom-3 right-0 left-0 z-99 w-full">
              <div className="flex flex-col items-center w-full max-w-xl mx-auto ">
                <div
                  className="sm:hidden w-full flex justify-center"
                  onClick={() => {
                    setDrawerStatus(false);
                  }}
                >
                  <div className=" h-1.5 w-40 bg-gray-400  m-4  rounded-full opacity-50 "></div>
                </div>
                <Filter onSearch={() => setDrawerStatus(false)} />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <Filter />
        </div>
      </div>

      <div className="max-w-[1410px] mx-auto z-10 pb-20">
        {loading ? (
          <div className="col-span-full text-center py-20 min-h-[50vh] flex justify-center items-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 min-h-[50vh] text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Properties Found
            </h3>
            <p className="text-gray-500 max-w-md">
              We couldn't find any properties matching your search. Try
              adjusting your filters or location.
            </p>
          </div>
        ) : (
          <>
            {/* Map Section - Only show if we have properties */}
            <div className="w-full max-2xl:px-4  h-[500px] max-sm:h-[50dvh] mb-8">
              <Map
                items={properties}
                center={
                  properties[0]?.locationOnMap
                    ? [
                        properties[0].locationOnMap.latitude,
                        properties[0].locationOnMap.longitude,
                      ]
                    : null
                }
              />
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 p-4 2xl:p-0 gap-4  pb-4 pt-2 w-full max-w-[1440px] mx-auto">
              {properties.map((property) => (
                <Card key={property._id} Property={property} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-10">
                <button
                  className="btn btn-outline btn-primary px-8"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <>
                      <RiLoader4Line className="animate-spin" size={20} />
                      Loading...
                    </>
                  ) : (
                    "Load More Properties"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
