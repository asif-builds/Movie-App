import { useState } from "react";

export const Sort = ({ options, setSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Sort");

  const handleSortClick = (option) => {
    setSort(option.value);
    setSelectedSort(option.label);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Sort Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2.5 rounded-lg hover:bg-gray-700 border border-gray-600 hover:border-red-500 transition-all duration-200 min-w-[150px] justify-between"
      >
        <div className="flex items-center gap-2">
          {/* Filter Icon SVG */}
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span className="font-medium">{selectedSort}</span>
        </div>
        {/* Chevron Icon SVG */}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden z-50 min-w-[200px]">
          <div className="py-2">
            {options.map((option, i) => (
              <div
                key={i}
                onClick={() => handleSortClick(option)}
                className="px-4 py-3 text-gray-300 hover:text-white hover:bg-red-600/30 cursor-pointer transition-colors duration-150 border-b border-gray-800 last:border-b-0 text-sm"
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
