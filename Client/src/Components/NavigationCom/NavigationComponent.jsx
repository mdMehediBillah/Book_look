import { FaRegUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineLeaderboard } from "react-icons/md";
import { GrLogout } from "react-icons/gr";

const NavigationComponent = () => {
  const navLinkStyles = ({ isActive }) => {
    return isActive ? "font-bold text-red-500" : "text-black";
  };
  return (
    <header className="flex container mx-auto justify-between items-center gap-2 p-2">
      <div className=" w-2/12">
        <Link to="/">Logo</Link>
      </div>

      <nav className="flex items-center w-full justify-between  w-10/12">
        <div className="flex  mx-auto w-5/12">
          <ol className="flex gap-2 mx-auto">
            <li className="py-1 px-4 bg-gray-100 rounded-full text-center cursor-pointer">
              <NavLink className={navLinkStyles} to="/donate_book">
                Donate
              </NavLink>
            </li>
            <li className="py-1 px-4 bg-gray-100 rounded-full text-center cursor-pointer">
              <NavLink className={navLinkStyles} to="/borrow_book">
                Borrow
              </NavLink>
            </li>
            <li className="py-1 px-4 bg-gray-100 rounded-full text-center cursor-pointer">
              <NavLink className={navLinkStyles} to="/create_shelf">
                Create
              </NavLink>
            </li>
          </ol>
        </div>
        <div className="dropdown w-28">
          <div
            tabIndex={0}
            role="button"
            className="btn bg-cyan-600 text-white glass btn-xs"
          >
            <FaRegUserCircle />
            User
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
    </header>
  );
};

export default NavigationComponent;
