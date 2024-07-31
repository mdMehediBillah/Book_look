import { Link, useParams } from "react-router-dom";
import "./BookshelfPage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../Utils/security/secreteKey";
import { toast } from "react-toastify";
const BookshelfPage = () => {
  const { bookshelfId } = useParams();
  const [bookshelf, setBookshelf] = useState(null);
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [donatedBooks, setDonatedBooks] = useState([]);

  useEffect(() => {
    const fetchBookshelf = async () => {
      try {
        const { data } = await axios.get(
          `${API}/api/v1/bookshelves/${bookshelfId}`
        );
        setBookshelf(data.result);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchBookshelf();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get(
          `${API}/api/v1/bookshelves/${bookshelfId}/books`
        );
        setBooks(data.books);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();

    const fetchDonatedBooks = async () => {
      try {
        const { data } = await axios.get(
          `${API}/api/v1/bookshelves/${bookshelfId}/books`
        );
        setDonatedBooks(data.donatedBooks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDonatedBooks();

    const fetchBorrowedBooks = async () => {
      try {
        const { data } = await axios.get(
          `${API}/api/v1/bookshelves/${bookshelfId}/books`
        );
        setBorrowedBooks(data.borrowedBooks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBorrowedBooks();
  }, [bookshelfId]);

  return (
    <main className="bookshelf-page">
      <section className="bookshelf-page-container">
        <h1 className="bookshelf-page-title"> {bookshelf?.name} </h1>
        <article className="shelf-details-wrapper">
          <figure className="shelf-image">
            <img
              className="image"
              src={bookshelf?.image}
              alt={bookshelf?.name}
            />
          </figure>
          <section className="shelf-details">
            <h3 className="shelf-books"> {bookshelf?.name} Books</h3>
            <aside className="books-info">
              <h1>
                All Books:
                <Link to={`/${bookshelfId}/books`} state={{ books, bookshelf }}>
                  {books ? books?.length : 0}
                </Link>
              </h1>
              <p>
                {" "}
                Borrowed Books: {borrowedBooks ? borrowedBooks?.length : 0}{" "}
              </p>
              <p> Donated Books: {donatedBooks ? donatedBooks?.length : 0} </p>
              <p>
                {" "}
                Available Books: {books?.length - borrowedBooks?.length}{" "}
              </p>
            </aside>
          </section>
        </article>
      </section>
    </main>
  );
};

export default BookshelfPage;
