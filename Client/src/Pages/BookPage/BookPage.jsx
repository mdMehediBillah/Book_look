import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../Utils/security/secreteKey";
import "./BookPage.scss";
import BorrowedBookForm from "../../Components/forms/borrow/BorrowedBookForm";
import debounce from "lodash.debounce";
import Rating from "../../Components/bookshelf/ratings/Rating";

const BookPage = () => {
  const { bookId } = useParams();
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

  return (
    <main className="book-page">
      <section className="book-page-container">
        <h1 className="book-page-title">{book?.title}</h1>

        <div className="book-wrapper">
          <figure className="book-image">
            <img
              className="image"
              src={book?.coverImageUrl}
              alt={book?.title}
            />
          </figure>

          <article className="book-details-wrapper">
            <h3 className="book-title"> {book?.title} </h3>

            <small className="book-author">
              by Justin G. Longenecker (Author), J. William Petty (Author),
              Leslie E. Palich (Author), Frank Hoy (Author)
            </small>

            <hr />

            <p className="book-rating">
              Average Rating: {averageRating?.toFixed(1)}
              <Rating
                initialRating={averageRating} // Pass the averageRating to Rating component
                onRatingChange={handleRatingChange}
              />
            </p>

            <p className="book-summary">{book.summary}</p>

            <button
              onClick={() => setOpenBorrowedBook(true)}
              className="borrow-book-btn"
            >
              Borrow Book
            </button>
          </article>

          {openBorrowedBook && (
            <BorrowedBookForm setOpenBorrowedBook={setOpenBorrowedBook} />
          )}
        </div>
      </section>
    </main>
  );
};

export default BookPage;
