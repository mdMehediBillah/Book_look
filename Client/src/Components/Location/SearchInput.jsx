// import React from "react";

// const cityCoordinates = {
//   Leipzig: [51.321003, 12.3716],
//   Berlin: [52.52, 13.405],
//   Frankfurt: [50.1109, 8.6821],
// };

// const SearchInput = ({ searchTerm, setSearchTerm, setCenter }) => {
//   const handleSearchChange = (e) => {
//     const term = e.target.value.trim(); // Remove any leading/trailing whitespace
//     setSearchTerm(term);
//     console.log("Search term:", term); // Debugging
//     console.log("cityCoordinates:", cityCoordinates); // Debugging
//     const cityCoord = cityCoordinates[term];
//     console.log("City coordinates:", cityCoord); // Debugging
//     if (cityCoord) {
//       setCenter(cityCoord);
//       console.log("Center set to:", cityCoord); // Debugging
//     }
//   };

//   return (
//     <input
//       type="text"
//       value={searchTerm}
//       onChange={handleSearchChange}
//       placeholder="Search by city"
//       className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 placeholder-gray-500 text-gray-700"
//     />
//   );
// };

// export default SearchInput;
