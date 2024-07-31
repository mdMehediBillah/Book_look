import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import imgUrl from "../../assets/images/bg-color_terms.png";
import { motion } from "framer-motion";

import {
  HeroText,
  NavigationComponent,
  SearchComponent,
} from "../../Components";
import Location from "../../Components/Location/Location";
import heroImg from "../../assets/images/heroSection.png";

const HomePage = () => {
  const navigate = useNavigate();

  // verify user is logged in
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/registrationPage");
  }, []);
  return (
    <main
      className="w-full min-h-max h-screen object-cover  bg-cover bg-center bg-no-repeat max-w-screen-lg mx-auto bg-gray-100 px-2"
      // style={{
      //   backgroundImage: `url(${imgUrl})`,
      // }}
    >
      <NavigationComponent />
      <section>
        <motion.div
          animate={{
            rotate: [0],
            x: [0, 10, 0, -10, 0],
          }}
          transition={{ delay: 1, duration: 6, repeat: Infinity }}
        >
          <img src={heroImg} alt="Hero image" className="w-7/12 mx-auto" />
        </motion.div>
        <motion.div
          animate={{
            rotate: [0],
            x: [0, 30, -30, 0],
          }}
          transition={{ delay: 0.6, duration: 8, repeat: Infinity }}
          className=" py-1"
        >
          <HeroText />
        </motion.div>
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
