import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "./CustomTimePicker.css";
import CountryStateCitySelector from "../../Components/CreateShelfComponent/CountryStateCitySelector.jsx";
import TimeSelectionOptions from "../../Components/CreateShelfComponent/TimeSelectionOptions.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarcode,
  faImage,
  faBook,
  faClock,
  faMapMarkerAlt,
  faRoad,
  faMapPin,
  faMap,
  faCity, 
  faGlobe, 
} from "@fortawesome/free-solid-svg-icons";

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
    latitude: "",
    longitude: "",
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
    data.append("latitude", formData.latitude);
    data.append("longitude", formData.longitude);

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
      className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <h2 className="text-xl font-bold mb-4 text-center">
        Create New Bookshelf
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side */}
        <div className="space-y-4">
          <div className="flex items-center mb-4 relative">
            <FontAwesomeIcon
              icon={faBook}
              className="absolute left-3 top-3 text-gray-600"
            />
            <div className="flex-1">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Bookshelf Name"
                required
                className="pl-10 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center mb-4 relative">
            <FontAwesomeIcon
              icon={faBarcode}
              className="absolute left-3 top-3 text-gray-600"
            />
            <div className="flex-1">
              <input
                type="text"
                id="barcode"
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
                placeholder="Barcode"
                required
                className="pl-10 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faImage} className="mr-2 text-gray-600" />
            <div className="flex-1">
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
          </div>

          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faClock} className="mr-2 text-gray-600" />
            <div className="flex-1">
              <TimeSelectionOptions
                is24Hours={is24Hours}
                handleRadioChange={handleRadioChange}
              />
            </div>
          </div>

          {!is24Hours && (
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
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

              <div className="flex-1">
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
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="mr-2 text-gray-600"
            />
            <div className="flex-1">
              <CountryStateCitySelector
                onLocationChange={handleLocationChange}
              />
            </div>
          </div>

          <div className="flex items-center mb-4 relative">
            <FontAwesomeIcon
              icon={faRoad}
              className="absolute left-3 top-3 text-gray-600"
            />
            <div className="flex-1">
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Street"
                required
                className="pl-10 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center mb-4 relative">
            <FontAwesomeIcon
              icon={faMap}
              className="absolute left-3 top-3 text-gray-600"
            />
            <div className="flex-1">
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Postal Code"
                required
                className="pl-10 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center mb-4 relative">
            <FontAwesomeIcon
              icon={faMapPin}
              className="absolute left-3 top-3 text-gray-600"
            />
            <div className="flex-1">
              <input
                type="text"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="Latitude"
                className="pl-10 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center mb-4 relative">
            <FontAwesomeIcon
              icon={faMapPin}
              className="absolute left-3 top-3 text-gray-600"
            />
            <div className="flex-1">
              <input
                type="text"
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="Longitude"
                className="pl-10 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-cyan-700 text-white font-bold rounded-md hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-6"
      >
        Create Bookshelf
      </button>
    </form>
  );
};

export default CreateShelfForm;
