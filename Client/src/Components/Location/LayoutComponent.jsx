import React, { useState } from "react";
import MapComponent from "./MapComponent";
import SearchInput from "./SearchInput";
import { IoMdBook } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import LikeComponent from "../LikeComponent/LikeComponent";

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
    <div className="flex gap-2 ">
      {/* <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setCenter={setCenter}
      /> */}
      <div className="flex flex-col md:w-5/12">
        {displayedBookshelves.map((shelf, idx) => (
          <div
            key={idx}
            className="mb-3 border border-gray-300 rounded-lg bg-gray-50 hover:shadow-md cursor-pointer"
          >
            <div className="flex gap-1">
              <div className="">
                <img
                  src={shelf.imageUrl}
                  alt="Name"
                  className="w-36 rounded-l-lg"
                />
              </div>
              <div className=" pt-2 px-2 w-full flex flex-col justify-between ">
                <div className=" flex justify-between">
                  <div>
                    <h4 className="text-lg font-bold">{shelf.name}</h4>
                    <p className="text-gray-700">{shelf.address}</p>
                  </div>
                  <div>
                    <LikeComponent />
                  </div>
                </div>
                <div className="pb-2 flex justify-between">
                  <div className="px-2 py-1 hover:bg-gray-200 rounded flex items-center gap-1 text-sm">
                    <IoMdBook /> <span>72 Books</span>
                  </div>
                  <div className="px-2 py-1 hover:bg-gray-200 rounded flex items-center gap-1 text-sm">
                    <FaRegClock /> <span>24 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {bookshelves.length > 3 && (
          <button
            className="mt-3 py-3 px-6 bg-gray-600 text-white  hover:bg-cyan-400 rounded-full text-sm text-center w-4/12 mx-auto"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "More"}
          </button>
        )}
      </div>

      <div className="md:w-7/12">
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
