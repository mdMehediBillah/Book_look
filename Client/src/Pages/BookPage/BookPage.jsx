import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../Utils/security/secreteKey";
import "./BookPage.scss";
import BorrowedBookForm from "../../Components/forms/borrow/BorrowedBookForm";
import debounce from "lodash.debounce";
import Rating from "../../Components/bookshelf/ratings/Rating";
import { GoBackComponent } from "../../Components";
import { useAuthContext } from "../../Context/User/AuthContext.jsx";
import { useShelfContext } from "../../Context/Shelf/shelfContext.jsx"; // Adjust the path as necessary
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const BookPage = () => {
  const navigate = useNavigate();
  const { shelfData } = useShelfContext();
  // console.log(shelfData);
  const { bookshelfId, bookId } = useParams();
  console.log(bookshelfId, bookId);

  const { user } = useAuthContext();
  const [book, setBook] = useState({});
  const [openBorrowedBook, setOpenBorrowedBook] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  // Get a single book
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/books/${bookId}`);

        setBook(data.result);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };
    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  const fetchRating = async () => {
    try {
      const response = await axios.get(`${API}/books/${bookId}/rating`);
      setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error("Error fetching rating:", error);
    }
  };

  useEffect(() => {
    fetchRating();
  }, [book._id]);

  const updateRating = async (newRating) => {
    try {
      const response = await axios.put(`${API}/books/${bookId}/rating`, {
        rating: newRating,
      });
      setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  const debouncedUpdateRating = useCallback(debounce(updateRating, 500), []);

  const handleRatingChange = (newRating) => {
    debouncedUpdateRating(newRating);
  };

  // =================================================================
  // Borrow book
  const userId = user?._id || "";
  const borrowedFrom = shelfData?._id || "";
  // console.log(user);

  const [formData, setFormData] = useState({
    book: bookId,
    user: userId,
    borrowedFrom: bookshelfId,
  });
  console.log(formData);
  // console.log(book);

  // handle BorrowedBookForm
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const { data } = await axios.post(
        `${API}/api/v1/borrowedBooks/new`,
        formData
      );

      toast.success(data.message);
      setOpenBorrowedBook(false);
      navigate(-2);
    } catch (error) {
      console.error("Error creating BorrowedBook:", error);
      toast.error("Error creating BorrowedBook:", error);
    }
  };
  // =================================================================

  return (
    <>
      <main className="py-2 px-4 container mx-auto screen-max-lg max-w-screen-lg">
        <section className="flex items-center py-2 px-4 container mx-auto justify-between screen-max-lg bg-cyan-900">
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
              <h4 className="text-lg font-semibold pt-2 line-clamp-1">
                {book?.title}
              </h4>
            </div>
          </div>
        </section>
        <section className="flex gap-4 mt-12 justify-center">
          {/* <h1 className="book-page-title">{book?.title}</h1> */}

          <div className="flex gap-4 bg-gray-100 p-2">
            <figure className="book-image">
              <img
                className="w-full h-[300px] object-cover rounded-md mx-auto"
                src={book?.coverImageUrl}
                alt={book?.title}
              />
            </figure>

            <article className="flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold line-clamp-1">
                  {" "}
                  {book?.title}{" "}
                </h2>
                <small className="book-author">Written by {book?.author}</small>
                <hr />
              </div>

              <div>
                <div className="flex gap-2 items-center mt-6">
                  <p className="book-rating">
                    Rating: {averageRating?.toFixed(1)}
                  </p>
                  <Rating
                    initialRating={averageRating} // Pass the averageRating to Rating component
                    onRatingChange={handleRatingChange}
                  />
                </div>
                <p className="book-summary">{book.summary}</p>
                <button
                  onClick={() => setOpenBorrowedBook(true)}
                  className="bg-cyan-500 text-white px-4 py-1 rounded-md mt-4 hover:bg-rose-500 hover:scale-105 transition-transform duration-500"
                >
                  Borrow Book
                </button>
              </div>
            </article>
          </div>
        </section>
      </main>
      {openBorrowedBook && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-red-200 bg-opacity-75 z-50"
          onClick={() => setOpenBorrowedBook(false)}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0, rotateX: 180, x: "-100vw" }}
            animate={{ scale: 1, opacity: 1, rotateX: 0, x: 0 }}
            transition={{ type: "spring", duration: 0.2, bounce: 20 }}
            className="w-full max-w-lg mx-auto bg-white rounded-md shadow-lg p-4 border-radius-2xl border-gray-200 border-4 flex gap-4"
          >
            <img
              className="w-full h-[300px] object-cover rounded-md mx-auto"
              src={book?.coverImageUrl}
              alt={book?.title}
            />
            <div className="flex flex-col justify-between ">
              <div>
                <p className="mt-2 text-black text-2xl font-semibold">
                  Do you want to Borrow the Book?
                </p>
              </div>
              <div className="flex mt-6 justify-between gap-2">
                <button
                  className=" bg-orange-300 hover:bg-orange-200 text-black font-semibold py-2 rounded w-full"
                  onClick={() => setOpenBorrowedBook(false)}
                >
                  No
                </button>
                <button
                  onClick={handleSubmit}
                  className=" bg-cyan-400 hover:bg-cyan-200 text-black font-semibold py-2 rounded w-full"
                >
                  Yes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default BookPage;
