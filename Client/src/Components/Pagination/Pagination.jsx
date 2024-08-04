const Pagination = ({ loadMore, hasMore }) => {
  return (
    <div className="flex justify-center py-4">
      {hasMore ? (
        <button
          onClick={loadMore}
          className="bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700 transition-colors"
        >
          Load More
        </button>
      ) : (
        <p>No more bookshelves to load</p>
      )}
    </div>
  );
};

export default Pagination;
