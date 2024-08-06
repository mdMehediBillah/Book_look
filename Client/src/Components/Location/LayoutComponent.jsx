import React, { useState, useEffect, useContext } from "react";
import MapComponent from "./MapComponent";
import { getOpeningStatus } from "./getOpeningStatus/getOpeningStatus";
import { Link } from "react-router-dom";
import SearchComponent from "../SearchComponent/SearchComponent";
// import LikeComponent from "../LikeComponent/LikeComponent";
import { LuBook } from "react-icons/lu";
import LikeButton from "../LikeButtonComponent/LikeButtonComponent";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext"; // Import ThemeContext
import { useBookshelvesContext } from "../../Context/Shelf/BookshelvesContext.jsx";
import ButtonCreateShelf from "../ButtonCreateShelf/ButtonCreateShelf.jsx";
import { IoClose } from "react-icons/io5";
import { useAuthContext } from "../../Context/User/AuthContext.jsx";

const LayoutComponent = ({
  // bookshelves,
  center,
  setCenter,
  userLocation,
  destination,
  setDestination,
  searchTerm,
  setSearchTerm,
}) => {
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  const { bookshelves, loading, error } = useBookshelvesContext();
  console.log(bookshelves);
  const { user } = useAuthContext();

  const displayBookshelves = bookshelves.slice(0, 8);

  const userId = user?._id;

  //==========================================================================
  // Filter bookshelves based on search term
  //==========================================================================
  // console.log(searchTerm);
  const normalizedSearchTerm = (searchTerm || "").toLowerCase();
  // Safeguard against undefined properties
  const filteredBookshelves = displayBookshelves.filter((shelf) => {
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
  const displayedBookshelves = filteredBookshelves; // to always display all bookshelves

  // =================================================================
  const handleLike = (bookshelfId) => {
    // Optionally, update local state or perform other actions when a bookshelf is liked
    console.log(`Bookshelf ${bookshelfId} liked`);
  };

  //==========================================================================
  return (
    <div className="flex flex-col">
      {/* Map Container */}
      <div className="flex justify-between py-4 px-2 items-center">
        <h2
          className={`text-xl font-bold ${
            theme === "light" ? "text-gray-800" : "text-gray-300"
          }`}
        >
          Grow your Bookshelf
        </h2>
        <ButtonCreateShelf />
      </div>
      <div className="relative h-1/2 md:h-full">
        {/* Search Component inside the map */}
        <div className="absolute w-[50%] left-[25%] z-[1000]  rounded top-4">
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
          searchTerm={searchTerm}
        />
      </div>
      {searchTerm && (
        <div className="w-[400px] px-2 text-lg font-semibold pt-2 flex items-center ">
          Show result for <p className="pl-1"> </p>
          <span className="text-rose-500 text-xl ">{searchTerm}</span>{" "}
          <span
            onClick={() => setSearchTerm("")}
            className="cursor-pointer ml-4 bg-cyan-400 w-6 h-6 flex items-center justify-center rounded-lg hover:bg-rose-400"
          >
            <IoClose />
          </span>
        </div>
      )}
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
              className={`text-sm flex flex-col items-start p-2 border rounded mb-4 shadow-md hover:scale-105 transition-transform duration-500 cursor-direction justify-between hover:shadow-xl ${
                theme === "light"
                  ? "border-gray-200 bg-gray-50 text-gray-800"
                  : "border-gray-600 bg-gray-700 text-gray-300"
              }`}
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

                <p
                  className={`${
                    theme === "light" ? "text-gray-800" : "text-gray-300"
                  }`}
                >
                  {shelf.street}, {shelf.city}
                </p>
                <p className={`text-${isOpen ? "green" : "red"}-500`}>
                  {message} <span className="text-gray-500">{detail}</span>
                </p>
              </Link>

              <div className="flex justify-between gap-1 mt-1  items-center w-full pt-4 ">
                <div className="bg-cyan-600 rounded-md text-white w-full">
                  <Link
                    to={`/create_book/${shelf._id}`}
                    className="flex items-center justify-center gap-1 "
                  >
                    <div>
                      <LuBook />
                    </div>
                    <div>
                      <p className="text-center py-1">Add Book</p>
                    </div>
                  </Link>
                </div>
                <div className="w-full bg-rose-200 rounded-lg text-gray-800">
                  <LikeButton
                    userId={userId}
                    bookshelfId={shelf._id}
                    onLike={handleLike}
                  />{" "}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {searchTerm ? (
        ""
      ) : (
        <div className="flex justify-center my-12">
          <Link to="/allShalves">
            <span className="bg-rose-600 py-2 px-6 rounded-lg text-gray-100 hover:bg-cyan-600 ">
              More Bookshelves
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};
export default LayoutComponent;
