import { useState } from "react";

export const Filter = ({ options, onChange, placeholder = "filter" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(placeholder);

  function handleClick(option) {
    onChange(option.value);
    setSelectedGenre(option.label);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2.5 rounded-lg hover:bg-gray-700 border border-gray-600 hover:border-amber-500 transition-all duration-200 min-w-[160px] justify-between"
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
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          <span className="font-medium text-sm">{selectedGenre}</span>
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
        <div className="absolute top-full right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden z-50 min-w-[200px] max-h-[300px] overflow-y-auto">
          <div className="py-2">
            {/* Add "All Genres" option */}

            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleClick(option)}
                className="px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-600/30 cursor-pointer transition-colors duration-150 border-b border-gray-800 last:border-b-0 text-sm"
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
