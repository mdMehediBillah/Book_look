import { motion } from "framer-motion";
import { ImSad } from "react-icons/im";

import imgUrl from "../../assets/images/bg-color_terms.png";
import { GoBackComponent } from "../../Components";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section
      className=" flex flex-col justify-center homeBg min-h-screen bg-cover bg-center bg-no-repeat w-[100%] pt-6"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
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
            <h4>Update Profile</h4>
          </div>
        </div>
      </section>
      <div className="container mx-auto">
        <GoBackComponent />
        <div className="container mx-auto  bg-gray-100 p-4">
          <motion.div
            initial={{ x: -20, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ type: "tween", duration: 0.3 }}
            className=" flex justify-center py-4"
          >
            <ImSad className="w-12 h-12" />
          </motion.div>
          <motion.h1
            initial={{ x: 20, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="text-3xl container mx-auto text-center mb-10 text-gray-700 drop-shadow-md"
          >
            <span className="text-rose-500 font-semibold ">Book</span>
            <span className="text-cyan-600 font-semibold ">Look</span>
          </motion.h1>
          <motion.p
            initial={{ x: -20, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="text-5xl container mx-auto text-center text-gray-800 font-semibold drop-shadow-md text-cyan-400"
          >
            {" "}
            Page Not Found
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
