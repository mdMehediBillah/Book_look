import { CreateBook } from "../../Components";
// import { Outlet } from "react-router-dom";

const CreateBookPage = () => {
  return (
    <main>
      <div className="">
        <div className="flex items-center container pt-4 mx-auto screen-max-lg">
          <div className="flex gap-2 items-center  bg-gray-100 screen-max-lg pl-4">
            <div className="w-36 h-28 bg-gray-400 text-center pt-6">
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
