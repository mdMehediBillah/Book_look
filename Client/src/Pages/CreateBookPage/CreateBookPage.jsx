import { Link } from "react-router-dom";
import { CreateBook, GoBackComponent } from "../../Components";
// import { Outlet } from "react-router-dom";

const CreateBookPage = () => {
  return (
    <main className="">
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
            <h4>Create Book</h4>
          </div>
        </div>
      </section>
      <div className="screen-max-lg mx-auto max-w-screen-lg">
        <div className="flex items-center container pt-4 mx-auto screen-max-lg">
          <div className="flex gap-2 items-center  bg-gray-100 screen-max-lg pl-4">
            <div className="w-36 h-24 bg-gray-400 text-center pt-6">
              Shelf's image
            </div>
            <div className="px-2">
              <h4>Name of the Bookshelf</h4>
              <p>Address of the shelf</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-center text-3xl font-bold">
            Add your book to the Bookshelf
          </h2>
        </div>
      </div>
      <CreateBook />
    </main>
  );
};

export default CreateBookPage;
