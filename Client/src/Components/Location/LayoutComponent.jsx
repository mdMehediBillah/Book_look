//==========================================================================
//this code integrates a searchInput, a list of bookshelves, and a mapComponent.
//==========================================================================

import { useState, useEffect } from "react";
import MapComponent from "./MapComponent";
import { getOpeningStatus } from "./getOpeningStatus/getOpeningStatus";
import { Link } from "react-router-dom";
import SearchComponent from "../SearchComponent/SearchComponent";
import LikeComponent from "../LikeComponent/LikeComponent";
import { LuBook } from "react-icons/lu";
import LikeButton from "../LikeButtonComponent/LikeButtonComponent";

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
  const displayedBookshelves = filteredBookshelves; // to always display all bookshelves
  return (
    <div className="flex flex-col mt-10">
      {/* Map Container */}
      <div className="relative h-1/2 md:h-full">
        {/* Search Component inside the map */}
        <div className="absolute w-[50%] left-[25%] z-[1000] p-2 rounded">
          <SearchComponent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCenter={setCenter}
          />
        </div>

        <MapComponent
          bookshelves={filteredBookshelves}
          center={center}
          userLocation={userLocation}
          destination={destination}
          setDestination={setDestination}
        />
      </div>

      {/* Bookshelves Container */}
      <div className="grid md:grid-cols-3 gap-3 lg:grid-cols-4 py-3 px-2">
        {displayedBookshelves.map((shelf, idx) => {
          const { isOpen, message, detail } = getOpeningStatus(
            shelf.openingTime,
            shelf.closingTime
          );
          return (
            <div
              key={idx}
              className="text-sm flex flex-col items-start  p-2 border border-gray-300 rounded bg-gray-50 mb-4 shadow-md hover:scale-105 transition-transform duration-500 cursor-direction justify-between hover:shadow-xl"
            >
              {/* Image Container */}
              <Link to={`/${shelf._id}`}>
                {shelf.image && shelf.image.length > 0 && (
                  <img
                    src={shelf.image[0]}
                    alt={shelf.name}
                    className="w-screen h-40 object-cover rounded-md"
                  />
                )}

                {/* Text Content */}
                <h2 className="text-[16px] font-semibold pt-1">{shelf.name}</h2>
                <p className="text-gray-700">
                  {shelf.street}, {shelf.city}
                </p>
                <p className={`text-${isOpen ? "green" : "red"}-500`}>
                  {message} <span className="text-gray-500">{detail}</span>
                </p>
              </Link>

              <div className="flex justify-between gap-2 mt-1  items-center w-full pt-4">
                <div className="bg-cyan-600 w-7/12 rounded-md text-white">
                  <Link
                    to={`/create_book/${shelf._id}`}
                    className="flex items-center justify-center gap-1"
                  >
                    <div>
                      <LuBook />
                    </div>
                    <div>
                      <p className="text-center py-1">Add Book</p>
                    </div>
                  </Link>
                </div>
                <div className="w-5/12">
                  <LikeButton />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default LayoutComponent;
