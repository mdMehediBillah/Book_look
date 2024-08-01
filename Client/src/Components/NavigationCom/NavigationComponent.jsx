import { useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineLeaderboard } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import { GiBlackBook } from "react-icons/gi";
import { motion } from "framer-motion";
import { useAuthContext } from "../../Context/User/AuthContext.jsx";

// =================================================================
// NavigationComponent
const NavigationComponent = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const { firstName } = user;

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/registrationPage");
  }, []);

  // Navlink styles
  const navLinkStyles = ({ isActive }) => {
    return isActive ? "font-bold text-cyan-600" : "text-black";
  };

  // handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    // logout();
    navigate("/registrationPage");
  };
  return (
    <motion.header
      initial={{ x: 5, opacity: 0.9, scale: 0.99 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.3 }}
      className="flex container mx-auto justify-between items-center gap-2 p-3 bg-cyan-900 shadow rounded-b-lg max-w-screen-lg"
    >
      <div className=" w-2/12 logo">
        <Link to="/" className="flex justify-center items-center gap-2">
          <GiBlackBook className="min-w-7 min-h-7 text-cyan-200" />

          <div>
            <span className="text-rose-400 font-semibold text-2xl">Book</span>
            <span className="text-cyan-400 font-semibold text-2xl">Look</span>
          </div>
        </Link>
      </div>

      <nav className="flex items-center w-full justify-between  w-10/12">
        <div className="flex  mx-auto w-5/12">
          <ol className="flex gap-2 mx-auto">
            <li className="py-1 px-4 bg-cyan-100 rounded-full text-center cursor-pointer text-xs hover:bg-cyan-200">
              <NavLink className={navLinkStyles} to="/donate_book">
                Donate
              </NavLink>
            </li>
            <li className="py-1 px-4 bg-cyan-100 rounded-full text-center cursor-pointer text-xs hover:bg-cyan-200">
              <NavLink className={navLinkStyles} to="/borrow_book">
                Borrow
              </NavLink>
            </li>
            <li className="py-1 px-4 bg-cyan-100 rounded-full text-center cursor-pointer text-xs hover:bg-cyan-200">
              <NavLink className={navLinkStyles} to="/create_shelf">
                Create
              </NavLink>
            </li>
          </ol>
        </div>
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn bg-cyan-800 text-white glass btn-sm hover:bg-red-500"
          >
            <FaRegUserCircle />
            <span className="">Hello! {user ? firstName : "User"}</span>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-gray-900 z-[1] shadow text-white rounded font-semibold mt-1"
          >
            <Link to="/profile">
              <li className="bg-cyan-800  rounded">
                <span>
                  {" "}
                  <MdOutlineLeaderboard />
                  Profile
                </span>
              </li>
            </Link>
            <li
              // onClick={handleLogout}
              className="bg-rose-600 mt-1 rounded"
            >
              <span onClick={handleLogout}>
                {" "}
                <GrLogout />
                Logout
              </span>
            </li>
          </ul>
        </div>
      </nav>
    </motion.header>
  );
};

export default NavigationComponent;
