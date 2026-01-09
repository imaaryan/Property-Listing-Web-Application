import React from "react";
import Map from "../Map";

const PropertyMap = ({ currentProperty }) => {
  return (
    <div className="flex flex-col my-6 gap-3 md:p-6 p-3 border-2 border-secondary rounded-xl bg-[#fdfdfd] h-[400px]">
      <Map
        items={[
          {
            ...currentProperty,
            image: currentProperty.images.featuredImage,
            pricing: {
              ...currentProperty.pricing,
              price: currentProperty.pricing.finelPricing,
            },
          },
        ]}
        center={[
          currentProperty.locationOnMap.latitude,
          currentProperty.locationOnMap.longitude,
        ]}
        amenities={currentProperty.nearbyAmenities || []}
      />
    </div>
  );
};

export default PropertyMap;
