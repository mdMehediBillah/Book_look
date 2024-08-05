import { useContext } from "react";
import { NavigationComponent, FooterComponent } from "../../Components";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext.jsx";

const AboutUsPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <main
      className={`w-full object-cover bg-cover bg-center bg-no-repeat ${
        theme === "light" ? "bg-gray-50" : "bg-gray-800"
      }`}
    >
      <NavigationComponent />
      <div className=" cursor-default max-w-screen-lg mx-auto">
        <div className="flex justify-center py-9 ">
          <h4
            className={`text-4xl font-medium ${
              theme === "light" ? "text-gray-800" : "text-gray-50"
            }`}
          >
            About Us
          </h4>
        </div>
        <div className="card card-side shadow-xl bg-cyan-100 mb-5 size-4/5 mx-auto  ">
          <figure>
            <img src="src/assets/images/yohannes.png" alt="Image of Yohannes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Yohannes Habtemariam</h2>
            <p>
              {" "}
              please introduce yourself by your own, i really dont know how to
              do this im really sorry
            </p>
          </div>
        </div>
        <div className="card card-side shadow-xl bg-cyan-100 mb-5 size-4/5 mx-auto">
          <div className="card-body">
            <h2 className="card-title">Anna Najafi</h2>
            <p>
              {" "}
              please introduce yourself by your own, i really dont know how to
              do this im really sorry
            </p>
          </div>
          <figure>
            <img src="src/assets/images/anna.png" alt="Image of Anna" />
          </figure>
        </div>
        <div className="card card-side shadow-xl bg-cyan-100 mb-5 size-4/5 mx-auto">
          <figure>
            <img src="src/assets/images/mehedi.png" alt="Image of Mehedi" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">MD Mehedi Billah</h2>
            <p>
              {" "}
              please introduce yourself by your own, i really dont know how to
              do this im really sorry
            </p>
          </div>
        </div>
        <div className="card card-side shadow-xl bg-cyan-100 mb-5 size-4/5 mx-auto">
          <div className="card-body">
            <h2 className="card-title">Erdinc Yasar</h2>
            <p>
              {" "}
              please introduce yourself by your own, i really dont know how to
              do this im really sorry
            </p>
          </div>
          <figure>
            <img src="src/assets/images/erdinc.png" alt="Image of Erdinc" />
          </figure>
        </div>
      </div>
      <FooterComponent />
    </main>
  );
};

export default AboutUsPage;
