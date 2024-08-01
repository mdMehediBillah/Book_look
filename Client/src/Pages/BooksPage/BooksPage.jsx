import { useLocation } from "react-router-dom";
import "./BooksPage.scss"
import BookCardForShelf from "../../Components/bookshelf/bookCard/BookCardForShelf";


const BooksPage = () => {
  const location = useLocation();
  const { books, bookshelf} = location.state || { books: [], bookshelf: {} };
  return (
    <main className="books-page">
  
    <section className="books-page-container">
      <h1 className="books-page-title">Books of {bookshelf?.name} </h1>

      <div className="books-card-container">
        {books &&
          books.length > 0 &&
          books.map((book) => {
            return <BookCardForShelf key={book._id} book={book} />;
          })}
      </div>
    </section>
  </main>
  );
};

export default BooksPage;
