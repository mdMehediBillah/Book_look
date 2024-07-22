import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { SearchComponent } from "../../Components";
import Location from "../../Components/Location/Location";

const HomePage = () => {
  const navigate = useNavigate();

  // verify user is logged in
  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/registrationPage");
  }, []);
  return (
    <main>
      <section>
        <SearchComponent />
        <h1>Welcome to Home Page</h1>
      </section>
     <div className="container mx-auto flex-grow p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg bg-red-400 ">
          <Location />
        </div>
      </div>
    </main>
  );
};

export default HomePage;




