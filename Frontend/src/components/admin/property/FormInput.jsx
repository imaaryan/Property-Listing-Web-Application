import React from "react";

const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  className = "",
  disabled = false,
}) => {
  return (
    <div className={`form-control w-full ${className}`}>
      {label && (
        <label className="label font-semibold text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onClick={(e) => {
          if (type === "date") {
            try {
              e.target.showPicker();
            } catch (error) {
              // Fallback or ignore if not supported
            }
          }
        }}
        className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all bg-white disabled:bg-gray-100 disabled:text-gray-500"
      />
    </div>
  );
};

export default FormInput;
