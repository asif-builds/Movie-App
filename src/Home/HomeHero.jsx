import { Link } from "react-router";
export const HomeHero = ({
  currentIndex,
  nextSlide,
  prevSlide,
  topMovies,
  heroError,
  genreMap,
}) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {heroError && (
        <p className="text-center text-red-500 mb-4">{heroError}</p>
      )}

      {/* Slides Container */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {topMovies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-full h-full relative flex-shrink-0"
          >
            {/* Backdrop Image */}
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Content at Bottom Left */}
            <div className="absolute bottom-50 left-0 p-6 md:p-12">
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <span className="text-yellow-400 text-xl font-bold flex items-center">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">
                  {movie.release_date?.split("-")[0]}
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">
                  {movie.runtime
                    ? `${Math.floor(movie.runtime / 60)}h ${
                        movie.runtime % 60
                      }m`
                    : "N/A"}
                </span>
                <span className="text-gray-300">•</span>
                <span className="px-2 py-1 bg-gray-800/80 text-gray-300 text-sm rounded">
                  {movie.adult ? "18+" : "PG"}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-2xl">
                {movie.title}
              </h1>

              <p className="text-gray-300 mb-6 max-w-xl line-clamp-6">
                {movie.overview}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  className="bg-transparent hover:bg-gray-800/50 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 border border-gray-600"
                  to={`/movies/${movie.id}`}
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>More Details</span>
                </Link>
              </div>

              {/* Genres (if available in movie data) */}
              {movie.genre_ids && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {movie.genre_ids.slice(0, 3).map((id, index) => (
                    <span key={id} className="text-sm text-gray-400">
                      {genreMap[id]}
                      <span className="mx-2 text-gray-500">•</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <span className="text-xl md:text-2xl">‹</span>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <span className="text-xl md:text-2xl">›</span>
      </button>
    </div>
  );
};
