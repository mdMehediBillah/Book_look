import React, { useState } from "react";



const SearchComponent = ({ searchTerm, setSearchTerm, setCenter }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  
  const handleSearchChange = (e) => {
    setLocalSearchTerm(e.target.value.trim()); // Remove any leading/trailing whitespace
  };

  const handleSearchClick = () => {
    setSearchTerm(localSearchTerm);
    // console.log("Search term:", localSearchTerm); // Debugging
  };

  return (
    <section className="container mx-auto">
      <div className="bg-gray-300 flex w-5/12 min-w-[500px] mx-auto rounded-full items-center justify-between">
        <input
          type="text"
          placeholder="Search here..."
          value={localSearchTerm}
          onChange={handleSearchChange}
          className="bg-transparent pl-6 w-full outline-none"
        />
       
        <button
          type="button"
          className="bg-gray-200 py-3 px-6 rounded-full text-center font-bold text-gray-400"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default SearchComponent;
