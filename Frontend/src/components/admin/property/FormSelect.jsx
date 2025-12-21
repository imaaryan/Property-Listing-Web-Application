import React from "react";

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select",
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
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all bg-white disabled:bg-gray-100 disabled:text-gray-500"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
