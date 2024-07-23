import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imgUrl from "../../assets/images/bg-color_terms.png";
import { SearchComponent } from "../../Components";
import Location from "../../Components/Location/Location";

const HomePage = () => {
  const navigate = useNavigate();

  // verify user is logged in
  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/registrationPage");
  }, []);
  return (
    <main
      className="w-full min-h-max h-screen object-cover  bg-cover bg-center bg-no-repeat "
      // style={{
      //   backgroundImage: `url(${imgUrl})`,
      // }}
    >
      <section>
        <SearchComponent />
        <h4 className="text-center text-3xl pt-12 pb-6 font-bold">
          Explore Bookshelf near you!
        </h4>
      </section>
      <section className="container mx-auto pb-16">
        <Location />
      </section>
    </main>
  );
};

export default HomePage;
