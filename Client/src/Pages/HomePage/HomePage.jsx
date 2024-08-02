import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imgUrl from "../../assets/images/bg-color_terms.png";
import { motion } from "framer-motion";

import {
  HeroText,
  NavigationComponent,
  SearchComponent,
  FooterComponent,
} from "../../Components";
import Location from "../../Components/Location/Location";
import ChatbotLayout from "../../Components/Chatbot/ChatbotLayout/ChatbotLayout";
import heroImg from "../../assets/images/heroSection.png";

const HomePage = () => {
  const navigate = useNavigate();
  // verify user is logged in
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/registrationPage");
  }, []);
  return (
    <main
      className="w-full object-cover  bg-cover bg-center bg-no-repeat  bg-rose-50 "
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <NavigationComponent />
      <section className="max-w-screen-lg mx-auto">
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
          className=""
        >
          <HeroText />
        </motion.div>
        <div className="mx-auto flex-grow">
          <div className="">
            <Location />
          </div>
        </div>
        <ChatbotLayout />
      </section>
      <FooterComponent />
    </main>
  );
};
export default HomePage;
