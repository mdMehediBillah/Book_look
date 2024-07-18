import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// SignUpComponent
const SignUpComponent = ({ toggleForm }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 w-5/12 mx-auto">
        Sign up your account
      </h2>
      <form onSubmit={handleSubmit} className=" w-5/12 mx-auto">
        <div className="mb-4">
          <label className="text-sm block font-medium text-gray-900">
            Name
          </label>
          <input
            type="text"
            name="name"
            // value={formData.name}
            // onChange={handleChange}
            placeholder="Your name"
            className="border-2 border-gray-300 rounded-lg py-2 px-4 text-gray-700 w-full focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm block font-medium text-gray-900">
            Email
          </label>
          <input
            type="email"
            name="email"
            // value={formData.email}
            // onChange={handleChange}
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
            // value={formData.password}
            // onChange={handleChange}
            placeholder="Your password"
            className="border-2 border-gray-300 rounded-lg py-2 px-4 text-gray-700 w-full focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-900"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white p-2 rounded-md hover:bg-emerald-800"
        >
          <Link to="/">Sign up</Link>
        </button>
      </form>
      <div>
        <p className="text-center text-gray-700 mt-4 text-sm">
          Already have an account?{" "}
          <button
            onClick={toggleForm}
            className="text-gray-900  pl-2 hover:underline"
          >
            Log In
          </button>
        </p>
      </div>
    </section>
  );
};

export default SignUpComponent;
