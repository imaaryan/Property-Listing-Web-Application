import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { RiEyeLine } from "@remixicon/react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

const PDFThumbnail = ({ pdfUrl, onClick }) => {
  return (
    <div
      className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 cursor-pointer group"
      onClick={onClick}
    >
      <Document
        file={pdfUrl}
        loading={
          <div className="flex items-center justify-center h-full w-full text-gray-400 text-sm">
            Loading Preview...
          </div>
        }
        error={
          <div className="flex items-center justify-center h-full w-full text-red-400 text-sm p-4 text-center">
            Preview Unavailable
          </div>
        }
        className="flex justify-center items-start h-full"
      >
        <Page
          pageNumber={1}
          width={200} // Set a fixed width for thumbnail rendering
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="shadow-sm opacity-90 group-hover:opacity-100 transition-opacity"
        />
      </Document>

      {/* Overlay on Hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <RiEyeLine size={18} className="text-primary" />
          <span className="text-sm font-medium text-gray-800">
            View Full Screen
          </span>
        </div>
      </div>
    </div>
  );
};

export default PDFThumbnail;
