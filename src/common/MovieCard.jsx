import { Link } from "react-router";

export const MovieCard = ({ allMoviesTvs, error, type = "movies" }) => {
  return (
    <div>
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {allMoviesTvs.map((all, i) => (
          <div
            key={i}
            className="group bg-gray-900 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-900/50 cursor-pointer relative"
          >
            {/* Movie Poster */}
            <div className="relative aspect-[2/3] overflow-hidden">
              {all.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${all.poster_path}`}
                  alt={all.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">No Image</span>
                </div>
              )}

              {/* Rating Badge */}
              <div className="absolute top-2 left-2 bg-black/70 text-amber-400 px-2 py-1 rounded-full text-xs font-bold">
                ★ {all.vote_average?.toFixed(1)}
              </div>
            </div>

            {/* Movie Info */}
            <div className="p-3">
              <h3 className="text-white font-semibold text-sm truncate mb-1">
                {type === "movies" ? all.title : all.name}
              </h3>
              <div className="flex justify-between items-center text-gray-400 text-xs">
                <span>
                  {type === "movies"
                    ? all.release_date?.split("-")[0]
                    : all.first_air_date?.split("-")[0] || "N/A"}
                </span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                  {type === "movies" ? "Movie" : "Tv"}
                </span>
              </div>
            </div>

            {/* See Details Button - Shown on hover */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Link
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-6 rounded-lg transform scale-90 group-hover:scale-100 transition-transform duration-300"
                to={
                  type === "movies" ? `/movies/${all.id}` : `/tvshows/${all.id}`
                }
                onClick={() => onClose?.(false)}
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
