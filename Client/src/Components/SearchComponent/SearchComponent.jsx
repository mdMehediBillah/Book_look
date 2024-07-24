const SearchComponent = ({ searchTerm, setSearchTerm, setCenter }) => {
  const cityCoordinates = {
    Leipzig: [51.321003, 12.3716],
    Berlin: [52.52, 13.405],
    Frankfurt: [50.1109, 8.6821],
  };

  const handleSearchChange = (e) => {
    const term = e.target.value.trim(); // Remove any leading/trailing whitespace
    setSearchTerm(term);
    console.log("Search term:", term); // Debugging
    console.log("cityCoordinates:", cityCoordinates); // Debugging
    const cityCoord = cityCoordinates[term];
    console.log("City coordinates:", cityCoord); // Debugging
    if (cityCoord) {
      setCenter(cityCoord);
      console.log("Center set to:", cityCoord); // Debugging
    }
  };
  return (
    <section className="container mx-auto pt-4 ">
      <form className="bg-gray-200 flex w-5/12 min-w-[400px] mx-auto rounded-full items-center justify-between border-2 border-cyan-600">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by city"
          className="bg-transparent pl-4 w-full outline-none text-gray-900 placeholder:text-gray-500"
        />

        {/* <input
          type="text"
          placeholder="Search here..."
          className="bg-transparent pl-6 w-full outline-none"
        /> */}
        <button className="bg-cyan-600 py-2 px-6 rounded-r-full text-center font-medium text-gray-400 text-white">
          Search
        </button>
      </form>
    </section>
  );
};

export default SearchComponent;
