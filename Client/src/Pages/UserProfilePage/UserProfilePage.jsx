import { Link, useNavigate } from "react-router-dom";
import {
  GoBackComponent,
  UpdateUserProfile,
  UserProfileComponent,
} from "../../Components";
import { useEffect, useState } from "react";

const UserProfilePage = () => {
  const navigate = useNavigate();

  // // Initial state for like status
  // const [isUpdatingProfile, setUpdatingProfile] = useState(false);

  // // Function to handle the handleUpdateProfile click
  // const handleUpdateProfile = () => {
  //   setUpdatingProfile(!isUpdatingProfile);
  // };

  // verify user is logged in
  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/registrationPage");
  }, []);

  return (
    <main>
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
            <h4>Your Profile</h4>
          </div>
        </div>
      </section>
      <div>
        <UserProfileComponent />
      </div>
    </main>
  );
};

export default UserProfilePage;
