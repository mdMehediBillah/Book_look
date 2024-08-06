import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CreateBook, GoBackComponent, FooterComponent } from "../../Components";
import axios from "axios";
import { useShelfContext } from "../../Context/Shelf/shelfContext.jsx"; // Adjust the path as necessary

// import { Outlet } from "react-router-dom";

const CreateBookPage = () => {
  const URL = import.meta.env.VITE_REACT_APP_URL;
  const { id } = useParams();
  const { shelfData, setShelfData } = useShelfContext();

  const [shelf, setShelf] = useState(null);

  // fetch single shelf data here
  const fetchSingleShelf = async () => {
    try {
      const response = await axios.get(` ${URL}/api/v1/bookshelves/${id}`);
      setShelf(response.data.result);
      setShelfData(response.data.result); // Update the context data here if needed. For example, to set the book data in the ShelfContext.
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchSingleShelf();
  }, [id]);
  console.log(shelf);
  console.log(shelfData);

  return (
    <main className="">
      <section className="flex items-center py-2 px-4 container mx-auto justify-between screen-max-lg bg-cyan-900 max-w-screen-lg">
        <div className="w-3/12">
          <GoBackComponent />
        </div>
        <div className="flex items-center gap-4 w-6/12 justify-center">
          <div>
            <Link
              to="/"
              className="flex justify-center items-center gap-2 text-xl"
            >
              <h3>
                <span className="text-rose-500 font-semibold ">Book</span>
                <span className="text-cyan-600 font-semibold ">Look</span>
              </h3>
            </Link>
          </div>
        </div>
        <div className="w-3/12 flex justify-end">
          <div className="py-1 px-3 font-semibold text-white">
            <h4>Create Book</h4>
          </div>
        </div>
      </section>
      <div className="screen-max-lg mx-auto max-w-screen-lg">
        <div className="flex items-center container pt-4 mx-auto screen-max-lg">
          <div className="flex flex-col gap-1 items-center  bg-gray-50 screen-max-lg p-1 rounded-md flex-wrap shadow-lg">
            <div className="w-36 h-20 bg-gray-400 text-center">
              <img
                src={shelf?.image[0]}
                alt={shelf?.name}
                className="w-36 h-20 object-cover"
              />
            </div>
            <div className="px-2">
              <h4 className="text-md font-semibold">{shelf?.name}</h4>
              <p className="flex flex-col  text-sm ">
                <span>{shelf?.street}</span>
                <span>{shelf?.city}</span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-center text-3xl font-bold">
            Add your book to the Bookshelf
          </h2>
        </div>
      </div>
      <CreateBook />
      <FooterComponent />
    </main>
  );
};

export default CreateBookPage;
