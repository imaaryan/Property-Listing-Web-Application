import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { amenities } from "../../assets/dummyData.js"; // Keep amenities as they might still be dummy or need checking
import PropertyGallery from "../../components/user/singleProperty/PropertyGallery";
import PropertyTabs from "../../components/user/singleProperty/PropertyTabs";
import PropertyMap from "../../components/user/singleProperty/PropertyMap";
import PropertySidebar from "../../components/user/singleProperty/PropertySidebar";
import EMICalculator from "../../components/common/EMICalculator";
import axios from "axios";
import { AppContext } from "../../context/AppContext.jsx";

const SingleBuyProperty = () => {
  const { id } = useParams();
  const { backendUrl } = useContext(AppContext);
  const [showEmiCalculator, setShowEmiCalculator] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/properties/get/${id}`);
        if (data.success) {
          setCurrentProperty(data.data);
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id, backendUrl]);

  if (loading)
    return <div className="text-center p-10">Loading Property Details...</div>;

  if (!currentProperty)
    return <div className="text-center p-10">Property Not Found</div>;

  const areaName = currentProperty.areaId?.name || "Unknown Area";
  const cityName = currentProperty.areaId?.city?.name || "Unknown City";

  return (
    <>
      <div className="flex gap-8 p-2 md:p-4 lg:pr-4 w-full max-w-[1440px] mx-auto max-md:flex-wrap ">
        <div className="w-full min-w-0">
          {/* Featured Image and Gallery */}
          <PropertyGallery currentProperty={currentProperty} />

          {/* Sidebar in mobile full view */}
          <div className=" md:hidden pt-3 h-fit">
            <PropertySidebar
              currentProperty={currentProperty}
              areaName={areaName}
              cityName={cityName}
              propertyFor="Buy"
              onOpenEmiCalculator={() => setShowEmiCalculator(true)}
            />
          </div>

          {/* Short Description */}
          <div className="flex flex-col my-6 gap-3 md:p-6 p-3 border-2 border-secondary rounded-xl bg-[#fdfdfd]">
            <h2 className="text-lg font-medium ">Short Description</h2>
            <p className="text-base text-gray-500">
              {currentProperty.shortDescription}
            </p>
          </div>

          {/* Extra Info Tabs */}
          <PropertyTabs
            currentProperty={currentProperty}
            amenities={amenities}
          />

          {/* Property Cordinates in Map */}
          <PropertyMap currentProperty={currentProperty} />
        </div>

        {/* Sticky Sidebar */}
        <div className=" max-md:hidden max-w-[470px] max-md:max-w-full w-full min-w-[300px] sticky top-4 h-fit">
          <PropertySidebar
            currentProperty={currentProperty}
            areaName={areaName}
            cityName={cityName}
            propertyFor="Buy"
            onOpenEmiCalculator={() => setShowEmiCalculator(true)}
          />
        </div>
      </div>
      <EMICalculator
        isOpen={showEmiCalculator}
        onClose={() => setShowEmiCalculator(false)}
        defaultPrice={currentProperty.pricing?.finelPricing || 0}
      />
    </>
  );
};

export default SingleBuyProperty;
