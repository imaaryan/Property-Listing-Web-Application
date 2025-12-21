import React from "react";

const AmenitiesSelector = ({
  amenitiesList,
  selectedAmenities,
  onAmenityChange,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
      {amenitiesList?.length > 0 ? (
        amenitiesList.map((amenity) => (
          <label
            key={amenity._id}
            className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors -ml-2"
          >
            <input
              type="checkbox"
              checked={selectedAmenities.includes(amenity._id)}
              onChange={() => onAmenityChange(amenity._id)}
              className="checkbox checkbox-primary checkbox-sm rounded border-gray-300"
            />
            <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">
              {amenity.name}
            </span>
          </label>
        ))
      ) : (
        <div className="col-span-full text-center py-8 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          No amenities found. Please add amenities in settings.
        </div>
      )}
    </div>
  );
};

export default AmenitiesSelector;
