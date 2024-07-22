import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/User/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import UserProfileActivitiesCompo from "../UserProfileActivitiesCompo/UserProfileActivitiesCompo.jsx";

const UserProfileComponent = () => {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  // fetching data from local storage
  const userLocal = localStorage.getItem("user");
  const user = JSON.parse(userLocal);
  const { firstName, lastName, email, image, createdAt } = user;
  console.log(email, firstName, lastName, email, image, createdAt);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState(userLocal);

  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/registrationPage");
    setUserData(userLocal);
  }, [logout]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    // logout();
    navigate("/registrationPage");
    window.location.reload();
  };

  return (
    <div>
      <div className="bg-gray-400 h-[180px] relative container max-w-screen-lg mx-auto ">
        <div className="avatar absolute bottom-[-48px] left-[32px]">
          <div className="ring-gray ring-offset-base-100 w-44 rounded-full ring ring-offset-2">
            <img src={image} />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end items-end  pr-4 container max-w-screen-lg mx-auto bg-gray-50 ">
        <div className="flex gap-2 text-right text-2xl font-bold pt-2 container text-gray-700 justify-end">
          <span>{firstName}</span>
          <span>{lastName}</span>
        </div>
        <div>
          <p className="text-right text-md font-semibold container mx-auto text-gray-500 pt-1">
            {email}
          </p>
        </div>
        <div>
          <p className="text-right text-md font-semibold container mx-auto text-gray-500 ">
            {`Member Since: ${format(createdAt, "dd/MM/yyyy")}`}{" "}
            {/* {`Member Since: ${createdAt}`}{" "} */}
            {/* {format(user.createdAt, "dd/MM/yyyy HH:mm")} */}
          </p>
        </div>
        <div>
          <Link to="/update">
            <button className="mt-3 bg-cyan-200 py-2 px-4 text-center rounded-xl font-medium text-sm">
              Update Profile
            </button>
          </Link>
        </div>
      </div>
      <UserProfileActivitiesCompo />
      <div className="flex flex-col container max-w-screen-lg mx-auto bg-gray-50 px-4 pb-10 ">
        <div>
          <button
            className="mt-3 bg-cyan-200 py-2 px-6 text-center rounded-xl font-semibold mb-10"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
        <div>
          <button className="mt-3 bg-rose-100 py-2 px-6 text-center rounded-xl font-semibold">
            Delete Account
            <span className="text-sm font-semibold ml-2">
              (Warning: This action cannot be undone)
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileComponent;

// if (!localStorage.getItem("user")) navigate("/registration");
//     // If user is logged out, clean up the user data from local storage
//     if (!user) {
//       localStorage.removeItem("user");
//     }
//     // If user is logged out, clean up the user data from the context
//     if (!user) {
//       logout();
//     }
//     // If user is logged out, redirect to the registration page
//     if (!user) navigate("/registration");
//     // If user is logged in, redirect to the home page
//     if (user) navigate("/");
//     // If user is logged in, update the user data in the context
//     if (user) {
//       const userData = JSON.parse(localStorage.getItem("user"));
//       setUserData(userData);
//     }
//     // If user is logged in, update the user data in the context
//     if (user) {
//       const userData = JSON.parse(localStorage.getItem("user"));
//       setUser(userData);
//     }
//     // If user is logged in, update the user data in the context
