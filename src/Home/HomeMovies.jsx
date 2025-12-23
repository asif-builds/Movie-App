import { LoadMore } from "../common/LoadMore";
import { MovieCard } from "../common/MovieCard";
import { Link } from "react-router";

export const HomeMovies = ({
  allMovies,
  handleLoadMoreMovies,
  moviesError,
  hasMoreMovies,
}) => {
  return (
    <div className="max-w-[1700px] mx-auto px-4 py-8">
      <Link className="text-3xl text-white font-bold mb-6 block" to="/movies">
        Movies
      </Link>
      <MovieCard allMoviesTvs={allMovies} error={moviesError} type={"movies"} />
      <LoadMore handleLoadMore={handleLoadMoreMovies} hasMore={hasMoreMovies} />
    </div>
  );
};
