import { Link, useLocation } from "react-router-dom";
import "./BooksPage.scss";
import BookCardForShelf from "../../Components/bookshelf/bookCard/BookCardForShelf";
import { GoBackComponent, FooterComponent } from "../../Components";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext.jsx";
import { useContext } from "react";

const BooksPage = () => {
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  const location = useLocation();
  const { books, bookshelf, borrowedBooks } = location.state || {
    books: [],
    bookshelf: {},
  };
  console.log(books.length);
  console.log(borrowedBooks?.length);
  return (
    <main
      className={`w-full object-cover bg-cover bg-center bg-no-repeat bookshelf-page h-[100vh] ${
        theme === "light" ? "bg-gray-50" : "bg-gray-800"
      }`}
    >
      <section
        className={`flex items-center py-2 px-4 container mx-auto justify-between screen-max-lg max-w-screen-lg${
          theme === "light" ? "bg-gray-50" : "bg-gray-800"
        }`}
      >
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

      <section className="max-w-screen-lg mx-auto mt-4 mb-9">
        <h2
          className={`text-2xl font-bold text-center pt-4 pb-8 ${
            theme === "light" ? "text-gray-800" : "text-gray-300"
          }`}
        >
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
      <FooterComponent />
    </main>
  );
};

export default BooksPage;
