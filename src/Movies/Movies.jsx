import { useState, useEffect } from "react";
import { Pagination } from "../common/Pagination";
import { Sort } from "../common/Sort";
import { MovieCard } from "../common/MovieCard";
import { Filter } from "../common/Filter";

export const Movies = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [moviesError, setMoviesError] = useState(null);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("popularity.desc");
  const [movieGenre, setMovieGenre] = useState([]);
  const [genreId, setGenreId] = useState("");
  const [movieRating, setMovieRating] = useState("");
  const genreOptions = movieGenre.map((g) => ({
    label: g.name,
    value: g.id,
  }));
  const movieSortOptions = [
    { label: "Rating ↓", value: "vote_average.desc" },
    { label: "Rating ↑", value: "vote_average.asc" },
    { label: "Latest", value: "primary_release_date.desc" },
    { label: "oldest", value: "primary_release_date.asc" },
    { label: "Title (A-Z)", value: "title.desc" },
    { label: "Title (Z-A)", value: "title.asc" },
  ];
  const ratingOptions = [
    { label: "7+", value: "vote_average.gte=7" },
    { label: "8+", value: "vote_average.gte=8" },
    { label: "9+", value: "vote_average.gte=9" },
  ];

  const haandlePagePrev = () => {
    setCurrentPage((prev) => (prev === 1 ? prev : prev - 1));
  };
  const haandlePageNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const API_KEY = "07da1c676789e8b449568f51b378e0cb";

  useEffect(() => {
    async function fetchAllMovies() {
      try {
        setMoviesError(null);
        setMoviesLoading(true);

        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${currentPage}&sort_by=${sort}&with_genres=${genreId}&${movieRating}`
        );
        const data = await res.json();

        setAllMovies(data.results);
        console.log(data.results);
      } catch (err) {
        setMoviesError("failed to load movies");
      } finally {
        setMoviesLoading(false);
      }
    }
    fetchAllMovies();
  }, [currentPage, sort, genreId, movieRating]);

  useEffect(() => {
    async function fetchGenres() {
      const movieRes = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );

      const movieData = await movieRes.json();
      setMovieGenre(movieData.genres);
    }

    fetchGenres();
  }, [genreId]);

  return (
    <div className="bg-black min-h-screen px-6 py-8">
      {/* Header with title and sort in top right */}
      <div className="max-w-10xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white ">Movies</h1>
        <div className="flex justify-end-safe items-center gap-5 mb-8">
          <Sort
            setSort={setSort}
            currentPage={currentPage}
            options={movieSortOptions}
          />
          <Filter
            options={genreOptions}
            onChange={setGenreId}
            placeholder="Genre"
          />
          <Filter
            options={ratingOptions}
            onChange={setMovieRating}
            placeholder="Rating"
          />
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-4">
        <MovieCard
          allMoviesTvs={allMovies}
          error={moviesError}
          type={"movies"}
        />
      </div>

      <div className="max-w-7xl mx-auto mt-8">
        <Pagination
          haandlePagePrev={haandlePagePrev}
          haandlePageNext={haandlePageNext}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};
