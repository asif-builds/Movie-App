export const LoadMore = ({ handleLoadMore, hasMore }) => {
  return (
    <div className="text-center mt-8">
      <button
        className="bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-6 rounded-lg transition-colors"
        onClick={handleLoadMore}
        disabled={!hasMore}
      >
        Load More Movies
      </button>
    </div>
  );
};
