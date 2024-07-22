import { Link, useNavigate } from "react-router-dom";
import { GoBackComponent, UserProfileComponent } from "../../Components";
import { useEffect } from "react";

const UserProfilePage = () => {
  const navigate = useNavigate();

  // verify user is logged in
  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/registrationPage");
  }, []);

  return (
    <main>
      <section className="flex items-center py-2 px-4 container mx-auto justify-between screen-max-lg bg-rose-50 max-w-screen-lg">
        <div className="">
          <GoBackComponent />
        </div>
        <div className="flex items-center gap-4">
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
        <div>
          <h3 className="text-xl font-bold  container mx-auto text-gray-700">
            Your Profile
          </h3>
        </div>
      </section>
      <UserProfileComponent />
    </main>
  );
};

export default UserProfilePage;
