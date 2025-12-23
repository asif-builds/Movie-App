import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const TvDetails = () => {
  const [TvDetails, setTvDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const API_KEY = "07da1c676789e8b449568f51b378e0cb";

  useEffect(() => {
    setLoading(true);
    async function fetchTvDetails() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
        );
        const data = await res.json();
        console.log(data);
        setTvDetails(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    fetchTvDetails();
  }, [id]);

  // Get the first official trailer from the videos response
  const trailer = TvDetails?.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-700 border-t-red-600"></div>
      </div>
    );
  }

  if (!TvDetails) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <p className="text-red-500 text-xl">TV Show not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Backdrop Hero Section */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%), url(https://image.tmdb.org/t/p/original${TvDetails.backdrop_path})`,
        }}
      >
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-8">
            {/* Poster */}
            <img
              className="w-64 md:w-80 rounded-xl shadow-2xl"
              src={
                TvDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500${TvDetails.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Poster"
              }
              alt={TvDetails.name}
            />

            {/* TV Show Info */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {TvDetails.name}{" "}
                <span className="text-gray-400">
                  ({new Date(TvDetails.first_air_date).getFullYear()})
                </span>
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="flex items-center text-yellow-400 text-xl font-bold">
                  ⭐ {TvDetails.vote_average?.toFixed(1)}
                </span>
                <span className="text-gray-300">
                  {TvDetails.number_of_seasons} season
                  {TvDetails.number_of_seasons !== 1 ? "s" : ""}
                </span>
                <span className="text-gray-300">
                  {TvDetails.number_of_episodes} episodes
                </span>
                <span className="text-gray-300">
                  {TvDetails.first_air_date}
                </span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-4">
                {TvDetails.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-800 hover:bg-red-600 px-3 py-1 rounded-full text-sm transition-colors duration-200"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Tagline */}
              {TvDetails.tagline && (
                <p className="text-gray-300 italic text-lg mb-6">
                  "{TvDetails.tagline}"
                </p>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                  <div className="text-sm text-gray-400">Status</div>
                  <div className="font-semibold">{TvDetails.status}</div>
                </div>
                <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                  <div className="text-sm text-gray-400">Language</div>
                  <div className="font-semibold">
                    {TvDetails.original_language?.toUpperCase()}
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                  <div className="text-sm text-gray-400">
                    {TvDetails.created_by.length > 1 ? "Creators" : "Creator"}
                  </div>
                  <div className="font-semibold flex flex-col justify-center gap-1 ">
                    {TvDetails.created_by.map((creators) => (
                      <p key={creators.id}>{creators.name}</p>
                    ))}
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                  <div className="text-sm text-gray-400">Last Air Date</div>
                  <div className="font-semibold">
                    {TvDetails.last_air_date || "N/A"}
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
                {TvDetails.overview}
              </p>
            </div>

            {/* Cast section - 5 cards below overview */}
            {TvDetails.credits?.cast && TvDetails.credits.cast.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">
                  Top Cast
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {TvDetails.credits.cast.slice(0, 5).map((actor) => (
                    <div
                      key={actor.id}
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
                      title={`${TvDetails.name} Trailer`}
                      className="absolute top-0 left-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    {trailer.name} ({trailer.size})
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
                {TvDetails.homepage && (
                  <a
                    href={TvDetails.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-red-700 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 w-full"
                  >
                    <span>🌐 Official Website</span>
                  </a>
                )}

                {/* TMDb Link */}
                <a
                  href={`https://www.themoviedb.org/tv/${TvDetails.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 w-full"
                >
                  <span className="text-blue-400">TMDB</span>
                  <span>View on TMDb</span>
                </a>

                {/* Network Logos */}
                {TvDetails.networks?.length > 0 && (
                  <div className="pt-4 border-t border-gray-800">
                    <h3 className="text-lg font-semibold mb-3">Networks</h3>
                    <div className="flex flex-wrap gap-3">
                      {TvDetails.networks.map((network) => (
                        <div key={network.id} className="flex items-center">
                          {network.logo_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w200${network.logo_path}`}
                              alt={network.name}
                              className="h-8 object-contain bg-white/10 p-1 rounded"
                            />
                          ) : (
                            <span className="text-sm text-gray-400">
                              {network.name}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
