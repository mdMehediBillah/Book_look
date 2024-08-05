import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={`m-4 px-4 py-2 rounded-md font-semibold transition duration-300 ${
        theme === "light"
          ? "bg-rose-500 text-white hover:bg-rose-700"
          : "bg-gray-200 text-rose-500 hover:bg-gray-300"
      }`}
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};

export default ThemeToggle;
