import React from "react";

const FormSection = ({ title, children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-8 ${className}`}
    >
      {title && (
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default FormSection;
