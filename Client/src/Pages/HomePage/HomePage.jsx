import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { SearchComponent } from "../../Components";

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
    </main>
  );
};

export default HomePage;
