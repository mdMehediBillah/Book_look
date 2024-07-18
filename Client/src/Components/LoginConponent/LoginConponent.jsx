import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const LoginConponent = ({ toggleForm }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle reset
  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      handleReset();
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 w-5/12 mx-auto">
        Log in your account
      </h2>
      <form onSubmit={handleSubmit} className=" w-5/12 mx-auto">
        <div className="mb-4">
          <label className="text-sm block font-medium text-gray-900">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="border-2 border-gray-300 rounded-lg py-2 px-4 text-gray-700 w-full focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm block font-medium text-gray-900">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className="border-2 border-gray-300 rounded-lg py-2 px-4 text-gray-700 w-full focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-900"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white p-2 rounded-md hover:bg-emerald-800"
        >
          <Link to="/">Login</Link>
        </button>
      </form>
      <div>
        <p className="text-center text-gray-700 mt-4 text-sm">
          Don't have an account?{" "}
          <button
            onClick={toggleForm}
            className="text-gray-900  pl-2 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </section>
  );
};

export default LoginConponent;
