import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "./CustomTimePicker.css";
import CountryStateCitySelector from "../../Components/CreateShelfComponent/CountryStateCitySelector";


const CreateShelfForm = () => {
  const [formData, setFormData] = useState({
    barcode: "",
    image: "",
    name: "",
    openingTime: "",
    closingTime: "",
    country: "",
    state: "",
    city: "",
    street: "",
    postalCode: "",
  });

  const [images, setImages] = useState([]);
  const [is24Hours, setIs24Hours] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTimeChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleLocationChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("openingTime", is24Hours ? "00:00" : formData.openingTime);
    data.append("closingTime", is24Hours ? "23:59" : formData.closingTime);
    data.append("country", formData.country);
    data.append("state", formData.state);
    data.append("city", formData.city);
    data.append("street", formData.street);
    data.append("postalCode", formData.postalCode);

    if (images.length > 2) {
      toast.error("You can upload a maximum of 2 images.");
      return;
    }

    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    try {
      const response = await axios.post("/api/bookshelves", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating bookshelf");
    }
  };

  const handleRadioChange = (e) => {
    setIs24Hours(e.target.value === "24hours");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <h2 className="text-xl font-bold mb-4 text-center">
        Create New Bookshelf
      </h2>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name of Bookshelf:
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
          htmlFor="images"
          className="block text-sm font-medium text-gray-700"
        >
          Images (Max 2):
        </label>
        <input
          type="file"
          id="images"
          name="images"
          onChange={handleFileChange}
          accept="image/*"
          multiple
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <CountryStateCitySelector onLocationChange={handleLocationChange} />

      <div className="mb-4">
        <label
          htmlFor="postalCode"
          className="block text-sm font-medium text-gray-700"
        >
          Postal Code:
        </label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="street"
          className="block text-sm font-medium text-gray-700"
        >
          Street:
        </label>
        <input
          type="text"
          id="street"
          name="street"
          value={formData.street}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Opening Time:
        </label>
        <div className="flex items-center">
          <input
            type="radio"
            id="24hours"
            name="timeOption"
            value="24hours"
            checked={is24Hours}
            onChange={handleRadioChange}
            className="mr-2"
          />
          <label htmlFor="24hours" className="mr-4">
            24 Hours
          </label>
          <input
            type="radio"
            id="customTime"
            name="timeOption"
            value="customTime"
            checked={!is24Hours}
            onChange={handleRadioChange}
            className="mr-2"
          />
          <label htmlFor="customTime">Custom Time</label>
        </div>
      </div>

      {!is24Hours && (
        <>
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
              className="time-picker-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="time-picker-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </>
      )}

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
