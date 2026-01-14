import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  RiCloseLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "@remixicon/react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure worker for Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFViewerModal = ({ pdfUrl, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
      >
        <RiCloseLine size={32} />
      </button>

      <div
        className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        onContextMenu={(e) => e.preventDefault()} // Disable right-click
      >
        {/* Header / Controls */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-lg text-gray-700">
            Khatauni Details
          </h3>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Page {pageNumber} of {numPages || "--"}
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={pageNumber <= 1}
                onClick={previousPage}
                className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RiArrowLeftSLine size={24} />
              </button>
              <button
                disabled={pageNumber >= numPages}
                onClick={nextPage}
                className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RiArrowRightSLine size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 overflow-auto flex justify-center bg-gray-100 p-4">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center h-64 text-gray-500">
                Loading PDF...
              </div>
            }
            error={
              <div className="flex items-center justify-center h-64 text-red-500">
                Failed to load PDF.
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="shadow-lg"
              scale={1.2}
            />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PDFViewerModal;
