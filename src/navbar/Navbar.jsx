import { Link } from "react-router";
import { SearchModal } from "./SearchModal";
import { useState } from "react";

export const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div>
      <nav className="bg-black/90 backdrop-blur-sm border-b border-gray-800/50 sticky top-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-3 backdrop-blur-sm bg-white/5 p-1 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group shadow-lg"
          >
            <h1 className="text-2xl font-bold text-white tracking-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text ">
              Fílmigo
            </h1>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-8">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                Home
              </Link>
              <Link
                to="/movies"
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                Movies
              </Link>
              <Link
                to="/tvshows"
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                TV Shows
              </Link>
            </div>

            {/* Search Icon Button */}
            <button
              className="text-gray-300 hover:text-white transition-colors duration-200"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Mobile menu button */}
            <button className="md:hidden text-gray-300">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {isSearchOpen && <SearchModal onClose={setIsSearchOpen} />}
    </div>
  );
};
