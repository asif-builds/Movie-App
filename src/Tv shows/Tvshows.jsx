import { useState, useEffect } from "react";
import { Pagination } from "../common/Pagination";
import { Sort } from "../common/Sort";
import { MovieCard } from "../common/MovieCard";
import { Filter } from "../common/Filter";

export const Tvshows = () => {
  const [allTvShows, setAllTvShows] = useState([]);
  const [tvError, setTvError] = useState(null);
  const [tvLoading, setTvLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("Sort");
  const [tvGenre, setTvGenre] = useState([]);
  const [genreId, setGenreId] = useState("");
  const [tvRating, setTvRating] = useState("");
  const genreOptions = tvGenre.map((g) => ({
    label: g.name,
    value: g.id,
  }));
  const tvSortOptions = [
    { label: "Rating ↓", value: "vote_average.desc" },
    { label: "Rating ↑", value: "vote_average.asc" },
    { label: "Latest", value: "first_air_date.desc" },
    { label: "Oldest", value: "first_air_date.asc" },
    { label: "Title (A-Z)", value: "name.asc" },
    { label: "Title (Z-A)", value: "name.desc" },
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
    async function fetchAllTvShows() {
      try {
        setTvError(null);
        setTvLoading(true);

        const res = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=${currentPage}&sort_by=${sort}&with_genres=${genreId}&${tvRating}`
        );

        const data = await res.json();
        setAllTvShows(data.results);
        console.log(data.results);
      } catch (error) {
        setTvError("Failed to load tv shows");
      } finally {
        setTvLoading(false);
      }
    }
    fetchAllTvShows();
  }, [currentPage, sort, genreId, tvRating]);

  useEffect(() => {
    async function fetchGenres() {
      const tvRes = await fetch(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`
      );

      const tvData = await tvRes.json();
      setTvGenre(tvData.genres);
    }

    fetchGenres();
  }, []);

  return (
    <div className="bg-black min-h-screen px-6 py-8">
      {/* Header with title and sort in top right */}
      <h1 className="text-3xl md:text-4xl font-bold text-white">TV Shows</h1>
      <div className="max-w-10xl mx-auto">
        <div className="flex justify-end-safe items-center gap-5 mb-8">
          <Sort
            setSort={setSort}
            currentPage={currentPage}
            options={tvSortOptions}
          />
          <Filter
            options={genreOptions}
            onChange={setGenreId}
            placeholder="Genre"
          />
          <Filter
            options={ratingOptions}
            onChange={setTvRating}
            placeholder="Rating"
          />
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-4">
        <MovieCard allMoviesTvs={allTvShows} error={tvError} type={"TvShows"} />
      </div>

      {/* Pagination */}
      <div className="max-w-7xl mx-auto mt-8">
        <Pagination
          currentPage={currentPage}
          haandlePagePrev={haandlePagePrev}
          haandlePageNext={haandlePageNext}
          disablePrev={currentPage === 1}
        />
      </div>
    </div>
  );
};
