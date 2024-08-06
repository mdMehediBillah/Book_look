import { useEffect, useState } from "react";
import { API } from "../../../Utils/security/secreteKey";
import AdminInbox from "../adminInbox/AdminInbox";
import AllBooks from "../allBooks/AllBooks";
import AllBookshelves from "../allBookshelves/AllBookshelves";
import AllBorrowedBooks from "../allBorrowedBooks/AllBorrowedBooks";
import Comments from "../allComments/Comments";
import AllDonatedBooks from "../allDonatedBooks/AllDonatedBooks";
import Genres from "../AllGenres/Genres";
import Ratings from "../AllRatings/Ratings";
import AllUsers from "../allUsers/AllUsers";
import "./DashboardSummary.scss";
import axios from "axios";
import BookshelvesChart from "../../charts/bookshelves/BookshelvesChart";
import AreaChartBookshelves from "../../charts/books/AreaChartBookshelves";
import PieChartBookshelves from "../../charts/performance/PieChartBookshelves";

const DashboardSummary = ({ isActive }) => {
  const [bookshelves, setBookshelves] = useState([]);
  const [bookshelvesCount, setBookshelvesCount] = useState([]);

  const [books, setBooks] = useState([]);
  const [booksCount, setBooksCount] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [borrowedBooksCount, setBorrowedBooksCount] = useState([]);
  const [donatedBooks, setDonatedBooks] = useState([]);
  const [donatedBooksCount, setDonatedBooksCount] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState([]);
  const [commentsCount, setCommentsCount] = useState([]);

  console.log("commentsCount", commentsCount);

  // ====================================================
  // Bookshelves
  // ====================================================
  useEffect(() => {
    const fetchBookshelves = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/bookshelves`);
        setBookshelves(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookshelves();
  }, []);

  useEffect(() => {
    const fetchBookshelvesCount = async () => {
      try {
        const { data } = await axios.get(
          `${API}/api/v1/bookshelves/count/total`
        );
        setBookshelvesCount(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookshelvesCount();
  }, []);

  // ====================================================
  // Books
  // ====================================================
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/books`);
        setBooks(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchBooksCount = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/books/count/total`);
        setBooksCount(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooksCount();
  }, []);

  // ====================================================
  // Donated Books
  // ====================================================

  useEffect(() => {
    const fetchDonatedBooks = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/donatedBooks`);
        setDonatedBooks(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDonatedBooks();
  }, []);
  useEffect(() => {
    const fetchDonatedBooksCount = async () => {
      try {
        const { data } = await axios.get(
          `${API}/api/v1/donatedBooks/count/total`
        );
        setDonatedBooksCount(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDonatedBooksCount();
  }, []);

  // ====================================================
  // Borrowed Books
  // ====================================================
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/borrowedBooks`);
        setBorrowedBooks(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBorrowedBooks();
  }, []);

  useEffect(() => {
    const fetchBorrowedBooksCount = async () => {
      try {
        const { data } = await axios.get(
          `${API}/api/v1/borrowedBooks/count/total`
        );
        setBorrowedBooksCount(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBorrowedBooksCount();
  }, []);

  // ====================================================
  // Users Books
  // ====================================================

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/users`);
        setUsers(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUsersCount = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/users/count/total`);
        setUsersCount(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsersCount();
  }, []);

  // ====================================================
  // Comments
  // ====================================================

  useEffect(() => {
    const fetchCommentsCount = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/comments/count/total`);
        setCommentsCount(data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCommentsCount();
  }, []);

  // Function to handle the print
  const handlePrint = () => {
    window.print();
  };

  return (
    <article>
      {isActive === 1 && (
        <section className="summary-dashboard-container" id="printable">
          <h3 className="summary-dashboard-title">Summary Overview</h3>
          <button onClick={handlePrint} className="print-button">
            Print
          </button>

          <section className="bookshelves-bar-chart-wrapper">
            <BookshelvesChart
              bookshelves={bookshelves}
              books={books}
              donatedBooks={donatedBooks}
              borrowedBooks={borrowedBooks}
            />
          </section>

          <div className="line-pie-charts-wrapper">
            <AreaChartBookshelves
              bookshelves={bookshelves}
              books={books}
              users={users}
            />
            <PieChartBookshelves
              bookshelvesCount={bookshelvesCount}
              booksCount={booksCount}
              borrowedBooksCount={borrowedBooksCount}
              donatedBooksCount={donatedBooksCount}
              usersCount={usersCount}
              commentsCount={commentsCount}
            />
          </div>
        </section>
      )}

      {isActive === 2 && <AllUsers />}

      {isActive === 3 && <AllBookshelves />}

      {isActive === 4 && <AllBooks />}

      {isActive === 5 && <AllDonatedBooks />}

      {isActive === 6 && <AllBorrowedBooks />}

      {isActive === 7 && <Comments />}

      {isActive === 8 && <Ratings />}

      {isActive === 9 && <Genres />}

      {isActive === 10 && <AdminInbox />}
    </article>
  );
};

export default DashboardSummary;
