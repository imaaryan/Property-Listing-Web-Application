import React, { useState, useEffect } from "react";
import {
  RiHeart3Line,
  RiHeart3Fill,
  RiShareLine,
  RiCameraLine,
  RiCloseLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "@remixicon/react";

const PropertyGallery = ({ currentProperty }) => {
  const [selectedImage, setSelectedImage] = useState(
    currentProperty.images.featuredImage
  );
  const [isLiked, setIsLiked] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);

  // Combine featured image and gallery images, ensuring no duplicates if featured is already in gallery
  const allImages = [
    currentProperty.images.featuredImage,
    ...currentProperty.images.imageGallery.filter(
      (img) => img !== currentProperty.images.featuredImage
    ),
  ];

  useEffect(() => {
    try {
      const stored = localStorage.getItem("likedProperties");
      const likedProperties = stored ? JSON.parse(stored) : [];
      if (likedProperties.includes(currentProperty._id)) {
        setIsLiked(true);
      }
    } catch (err) {
      console.error("Error reading liked properties:", err);
    }
  }, [currentProperty._id]);

  const handleWishlistToggle = () => {
    try {
      const stored = localStorage.getItem("likedProperties");
      let likedProperties = stored ? JSON.parse(stored) : [];

      if (isLiked) {
        likedProperties = likedProperties.filter(
          (id) => id !== currentProperty._id
        );
      } else {
        likedProperties.push(currentProperty._id);
      }

      localStorage.setItem("likedProperties", JSON.stringify(likedProperties));
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Error updating liked properties:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentProperty.title,
          text: `Check out this property: ${currentProperty.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
        // Fallback if sharing fails (e.g. user cancelled)
        if (error.name !== "AbortError") {
          navigator.clipboard.writeText(window.location.href);
          alert("Link copied to clipboard!");
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (err) {
        alert("Failed to copy link.");
      }
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const currentIndex = allImages.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % allImages.length;
    setSelectedImage(allImages[nextIndex]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const currentIndex = allImages.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setSelectedImage(allImages[prevIndex]);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Container */}
      <div className="relative w-full aspect-3/2 md:aspect-video rounded-xl overflow-hidden group">
        <img
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105 cursor-pointer"
          src={selectedImage}
          alt={currentProperty.title}
          onClick={() => setShowLightbox(true)}
        />

        {/* Top Left Actions */}
        <div className="absolute top-4 left-4 flex gap-2">
          <button
            className={`btn btn-sm btn-circle border-none shadow-sm ${
              isLiked
                ? "bg-red-100 hover:bg-red-200"
                : "bg-white/80 hover:bg-white"
            }`}
            onClick={handleWishlistToggle}
          >
            {isLiked ? (
              <RiHeart3Fill size={20} className="text-red-600" />
            ) : (
              <RiHeart3Line size={20} className="text-gray-700" />
            )}
          </button>
          <button
            className="btn btn-sm btn-circle bg-white/80 hover:bg-white border-none shadow-sm"
            onClick={handleShare}
          >
            <RiShareLine size={18} className="text-gray-700" />
          </button>
        </div>

        {/* Top Right Image Count */}
        <div className="absolute top-4 right-4 pointer-events-none">
          <div className="badge bg-black/50 text-white border-none gap-2 px-3 py-3">
            <RiCameraLine size={16} />
            {allImages.indexOf(selectedImage) + 1} / {allImages.length}
          </div>
        </div>
      </div>

      {/* Thumbnails Carousel */}
      <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
        {allImages.map((img, index) => (
          <div
            key={index}
            className={`shrink-0 cursor-pointer rounded-lg overflow-hidden aspect-video w-24 md:w-32 border-2 transition-all duration-200 snap-start ${
              selectedImage === img
                ? "border-primary ring-2 ring-primary/20"
                : "border-transparent hover:border-gray-300"
            }`}
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {showLightbox && (
        <div
          className="fixed inset-0 z-111 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setShowLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 z-50"
            onClick={() => setShowLightbox(false)}
          >
            <RiCloseLine size={40} />
          </button>

          <button
            className="absolute left-2 md:left-8 text-white hover:text-gray-300 p-2 z-50 bg-black/20 rounded-full hover:bg-black/40 transition-colors"
            onClick={handlePrev}
          >
            <RiArrowLeftSLine size={40} />
          </button>

          <img
            src={selectedImage}
            alt="Lightbox View"
            className="max-w-full max-h-[90vh] object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-2 md:right-8 text-white hover:text-gray-300 p-2 z-50 bg-black/20 rounded-full hover:bg-black/40 transition-colors"
            onClick={handleNext}
          >
            <RiArrowRightSLine size={40} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-1 rounded-full text-sm">
            {allImages.indexOf(selectedImage) + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyGallery;
