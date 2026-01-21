import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  RiCloseLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiZoomInLine,
  RiZoomOutLine,
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
  const [scale, setScale] = useState(1.0); // Start at 100%

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      {/* Close Button */}

      <div
        className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        onContextMenu={(e) => e.preventDefault()} // Disable right-click
      >
        {/* Header / Controls */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 flex-wrap gap-2">
         <div className="flex w-full justify-between items-center pb-2 ">
          <h3 className="font-semibold text-lg text-gray-700">
            Khatauni Details
          </h3>

            <button
              onClick={onClose}
              className="flex items-center gap-2 py-2 px-4 hover:bg-gray-200 bg-primary text-white rounded-full hover:text-gray-500 transition-colors"
            >
               <RiCloseLine size={20} /> Close
            </button>
         </div>

          <div className="flex items-center gap-4">

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
              <button
                onClick={zoomOut}
                disabled={scale <= 0.6}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 text-gray-600"
              >
                <RiZoomOutLine size={20} />
              </button>
              <span className="text-xs font-medium w-12 text-center text-gray-600">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={zoomIn}
                disabled={scale >= 3.0}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 text-gray-600"
              >
                <RiZoomInLine size={20} />
              </button>
            </div>

            <div className="h-6 w-px bg-gray-300 mx-2 hidden md:block"></div>

            <span className="text-sm text-gray-600  md:inline">
              Page {pageNumber} of {numPages || "--"}
            </span>

            {/* Page Navigation */}
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
        <div className="flex-1 overflow-auto flex bg-gray-100 p-4">
          <div className="min-w-fit min-h-fit m-auto shadow-lg">
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
                scale={scale}
              />
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewerModal;
