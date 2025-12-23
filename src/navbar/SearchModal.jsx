import { useEffect, useState } from "react";
import { MovieCard } from "../common/MovieCard";

export const SearchModal = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  const API_KEY = "07da1c676789e8b449568f51b378e0cb";

  useEffect(() => {
    if (!input.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      setQuery(input);
    }, 400);

    return () => clearTimeout(timeout);
  }, [input]);

  useEffect(() => {
    if (!query) return;

    async function fetchSearch() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`
        );
        const data = await res.json();
        setResults(data.results.slice(0, 10));
      } catch (err) {
        setError("Failed to fetch search results");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSearch();
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center pt-12">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/90 backdrop-blur-md"
        onClick={() => onClose(false)}
      />

      {/* Content */}
      <div className="relative w-[80%] max-w-6xl z-10">
        {/* Search Input */}
        <div className="relative mb-10">
          <input
            type="text"
            placeholder="Type to search..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full px-8 py-6 bg-gray-800 border border-gray-700 
                       rounded-2xl text-gray-100 placeholder-gray-500 text-2xl
                       focus:outline-none focus:ring-2 focus:ring-gray-600
                       shadow-2xl"
          />

          {/* Search Icon */}
          <div className="absolute right-6 inset-y-0 flex items-center cursor-pointer text-amber-100">
            <button
              className="absolute right-5 top-1/2 -translate-y-1/2 
                        text-gray-400 hover:text-white transition-colors 
                        duration-200 px-3 py-1 bg-gray-700/50 hover:bg-gray-700
                        rounded-lg text-sm font-medium border border-gray-600"
              onClick={() => setInput("")}
            >
              Clear
            </button>
          </div>
        </div>
        {isLoading && (
          <div className=" animate-spin rounded-full h-6 w-6 border-2 border-gray-400 "></div>
        )}
        {/* Results */}
        {!isLoading && (
          <div className="max-w-4xl mx-auto">
            <MovieCard allMoviesTvs={results} error={error} onClose={onClose} />
          </div>
        )}
      </div>
    </div>
  );
};
