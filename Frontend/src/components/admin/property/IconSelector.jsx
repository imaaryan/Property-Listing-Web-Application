import React, { useState } from "react";
import { RiCloseLine, RiSearchLine, RiInformationLine } from "@remixicon/react";
import { ICON_OPTIONS } from "../../../utils/iconMapping";

const IconSelector = ({ selectedIcon, onSelect, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIcons = ICON_OPTIONS.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SelectedIconComponent =
    ICON_OPTIONS.find((opt) => opt.id === selectedIcon)?.icon ||
    RiInformationLine;

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Icon
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 w-full px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
          <SelectedIconComponent size={18} />
        </div>
        <span className="flex-1 text-left text-gray-700">
          {ICON_OPTIONS.find((opt) => opt.id === selectedIcon)?.label ||
            "Select Icon"}
        </span>
      </button>

      {/* Modal/Dropdown Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-800">Select Icon</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <RiCloseLine size={24} />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <div className="relative">
                <RiSearchLine
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search icons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Grid */}
            <div className="overflow-y-auto p-4 flex-1">
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {filteredIcons.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      onSelect(opt.id);
                      setIsOpen(false);
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      selectedIcon === opt.id
                        ? "border-blue-500 bg-blue-50 text-blue-600 ring-2 ring-blue-200"
                        : "border-gray-100 hover:border-blue-200 hover:bg-gray-50 text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    <opt.icon size={24} className="mb-2" />
                    <span className="text-[10px] text-center font-medium leading-tight line-clamp-1">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
              {filteredIcons.length === 0 && (
                <div className="text-center py-8 text-gray-400 text-sm">
                  No icons found for "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IconSelector;
