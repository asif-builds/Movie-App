import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = "07da1c676789e8b449568f51b378e0cb";

  useEffect(() => {
    if (!id) return;
    async function fetchMovieDetails() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
        );
        const data = await res.json();
        setMovie(data);
        console.log(data.credits.cast);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieDetails();
  }, [id]);

  // Get the first official trailer from the videos response
  const trailer = movie?.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-700 border-t-red-600"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <p className="text-red-500 text-xl">Movie not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Backdrop Hero Section */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-8">
            {/* Poster */}
            <img
              className="w-64 md:w-80 rounded-xl shadow-2xl"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Poster"
              }
              alt={movie.title}
            />

            {/* Movie Info */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {movie.title}{" "}
                <span className="text-gray-400">
                  ({new Date(movie.release_date).getFullYear()})
                </span>
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="flex items-center text-yellow-400 text-xl font-bold">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </span>
                <span className="text-gray-300">{movie.runtime} min</span>
                <span className="text-gray-300">{movie.release_date}</span>
                {movie.adult && (
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                    18+
                  </span>
                )}
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-800 hover:bg-red-600 px-3 py-1 rounded-full text-sm transition-colors duration-200"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Tagline */}
              {movie.tagline && (
                <p className="text-gray-300 italic text-lg mb-6">
                  "{movie.tagline}"
                </p>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                  <div className="text-sm text-gray-400">Status</div>
                  <div className="font-semibold">{movie.status}</div>
                </div>
                <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                  <div className="text-sm text-gray-400">Language</div>
                  <div className="font-semibold">
                    {movie.original_language?.toUpperCase()}
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                  <div className="text-sm text-gray-400">Budget</div>
                  <div className="font-semibold">
                    {movie.budget
                      ? `$${(movie.budget / 1000000).toFixed(1)}M`
                      : "N/A"}
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                  <div className="text-sm text-gray-400">Revenue</div>
                  <div className="font-semibold">
                    {movie.revenue
                      ? `$${(movie.revenue / 1000000).toFixed(1)}M`
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Overview & Details */}
          <div className="lg:w-2/3">
            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">
                Overview
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {movie.overview}
              </p>
            </div>

            {/* Cast section - 5 cards below overview */}
            {movie.credits?.cast && movie.credits.cast.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">
                  Top Cast
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {movie.credits.cast.slice(0, 5).map((actor) => (
                    <div
                      key={actor.cast_id}
                      className="bg-gray-900/50 rounded-lg overflow-hidden"
                    >
                      <img
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                            : "https://via.placeholder.com/200x300?text=No+Image"
                        }
                        alt={actor.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-3 text-center">
                        <h3 className="font-semibold text-sm">{actor.name}</h3>
                        <p className="text-gray-400 text-xs mt-1">
                          {actor.character}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Trailer & Links */}
          <div className="lg:w-1/3">
            {/* Trailer Section */}
            <div className="sticky top-8">
              {trailer ? (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">
                    Trailer
                  </h2>
                  <div className="relative pt-[56.25%] rounded-xl overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&rel=0`}
                      title={`${movie.title} Trailer`}
                      className="absolute top-0 left-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    {trailer.name} ({trailer.size}p)
                  </p>
                </div>
              ) : (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">
                    Trailer
                  </h2>
                  <div className="bg-gray-900/50 rounded-xl p-8 text-center">
                    <p className="text-gray-400 mb-4">No trailer available</p>
                    <div className="text-gray-500 text-4xl">🎬</div>
                  </div>
                </div>
              )}

              {/* External Links */}
              <div className="space-y-4">
                {movie.homepage && (
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-red-700 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 w-full"
                  >
                    <span>🌐 Official Website</span>
                  </a>
                )}

                {/* TMDb Link */}
                <a
                  href={`https://www.themoviedb.org/movie/${movie.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 w-full"
                >
                  <span className="text-blue-400">TMDB</span>
                  <span>View on TMDb</span>
                </a>

                {/* IMDb Link (if available) */}
                {movie.imdb_id && (
                  <a
                    href={`https://www.imdb.com/title/${movie.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-500 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 w-full"
                  >
                    <span className="font-bold">IMDb</span>
                    <span>View on IMDb</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
