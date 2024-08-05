import { useEffect, useState } from "react";
// import { useUserContext } from "../../Context/User/UserContext.jsx";
import { useAuthContext } from "../../Context/User/AuthContext.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import imgUrl from "../../assets/images/shelfDefault.png";
const URL = import.meta.env.VITE_REACT_APP_URL;

const LikedBookshelvesPage = () => {
  const [likedBookshelves, setLikedBookshelves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const { likedBookshelves, fetchLikedBookshelves, loading } = useUserContext();
  const { user } = useAuthContext();
  const fetchLikedBookshelves = async (userId) => {
    setLoading(true);
    console.log(userId);
    try {
      const response = await axios.get(
        `${URL}/api/v1/likeShelf/likedBookshelves/${userId}`
      );
      console.log(response.data.favBookshelves);
      setLikedBookshelves(response.data.favBookshelves);
    } catch (error) {
      setError("Failed to fetch liked bookshelves");
      toast.error("Failed to fetch liked bookshelves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchLikedBookshelves(user._id);
    }
    // console.log(likedBookshelves);
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-screen-lg mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">
        {likedBookshelves.length > 0
          ? "Your Liked Bookshelves"
          : "Bookshelf not found"}
      </h1>
      {likedBookshelves.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-3 lg:grid-cols-4 py-3 px-2">
          {likedBookshelves.map((shelf) => (
            <div
              key={shelf._id}
              className="text-sm flex flex-col items-start p-2 border border-gray-300 rounded bg-gray-50 mb-4 shadow-md hover:scale-105 transition-transform duration-500 cursor-pointer justify-between hover:shadow-xl"
            >
              <Link to={`/${shelf._id}`}>
                {shelf.image && shelf.image.length > 0 && (
                  <img
                    src={shelf.image[0]}
                    alt={shelf.name}
                    className="w-screen h-40 object-cover rounded-md"
                  />
                )}
                <h2 className="text-[16px] font-semibold pt-1">{shelf.name}</h2>
                <p className="text-gray-700">
                  {shelf.street}, {shelf.city}
                </p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-3 lg:grid-cols-4 py-3 px-2">
          <Link to="/allShalves" className="mt-4">
            <div className="text-sm flex flex-col items-start p-2 border border-gray-300 rounded bg-gray-50 mb-4 shadow-md hover:scale-105 transition-transform duration-500 cursor-pointer justify-between hover:shadow-xl">
              <img
                src={imgUrl}
                alt="No Bookshelf"
                className="w-screen h-40 object-cover rounded-md"
              />

              <h2 className="text-[16px] font-semibold pt-1">
                No Bookshelf name
              </h2>
              <p className="text-gray-700">
                No bookshelf found. Click here to add a new bookshelf.
              </p>
            </div>
            <button className="w-full text-center py-2 px-4 bg-cyan-800 text-white rounded-md">
              Add a new bookshelf
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default LikedBookshelvesPage;
