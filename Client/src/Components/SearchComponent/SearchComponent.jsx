import React, { useState } from "react";

const SearchComponent = ({ searchTerm, setSearchTerm, setCenter }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSearchChange = (e) => {
    setLocalSearchTerm(e.target.value.trim()); // Remove any leading/trailing whitespace
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    setSearchTerm(localSearchTerm);
    setLocalSearchTerm("");
    // console.log("Search term:", localSearchTerm); // Debugging
  };
  // onClick={handleSearchClick}

  return (
    <section className="">
      <div>
        <form
          onSubmit={handleSearchClick}
          className="bg-gray-200 flex w-3/12 min-w-[400px] mx-auto rounded-full items-center justify-between border-2 border-gray-400 shadow-lg"
        >
          <input
            type="text"
            placeholder="Search by country, city or state"
            value={localSearchTerm}
            onChange={handleSearchChange}
            className="bg-transparent pl-6 w-full outline-none text-gray-900"
          />

          <button
            type="button"
            className="bg-cyan-700 py-2 px-4 rounded-r-full text-center font-semibold text-gray-50 hover:bg-rose-500 "
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchComponent;
