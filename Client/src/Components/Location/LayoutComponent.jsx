import React, { useState } from "react";
import MapComponent from "./MapComponent";
import SearchInput from "./SearchInput";

const LayoutComponent = ({
  bookshelves,
  center,
  setCenter,
  userLocation,
  destination,
  setDestination,
}) => {
  const [showMore, setShowMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 

  const filteredBookshelves = bookshelves.filter((shelf) =>
    shelf.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedBookshelves = showMore
    ? filteredBookshelves
    : filteredBookshelves.slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
      <div className="p-4 overflow-y-auto">
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setCenter={setCenter}
        />

        {displayedBookshelves.map((shelf, idx) => (
          <div
            key={idx}
            className="mb-5 p-4 border border-gray-300 rounded bg-gray-50"
          >
            <h3 className="text-lg font-semibold">{shelf.name}</h3>
            <p className="text-gray-700">{shelf.address}</p>
          </div>
        ))}
        {bookshelves.length > 3 && (
          <button
            className="mt-5 py-2 px-6 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "More"}
          </button>
        )}
      </div>

      <div className="relative col-span-2">
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
