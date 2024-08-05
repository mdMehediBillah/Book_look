import { Link, useLocation } from "react-router-dom";
import "./BooksPage.scss";
import BookCardForShelf from "../../Components/bookshelf/bookCard/BookCardForShelf";
import { GoBackComponent } from "../../Components";

const BooksPage = () => {
  const location = useLocation();
  const { books, bookshelf, borrowedBooks } = location.state || {
    books: [],
    bookshelf: {},
  };
  console.log(books.length);
  console.log(borrowedBooks?.length);
  return (
    <main className="books-page ">
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
            <h4 className="line-clamp-1">{bookshelf?.name}</h4>
          </div>
        </div>
      </section>

      <section className="max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-bold text-center pt-4 pb-8">
          Books of {bookshelf?.name}{" "}
        </h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2">
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
