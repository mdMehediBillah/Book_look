import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../Utils/security/secreteKey";
import Rating from "../../Components/bookshelf/ratings/Rating";
import "./BookPage.scss"
import BorrowedBookForm from "../../Components/forms/borrow/BorrowedBookForm";

const BookPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [openBorrowedBook, setOpenBorrowedBook] = useState(false);

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
            <p className="book-rating">
              Rating: <Rating />
            </p>

            <hr />

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
