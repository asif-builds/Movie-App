export const Pagination = ({
  haandlePagePrev,
  currentPage,
  haandlePageNext,
}) => {
  return (
    <div className="flex justify-center items-center gap-6 mt-12">
      <button
        onClick={haandlePagePrev}
        disabled={currentPage === 1}
        className="px-5 py-2 rounded-lg bg-gray-800 text-white text-sm font-medium
               hover:bg-gray-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ◀ Prev
      </button>

      <span className="text-gray-300 text-xl">
        Page <span className="font-semibold text-white">{currentPage}</span>
      </span>

      <button
        onClick={haandlePageNext}
        className="px-5 py-2 rounded-lg bg-amber-500 text-black text-sm font-semibold
               hover:bg-amber-600 transition"
      >
        Next ▶
      </button>
    </div>
  );
};
