import React, { useState } from "react";
import MapComponent from "./MapComponent";

const LayoutComponent = ({
  bookshelves,
  center,
  userLocation,
  destination,
  setDestination,
}) => {
  const [showMore, setShowMore] = useState(false);

  const displayedBookshelves = showMore ? bookshelves : bookshelves.slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
      <div className="flex flex-col p-4 overflow-y-auto">
        {displayedBookshelves.map((shelf, idx) => (
          <div
            key={idx}
            className="mb-5 p-4 border border-gray-300 rounded-lg bg-white"
          >
            <h3 className="text-lg font-semibold">{shelf.name}</h3>
            <p className="text-gray-600">{shelf.address}</p>
          </div>
        ))}
        {bookshelves.length > 3 && (
          <button
            className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "More"}
          </button>
        )}
      </div>
      <div className="relative col-span-2">
        <MapComponent
          bookshelves={bookshelves}
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







