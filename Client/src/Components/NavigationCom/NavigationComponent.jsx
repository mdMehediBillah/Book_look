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
  // max-w-screen-lg mx-auto container
  return (
    <>
      <div className="navbar bg-base-100 justify-between items-center gap-2 pt-3 container mx-auto">
        <div className="flex-1">
          <div className=" w-2/12 logo">
            <Link to="/" className="flex justify-center items-center gap-2">
              <GiBlackBook className="min-w-7 min-h-7 text-gray-900" />

              <div>
                <span className="text-rose-500 font-semibold text-2xl">
                  Book
                </span>
                <span className="text-cyan-600 font-semibold text-2xl">
                  Look
                </span>
              </div>
            </Link>
          </div>
          {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
        </div>
        <div className="flex-none gap-2 ">
          {/* <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div> */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar "
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user?.image} />
              </div>
              {/* <span className="">Hello! {user ? firstName : "User"}</span> */}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <Link to="/profile">
                <li>
                  <span className="justify-between">
                    Profile
                    {/* <span className="badge">New</span> */}
                  </span>
                </li>
              </Link>
              <li onClick={handleLogout}>
                <span className="justify-between">
                  Logout
                  {/* <span className="badge">New</span> */}
                </span>
              </li>
              {/* <li>
                <a>Settings</a>
              </li> */}
              {/* <li>
                <a>Logout</a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
      {/* <section className=" justify-between items-center gap-2 pt-3">
      <motion.header
        initial={{ x: 5, opacity: 0.9, scale: 0.99 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="flex container mx-auto justify-between items-center gap-2 p-3  "
      >
        <div className=" w-2/12 logo">
          <Link to="/" className="flex justify-center items-center gap-2">
            <GiBlackBook className="min-w-7 min-h-7 text-gray-900" />

            <div>
              <span className="text-rose-500 font-semibold text-2xl">Book</span>
              <span className="text-cyan-600 font-semibold text-2xl">Look</span>
            </div>
          </Link>
        </div>

        <nav className="flex items-center w-full justify-between  w-10/12">
          <div className="flex  mx-auto w-5/12"></div>
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
    </section> */}
    </>
  );
};

export default NavigationComponent;
