import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../../Utils/security/secreteKey";
import "./BookPage.scss";
import BorrowedBookForm from "../../Components/forms/borrow/BorrowedBookForm";
import debounce from "lodash.debounce";
import Rating from "../../Components/bookshelf/ratings/Rating";
import { GoBackComponent } from "../../Components";
import { useAuthContext } from "../../Context/User/AuthContext.jsx";
import { useShelfContext } from "../../Context/Shelf/shelfContext.jsx"; // Adjust the path as necessary
import { toast } from "react-toastify";

const BookPage = () => {
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
      setOpenBorrowedBook(false); // Close the form after successful submission
    } catch (error) {
      console.error("Error creating BorrowedBook:", error);
      toast.error("Error creating BorrowedBook:", error);
    }
  };
  // =================================================================

  return (
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
                onClick={handleSubmit}
                // onClick={() => setOpenBorrowedBook(true)}
                className="bg-cyan-500 text-white px-4 py-1 rounded-md mt-4 hover:bg-rose-500 hover:scale-105 transition-transform duration-500"
              >
                Borrow Book
              </button>
            </div>
          </article>

          {/* {openBorrowedBook && (
            <BorrowedBookForm
              setOpenBorrowedBook={setOpenBorrowedBook}
              // book={book}
            />
          )} */}
        </div>
      </section>
    </main>
  );
};

export default BookPage;
