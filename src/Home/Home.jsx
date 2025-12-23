import { useEffect, useState } from "react";
import { HomeHero } from "./HomeHero.jsx";
import { HomeMovies } from "./HomeMovies.jsx";
import { HomeTv } from "./HomeTv.jsx";

export const Hero = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [allTv, setAllTv] = useState([]);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [tvLoading, setTvLoading] = useState(false);
  const [heroError, setHeroError] = useState(null);
  const [moviesError, setMoviesError] = useState(null);
  const [tvError, setTvError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentMoviePage, setCurrentMoviePage] = useState(1);
  const [currentTvPage, setCurrentTvPage] = useState(1);
  const [hasMoreMovies, setHasMoveMovies] = useState(true);
  const [hasMoreTv, setHasMoveTv] = useState(true);
  const [genreId, setGenreId] = useState("");

  const API_KEY = "07da1c676789e8b449568f51b378e0cb";

  const handleLoadMoreMovies = () => {
    setCurrentMoviePage((prev) => prev + 1);
  };
  const handleLoadMoreTv = () => {
    setCurrentTvPage((prev) => prev + 1);
  };

  useEffect(() => {
    async function fetchTopMovies() {
      try {
        setHeroError(null);

        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
        );
        const data = await res.json();
        setTopMovies(data.results.slice(0, 5));
      } catch (err) {
        setHeroError("Failed to load hero movies");
      }
    }
    fetchTopMovies();
  }, []);

  useEffect(() => {
    async function fetchGenre() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
        );
        const data = await res.json();

        const map = {};
        data.genres.forEach((g) => {
          map[g.id] = g.name;
        });

        setGenreId(map);
      } catch (err) {
        setHeroError("Failed to load hero movies");
      }
    }
    fetchGenre();
  }, []);

  function nextSlide() {
    setCurrentIndex((prev) => (prev === topMovies.length - 1 ? 0 : prev + 1));
  }

  function prevSlide() {
    setCurrentIndex((prev) => (prev === 0 ? topMovies.length - 1 : prev - 1));
  }

  useEffect(() => {
    async function fetchAllMovies() {
      try {
        setMoviesLoading(true);
        setMoviesError(null);

        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${currentMoviePage}`
        );
        const data = await res.json();
        setAllMovies((prev) => [...prev, ...data.results]);

        if (currentMoviePage >= allMovies.total_pages) {
          setHasMoveMovies(false);
        }
      } catch (err) {
        setMoviesError("Failed to load hero movies");
      } finally {
        setMoviesLoading(false);
      }
    }
    fetchAllMovies();
  }, [currentMoviePage]);

  useEffect(() => {
    async function fetchAllTv() {
      try {
        setTvLoading(true);
        setTvError(null);

        const res = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=${currentTvPage}`
        );
        const data = await res.json();
        setAllTv((prev) => [...prev, ...data.results]);

        if (currentMoviePage >= allMovies.total_pages) {
          setHasMoveTv(false);
        }
      } catch (err) {
        setTvError("Failed to load Tv shows");
      } finally {
        setTvLoading(false);
      }
    }
    fetchAllTv();
  }, [currentTvPage]);

  return (
    <div className="bg-black overflow-hidden min-h-screen flex flex-col">
      <HomeHero
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        currentIndex={currentIndex}
        topMovies={topMovies}
        heroError={heroError}
        genreMap={genreId}
      />
      <HomeMovies
        allMovies={allMovies}
        handleLoadMoreMovies={handleLoadMoreMovies}
        moviesLoading={moviesLoading}
        moviesError={moviesError}
        hasMoreMovies={hasMoreMovies}
      />
      <HomeTv
        allTv={allTv}
        handleLoadMoreTv={handleLoadMoreTv}
        tvLoading={tvLoading}
        tvError={tvError}
        hasMoreTv={hasMoreTv}
      />
    </div>
  );
};
