import { FaRegUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineLeaderboard } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import { GiBlackBook } from "react-icons/gi";
import { motion } from "framer-motion";

const NavigationComponent = () => {
  const navLinkStyles = ({ isActive }) => {
    return isActive ? "font-bold text-cyan-600" : "text-black";
  };
  return (
    <motion.header
      initial={{ x: 300, opacity: 0, scale: 0.5 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.3 }}
      className="flex container mx-auto justify-between items-center gap-2 p-2"
    >
      <div className=" w-2/12 logo">
        <Link to="/" className="flex justify-center items-center gap-2">
          <GiBlackBook className="w-8 h-8" />

          <div>
            <span className="text-rose-500 font-semibold ">Book</span>
            <span className="text-cyan-600 font-semibold ">Look</span>
          </div>
        </Link>
      </div>

      <nav className="flex items-center w-full justify-between  w-10/12">
        <div className="flex  mx-auto w-5/12">
          <ol className="flex gap-2 mx-auto">
            <li className="py-1 px-4 bg-red-100 rounded-full text-center cursor-pointer text-xs  text-gray-500 hover:bg-red-200">
              <NavLink className={navLinkStyles} to="/donate_book">
                Donate
              </NavLink>
            </li>
            <li className="py-1 px-4 bg-red-100 rounded-full text-center cursor-pointer text-xs  text-gray-500 hover:bg-red-200">
              <NavLink className={navLinkStyles} to="/borrow_book">
                Borrow
              </NavLink>
            </li>
            <li className="py-1 px-4 bg-red-100 rounded-full text-center cursor-pointer text-xs  text-gray-500 hover:bg-red-200">
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
            className="btn bg-cyan-800 text-white glass btn-xs hover:bg-red-500"
          >
            <FaRegUserCircle />
            user@example.com
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-gray-900 z-[1] shadow text-white rounded font-semibold mt-1"
          >
            <Link to="/profile">
              <li className="bg-cyan-800 px-4 rounded">
                <span>
                  {" "}
                  <MdOutlineLeaderboard />
                  Profile
                </span>
              </li>
            </Link>
            <li
              // onClick={handleLogout}
              className="bg-rose-600 px-4 mt-1 rounded"
            >
              <span>
                {" "}
                <GrLogout />
                <Link to="/registration">Logout</Link>
              </span>
            </li>
          </ul>
        </div>
        {/* <Link
          to="/registration"
          className="flex items-center gap-2 w-2/12  justify-end"
        >
          <FaRegUserCircle />
          <span>User</span>
        </Link> */}
      </nav>
    </motion.header>
  );
};

export default NavigationComponent;
