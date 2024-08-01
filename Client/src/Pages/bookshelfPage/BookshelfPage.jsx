import { Link, useParams } from "react-router-dom";
import "./BookshelfPage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../Utils/security/secreteKey";
import { toast } from "react-toastify";
import { GoBackComponent } from "../../Components";
import { getOpeningStatus } from "../../Components/Location/getOpeningStatus/getOpeningStatus.jsx";
import LikeButton from "../../Components/LikeButtonComponent/LikeButtonComponent.jsx";
import { LuBook } from "react-icons/lu";

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

  // console.log(bookshelf);

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

  // Compute opening status
  // console.log(bookshelf);
  if (bookshelf === null) {
    return <div>Loading...</div>;
  }
  const { isOpen, message, detail } = getOpeningStatus(
    bookshelf?.openingTime,
    bookshelf?.closingTime
  );

  return (
    <main className="bookshelf-page">
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
            <h4>{bookshelf?.name}</h4>
          </div>
        </div>
      </section>
      <section className="flex flex-col py-4 container mx-auto screen-max-lg max-w-screen-lg ">
        <article className="flex flex-col gap-4  mx-auto p-3 rounded-md bg-gray-200">
          <div>
            <div className="flex gap-2">
              <figure>
                <img
                  className="w-56 h-68 object-cover rounded-lg"
                  src={bookshelf?.image}
                  alt={bookshelf?.name}
                />
              </figure>
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold"> {bookshelf?.name}</h2>
                  <div className="flex items-center gap-1 text-sm">
                    <span>{bookshelf?.street},</span>
                    <span>{bookshelf?.city}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <span>{bookshelf?.zipCode},</span>
                    <span>{bookshelf?.country}</span>
                  </div>
                </div>
                <aside className="p-2">
                  <div className="flex  gap-1">
                    <Link
                      to={`/${bookshelfId}/books`}
                      state={{ books, bookshelf }}
                    >
                      <div className="bg-cyan-100 w-full">
                        <div className="flex gap-1 py-1 px-2 rounded w-full">
                          <span>{books ? books?.length : 0}</span>
                          <span>Books</span>
                        </div>
                      </div>
                    </Link>
                    <div className="bg-cyan-100 w-full">
                      <div className="flex gap-1 py-1 px-2 rounded w-full">
                        <span>{books?.length - borrowedBooks?.length}</span>
                        <span>Available</span>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
            <div className="text-center py-1 bg-gray-100 w-full rounded-md mt-3">
              <p className={`text-${isOpen ? "green" : "red"}-500`}>
                {message} <span className="text-gray-500">{detail}</span>
              </p>{" "}
            </div>
            <div className="flex justify-between gap-2 mt-1  items-center">
              <div className="bg-cyan-600 w-10/12 rounded-md text-white">
                <Link
                  to={`/create_book/${bookshelf?._id}`}
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
              <div className="w-4/12">
                <LikeButton />
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default BookshelfPage;
