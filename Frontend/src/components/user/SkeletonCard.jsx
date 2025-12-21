import React from "react";

const SkeletonCard = () => {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 overflow-hidden rounded-t-lg">
      {/* Image Skeleton */}
      <div className="skeleton aspect-3/2 w-full rounded-none"></div>

      <div className="card-body p-5 gap-4">
        {/* Price and Badge */}
        <div className="flex justify-between items-center">
          <div className="skeleton h-8 w-1/3 rounded-md"></div>
          <div className="skeleton h-6 w-1/4 rounded-full"></div>
        </div>

        {/* Title */}
        <div className="skeleton h-6 w-3/4 rounded-md"></div>

        {/* Location */}
        <div className="skeleton h-4 w-1/2 rounded-md"></div>

        {/* Icons Row */}
        <div className="flex gap-4">
          <div className="skeleton h-5 w-16 rounded-md"></div>
          <div className="skeleton h-5 w-16 rounded-md"></div>
          <div className="skeleton h-5 w-20 rounded-md"></div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <div className="skeleton h-12 w-1/2 rounded-btn"></div>
          <div className="skeleton h-12 w-1/2 rounded-btn"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
