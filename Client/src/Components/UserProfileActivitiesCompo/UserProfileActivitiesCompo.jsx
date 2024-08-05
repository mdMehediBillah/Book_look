import { Link } from "react-router-dom";
import LikedBookshelvesPage from "../../Components/LikedBookshelvesPage/LikedBookshelvesPage.jsx";

const UserProfileActivitiesCompo = () => {
  return (
    <section className="flex flex-col p-4 container max-w-screen-lg mx-auto bg-gray-50 ">
      {/* <h4 className="text-sm font-bold py-2 uppercase">Your Book-shelves</h4> */}
      <LikedBookshelvesPage />
    </section>
  );
};

export default UserProfileActivitiesCompo;
