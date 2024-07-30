import { Link } from "react-router-dom";

const UserProfileActivitiesCompo = () => {
  return (
    <section className="flex flex-col p-4 container max-w-screen-lg mx-auto bg-gray-50 ">
      <h4 className="text-sm font-bold py-2 uppercase">Your Book-shelves</h4>
      <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-4">
        <div className="h-[300px] bg-gray-200">
          <div className="justify-center flex mt-24">
            <Link to="/create_book">
              <p className="w-32 bg-cyan-800 text-white rounded-full text-center">
                Add Book
              </p>
            </Link>
          </div>
        </div>
        <div className="h-[300px] bg-gray-200"></div>
        <div className="h-[300px] bg-gray-200"></div>
        <div className="h-[300px] bg-gray-200"></div>
        <div className="h-[300px] bg-gray-200"></div>
        <div className="h-[300px] bg-gray-200"></div>
        <div className="h-[300px] bg-gray-200"></div>
        <div className="h-[300px] bg-gray-200"></div>
      </div>
    </section>
  );
};

export default UserProfileActivitiesCompo;
