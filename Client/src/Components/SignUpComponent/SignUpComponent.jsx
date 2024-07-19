import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";

// =================================================================
// SignUpComponent
const SignUpComponent = ({ toggleForm }) => {
  const navigate = useNavigate();

  // =================================================================
  // define states
  const [visible, setVisibile] = useState(true);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  // =================================================================
  // handleChange event
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error message on input change
  };

  // =================================================================
  // handleReset event
  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  // =================================================================
  // handleSubmit event
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const newUser = {
        name,
        email,
        password,
      };
      const { data } = await axios.post(
        `http://localhost:5050/api/v1/auth/registerUserr`,
        newUser
      );
      console.log(data);
      toast.success("SignUp successfully!");
      handleReset();
      navigate("/");
    } catch (error) {
      toast.error("Please fill all information in the form");
    }
  };

  // =================================================================
  // =================================================================
  // return the SignUpComponent
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "tween", duration: 0.3 }}
      className=" w-5/12 mx-auto min-w-[360px] max-w-[580px] bg-gray-100 p-4 rounded-xl mb-16"
    >
      <h2 className="text-xl font-bold mb-6 text-gray-900">
        Sign up your account
      </h2>
      <form onSubmit={handleSubmit} className="">
        <div className="mb-4">
          <label className="text-sm block font-medium text-gray-900">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="border-2 border-gray-300 rounded-lg py-2 px-4 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-100 text-gray-900"
          />
          {errors.name && (
            <p className="text-xs text-red-600 px-2 pt-1">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="text-sm block font-medium text-gray-900">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email address"
            className="border-2 border-gray-300 rounded-lg py-2 px-4 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-100 text-gray-900"
          />
          {errors.email && (
            <p className="text-xs text-red-600 px-2 pt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="text-sm block font-medium text-gray-900">
            Password
          </label>
          <div className="flex w-full items-center justify-between border-2 border-gray-300 rounded-lg py-2 px-4 text-gray-700 0focus:outline-none focus:border-cyan-50">
            <input
              type={visible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              className="w-full text-gray-900 outline-none bg-transparent "
            />

            <div
              onClick={() => {
                setVisibile(!visible);
              }}
              className="cursor-pointer w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-300"
            >
              {visible ? <LuEye /> : <LuEyeOff />}
            </div>
          </div>
          {errors.password && (
            <p className="text-xs text-red-600 px-2 pt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-600 text-white p-2 rounded-md hover:bg-cyan-800"
        >
          Sign up
        </button>
      </form>
      <div>
        <p className="text-center text-gray-700 mt-4 text-sm">
          Already have an account?{" "}
          <button
            onClick={toggleForm}
            className="text-gray-900  pl-2 hover:underline hover:font-semibold"
          >
            Log In
          </button>
        </p>
      </div>
    </motion.section>
  );
};

export default SignUpComponent;
