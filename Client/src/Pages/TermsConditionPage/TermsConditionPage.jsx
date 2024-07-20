import { motion } from "framer-motion";

import imgUrl from "../../assets/images/bg-color_terms.png";
import { GoBackComponent } from "../../Components";

const TermsConditionPage = () => {
  return (
    <section
      className="w-full h-screen object-cover min-h-screen bg-cover bg-center bg-no-repeat "
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <div className="container mx-auto  bg-gray-100 p-4">
        <GoBackComponent />
        <motion.h1
          initial={{ x: 20, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ type: "tween", duration: 0.3 }}
          className="text-3xl container mx-auto text-center mb-10 text-gray-700 drop-shadow-md pt-8"
        >
          <span className="text-rose-500 font-semibold ">Book</span>
          <span className="text-cyan-600 font-semibold ">Look</span>
        </motion.h1>
        <div className="w-10/12 mx-auto">
          <h3 className=" text-xl">Terms & Conditions</h3>
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            facilisis, mauris et consectetur tincidunt, velit turpis semper
            ipsum, at fermentum ipsum justo a turpis. Nullam ullamcorper, felis
            a commodo auctor, ligula dui tempus ligula, vel semper neque felis
            vitae turpis. Donec pellentesque, ipsum id pharetra bibendum, dui
            velit semper nunc, ac fermentum odio urna vitae urna. Donec auctor,
            nunc nec ultricies
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsConditionPage;
