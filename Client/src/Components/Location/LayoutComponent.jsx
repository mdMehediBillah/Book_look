//==========================================================================
//this code integrates a searchInput, a list of bookshelves, and a mapComponent.
//==========================================================================

import React, { useState, useEffect } from "react";
import MapComponent from "./MapComponent";
import { getOpeningStatus } from "./getOpeningStatus/getOpeningStatus";

import { Link } from "react-router-dom";

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
  // Filter bookshelves based on search term
  //==========================================================================
  // Ensure searchTerm is a lowercase string
  const normalizedSearchTerm = (searchTerm || "").toLowerCase();

  // Safeguard against undefined properties
  const filteredBookshelves = bookshelves.filter((shelf) => {
    // console.log("Bookshelf:", shelf); // Log each bookshelf item ----> debugging
    // console.log("Search Term:", normalizedSearchTerm); // Log the current search term ----> debugging

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
  // State for display liked bookshelves
  //==========================================================================
  const [likedBookshelves, setLikedBookshelves] = useState(new Set());

  const handleLikeToggle = (shelfId) => {
    setLikedBookshelves((prevLiked) => {
      const updatedLiked = new Set(prevLiked);
      if (updatedLiked.has(shelfId)) {
        updatedLiked.delete(shelfId);
      } else {
        updatedLiked.add(shelfId);
      }
      return updatedLiked;
    });
  };
  //==========================================================================
  // State for show more/less button
  //==========================================================================
  // const [showMore, setShowMore] = useState(false);
  // const displayedBookshelves = showMore
  //   ? filteredBookshelves
  //   : filteredBookshelves.slice(0, 3); //display only 3 bookshelves ehwn show more is false
  //==========================================================================

  const displayedBookshelves = filteredBookshelves; // to always display all bookshelves

  return (
    <div className="flex flex-col md:flex-row mt-10">
      <div
        className="flex flex-col md:w-1/3 h-full overflow-y-auto"
        style={{ maxHeight: "calc(80vh - 80px)" }}
      >
        {displayedBookshelves.map((shelf, idx) => {
          // Compute opening status
          const { isOpen, message, detail } = getOpeningStatus(
            shelf.openingTime,
            shelf.closingTime
          );

          return (
            <div
              key={idx}
              className="flex flex-row items-start mt-3 p-1 border border-gray-300 rounded bg-gray-50 relative"
            >
              {/* Heart Icon */}
              <button
                className="absolute bottom-2 right-2 text-red-500"
                onClick={() => handleLikeToggle(shelf._id)}
              >
                {likedBookshelves.has(shelf._id) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                )}
              </button>
              {/* Image Container */}
              {shelf.image && shelf.image.length > 0 && (
                <div className="flex-shrink-0 mr-4">
                  <img
                    src={shelf.image[0]}
                    alt={shelf.name}
                    className="w-24 h-24 object-cover rounded"
                    style={{
                      width: "85px",
                      height: "96px",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              )}
              {/* Text Content */}
              <div>
                <h3 className="text-lg font-semibold">{shelf.name}</h3>
                <p className="text-gray-700">
                  {shelf.street}, {shelf.city}
                </p>
                <p className={`text-${isOpen ? "green" : "red"}-500`}>
                  {message} <span className="text-gray-500">{detail}</span>
                </p>
              </div>

              {/* Text Content */}
              <div>
                <h2 className="text-lg font-semibold">{shelf.name}</h2>
                <p className="text-gray-700">
                  {shelf.street}, {shelf.city}
                </p>
                <Link to={`/create_book/${shelf.id}`}>
                  <button>Add Book</button>
                </Link>
              </div>
            </div>
          );
        })}
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
