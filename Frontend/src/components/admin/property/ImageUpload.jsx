import React from "react";
import {
  RiUploadCloud2Line,
  RiAddLine,
  RiDeleteBinLine,
  RiImageAddLine,
} from "@remixicon/react";

const ImageUpload = ({
  label,
  imagePreview,
  onImageChange,
  isMultiple = false,
  galleryPreviews = [],
  onRemoveGalleryImage,
  className = "",
  helperText = "Scale: 1:1, Size: < 5MB",
}) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ${className}`}
    >
      {label && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
            {label}
          </h3>
          {isMultiple && (
            <span className="text-xs text-gray-500">
              {galleryPreviews.length} images
            </span>
          )}
        </div>
      )}

      {!isMultiple ? (
        // Single Image Upload
        <div
          className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all h-48 ${
            imagePreview
              ? "border-primary bg-blue-50/30"
              : "border-gray-200 hover:border-primary hover:bg-gray-50"
          }`}
        >
          <input
            type="file"
            onChange={onImageChange}
            className="hidden"
            id={`upload-${
              label ? label.replace(/\s+/g, "-").toLowerCase() : "single"
            }`}
            accept="image/*"
          />
          <label
            htmlFor={`upload-${
              label ? label.replace(/\s+/g, "-").toLowerCase() : "single"
            }`}
            className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
          >
            {imagePreview ? (
              <div className="relative w-full h-full group">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg shadow-sm"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                  <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                    Change
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3 text-primary">
                  <RiUploadCloud2Line size={24} />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Upload / Drag and Drop
                </span>
                {helperText && (
                  <span className="text-xs text-gray-500 mt-1">
                    {helperText}
                  </span>
                )}
              </>
            )}
          </label>
        </div>
      ) : (
        // Multiple Image Upload (Gallery)
        <div className="grid grid-cols-4 gap-2">
          {/* Add Button */}
          <div className="aspect-square bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-blue-50 hover:text-primary transition-all relative">
            <input
              type="file"
              multiple
              onChange={onImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept="image/*"
            />
            <RiAddLine size={24} />
          </div>
          {/* Previews */}
          {galleryPreviews.map((src, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-lg overflow-hidden relative group shadow-sm border border-gray-100"
            >
              <img
                src={src}
                alt={`Gallery ${idx}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() =>
                    onRemoveGalleryImage && onRemoveGalleryImage(idx)
                  }
                  className="text-white hover:text-red-400"
                >
                  <RiDeleteBinLine size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
