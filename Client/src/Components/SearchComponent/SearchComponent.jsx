const SearchComponent = () => {
  return (
    <section className="container mx-auto mt-4 ">
      <form className="bg-gray-300 flex w-5/12 min-w-[400px] mx-auto rounded-full items-center justify-between">
        <input
          type="text"
          placeholder="Search here..."
          className="bg-transparent pl-6 w-full outline-none"
        />
        <button className="bg-gray-200 py-2 px-6 rounded-full text-center font-bold text-gray-400">
          Search
        </button>
      </form>
    </section>
  );
};

export default SearchComponent;
