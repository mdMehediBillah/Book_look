import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";  //to show notifications
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const CreateShelfForm = () => {
  const [formData, setFormData] = useState({
    barcode: "",
    image: "",
    name: "",
    openingTime: "",
    closingTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTimeChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/bookshelves", formData);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating bookshelf");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <div className="mb-4">
        <label
          htmlFor="barcode"
          className="block text-sm font-medium text-gray-700"
        >
          Barcode:
        </label>
        <input
          type="text"
          id="barcode"
          name="barcode"
          value={formData.barcode}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Image URL:
        </label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="openingTime"
          className="block text-sm font-medium text-gray-700"
        >
          Opening Time:
        </label>
        <TimePicker
          id="openingTime"
          name="openingTime"
          value={formData.openingTime}
          onChange={(value) => handleTimeChange("openingTime", value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="closingTime"
          className="block text-sm font-medium text-gray-700"
        >
          Closing Time:
        </label>
        <TimePicker
          id="closingTime"
          name="closingTime"
          value={formData.closingTime}
          onChange={(value) => handleTimeChange("closingTime", value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-cyan-700 text-white font-bold rounded-md hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Create Bookshelf
      </button>
    </form>
  );
};
export default CreateShelfForm;
