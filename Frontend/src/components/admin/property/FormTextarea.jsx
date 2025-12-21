import React from "react";

const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  className = "",
  helperText = "",
  rows = 4,
}) => {
  return (
    <div className={`form-control w-full ${className} relative`}>
      {label && (
        <label className="label font-semibold text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="textarea textarea-bordered h-24 w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-base leading-relaxed bg-white border-gray-300 rounded-lg p-3"
      ></textarea>
      {helperText && (
        <div className="absolute top-2 right-2 text-xs text-gray-400">
          {helperText}
        </div>
      )}
    </div>
  );
};

export default FormTextarea;
