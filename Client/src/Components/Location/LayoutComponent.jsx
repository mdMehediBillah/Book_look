//==========================================================================
//this code integrates a searchInput, a list of bookshelves, and a mapComponent.
  //==========================================================================

import React, { useState, useEffect } from "react";
import MapComponent from "./MapComponent";
import SearchInput from "./SearchInput";

const LayoutComponent = ({
  bookshelves,
  center,
  setCenter,
  userLocation,
  destination,
  setDestination,
  searchTerm,
  setSearchTerm,
}) => {
  //==========================================================================
  // City coordinates
  //==========================================================================
  // const cityCoordinates = {
  //   Leipzig: [51.321003, 12.3716],
  //   Berlin: [52.52, 13.405],
  //   Frankfurt: [50.1109, 8.6821],
  // };

  //==========================================================================
  // Filter bookshelves based on search term
  //==========================================================================
  // Ensure searchTerm is a lowercase string
  const normalizedSearchTerm = (searchTerm || "").toLowerCase();

  // Safeguard against undefined properties
  const filteredBookshelves = bookshelves.filter((shelf) => {
    console.log("Bookshelf:", shelf); // Log each bookshelf item ----> debugging
    console.log("Search Term:", normalizedSearchTerm); // Log the current search term ----> debugging

    //search based on name, country, state, and city
    const name = shelf.name?.toLowerCase() || "";
    const country = shelf.country?.toLowerCase() || "";
    const state = shelf.state?.toLowerCase() || "";
    const city = shelf.city?.toLowerCase() || "";

    return (
      name.includes(normalizedSearchTerm) ||
      country.includes(normalizedSearchTerm) ||
      state.includes(normalizedSearchTerm) ||
      city.includes(normalizedSearchTerm)
    );
  });

  //==========================================================================
  // Set center coordinates based on search term
  //==========================================================================
  // const handleSearch = () => {
  //   const coordinates = cityCoordinates[searchTerm];
  //   if (coordinates) {
  //     console.log("City coordinates:", coordinates);
  //     setCenter(coordinates);
  //   } else {
  //     console.log("City coordinates not found for:", searchTerm);
  //   }
  // };

  // useEffect(() => {
  //   handleSearch();
  // }, [searchTerm]);

  //==========================================================================
  // for show more/less button
  //==========================================================================
  const [showMore, setShowMore] = useState(false);

  const displayedBookshelves = showMore
    ? filteredBookshelves
    : filteredBookshelves.slice(0, 3); //display only 3 bookshelves ehwn show more is false
  



  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col p-4 md:w-1/3">
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setCenter={setCenter}
        />

        {displayedBookshelves.map((shelf, idx) => (
          <div
            key={idx}
            className="mb-5 p-2 border border-gray-300 rounded bg-gray-50"
          >
            <h3 className="text-lg font-semibold">{shelf.name}</h3>
            <p className="text-gray-700">{shelf.address}</p>
          </div>
        ))}
        {bookshelves.length > 3 && (
          <button
            className="mt-5 py-2 px-6 bg-cyan-700 font-bold  text-white rounded hover:bg-rose-500"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "More"}
          </button>
        )}
      </div>

      <div className="flex-grow h-1/2 md:h-full">
        <MapComponent
          bookshelves={filteredBookshelves}
          center={center}
          userLocation={userLocation}
          destination={destination}
          setDestination={setDestination}
        />
      </div>
    </div>
  );
};

export default LayoutComponent;



// import React, { useState } from "react";
// import MapComponent from "./MapComponent";
// import SearchInput from "./SearchInput";

// const LayoutComponent = ({
//   bookshelves,
//   center,
//   setCenter,
//   userLocation,
//   destination,
//   setDestination,
// }) => {
//   const [showMore, setShowMore] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredBookshelves = bookshelves.filter((shelf) =>
//     shelf.address.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const displayedBookshelves = showMore
//     ? filteredBookshelves
//     : filteredBookshelves.slice(0, 3);

//   return (
//     <div className="flex flex-col md:flex-row">
//       <div className="flex flex-col p-4 md:w-1/3">
//         <SearchInput
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           setCenter={setCenter}
//         />

//         {displayedBookshelves.map((shelf, idx) => (
//           <div
//             key={idx}
//             className="mb-5 p-2 border border-gray-300 rounded bg-gray-50"
//           >
//             <h3 className="text-lg font-semibold">{shelf.name}</h3>
//             <p className="text-gray-700">{shelf.address}</p>
//           </div>
//         ))}
//         {bookshelves.length > 3 && (
//           <button
//             className="mt-5 py-2 px-6 bg-blue-500 text-white rounded hover:bg-blue-600"
//             onClick={() => setShowMore(!showMore)}
//           >
//             {showMore ? "Show Less" : "More"}
//           </button>
//         )}
//       </div>

//       <div className="flex-grow h-1/2 md:h-full">
//         <MapComponent
//           bookshelves={filteredBookshelves}
//           center={center}
//           userLocation={userLocation}
//           destination={destination}
//           setDestination={setDestination}
//         />
//       </div>
//     </div>
//   );
// };

// export default LayoutComponent;
