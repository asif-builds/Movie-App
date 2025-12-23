import { MovieCard } from "../common/MovieCard";
import { LoadMore } from "../common/LoadMore";
import { Link } from "react-router";

export const HomeTv = ({ allTv, handleLoadMoreTv, tvError, hasMoreTv }) => {
  return (
    <div className="max-w-[1700px] mx-auto px-4 py-8">
      <Link className="text-3xl text-white font-bold mb-6 block" to="/movies">
        Tv Shows
      </Link>
      <MovieCard allMoviesTvs={allTv} error={tvError} type={"TvShows"} />
      <LoadMore handleLoadMore={handleLoadMoreTv} hasMore={hasMoreTv} />
    </div>
  );
};
