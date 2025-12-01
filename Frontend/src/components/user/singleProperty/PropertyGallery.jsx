import React from "react";

const PropertyGallery = ({ currentProperty }) => {
  return (
    <div>
      <img
        className="aspect-3/2 w-full object-cover object-center transform transition-transform duration-500 ease-in-out group-hover:scale-110 rounded-xl"
        src={currentProperty.images.featuredImage}
        alt={currentProperty.title + " Image"}
      />
    </div>
  );
};

export default PropertyGallery;
