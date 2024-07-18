import { useState } from "react";
import { motion } from "framer-motion";

import { LoginComponent, SignUpComponent } from "../../Components";

const RegistrationPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <section className="pt-12 h-screen">
      <h1 className="text-3xl container mx-auto text-center mb-10 text-gray-700">
        Welocome to <span className="text-red-400 font-semibold ">Book</span>
        <span className="text-cyan-600">Look</span>
      </h1>
      {isLogin ? (
        <LoginComponent toggleForm={toggleForm} />
      ) : (
        <SignUpComponent toggleForm={toggleForm} />
      )}
    </section>
  );
};

export default RegistrationPage;
