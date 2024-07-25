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

  //------------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------------

// Function to upload image to Cloudinary
const uploadImageToCloudinary = async (file) => {
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
  const cloud_URL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", upload_preset);
  const response = await axios.post(cloud_URL, data);
  return response.data.url;
};
 //------------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------------

const CreateShelfForm = () => {
  const [formData, setFormData] = useState({
    barcode: "",
    image: null,
    // banner: null,
    name: "",
    openingTime: "",
    closingTime: "",
    country: "",
    state: "",
    city: "",
    street: "",
    zipCode: "",
    // latitude: "",
    // longitude: "",
  });
  //------------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  const [images, setImages] = useState([]);
  const [is24Hours, setIs24Hours] = useState(false);
  const [loading, setLoading] = useState(false);

  //------------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // for file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  // for time selection
  const handleTimeChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // for location selection
  const handleLocationChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // for selecting 24 hours or custom time
  const handleRadioChange = (e) => {
    setIs24Hours(e.target.value === "24hours");
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    //------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------
    // const data = new FormData();
    // data.append("barcode", formData.barcode);
    // data.append("image", formData.image);
    // data.append("name", formData.name);
    // data.append("openingTime", is24Hours ? "00:00" : formData.openingTime);
    // data.append("closingTime", is24Hours ? "23:59" : formData.closingTime);
    // data.append("country", formData.country);
    // data.append("state", formData.state);
    // data.append("city", formData.city);
    // data.append("street", formData.street);
    // data.append("zipCode", formData.zipCode);
    // data.append("latitude", formData.latitude);
    // data.append("longitude", formData.longitude);
    //------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------
    try {
      // Upload images if they are selected
      let imageUrl = formData.image
        ? await uploadImageToCloudinary(formData.image)
        : null;
      // let bannerUrl = formData.banner
      //   ? await uploadImageToCloudinary(formData.banner)
      //   : null;

      //------------------------------------------------------------------------------------------------------------
      //------------------------------------------------------------------------------------------------------------

      // Create updated form data with URLs
      const updatedFormData = {
        ...formData,
        image: imageUrl,
        // banner: bannerUrl,
      };

      //------------------------------------------------------------------------------------------------------------
      //------------------------------------------------------------------------------------------------------------
      // Send the updated form data to the server
      const response = await axios.post(
        "http://localhost:8000/api/v1/bookshelves/new",
        updatedFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error creating bookshelf:", error);
      toast.error(error.response?.data?.message || "Error creating bookshelf");
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-6 mt-10 bg-white shadow-md rounded-md"
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
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faImage} className="mr-2 text-gray-600" />
            <div className="flex-1">
              <label
                htmlFor="banner"
                className="block text-sm font-medium text-gray-700"
              >
                Banner:
              </label>
              <input
                type="file"
                id="banner"
                name="banner"
                onChange={handleFileChange}
                accept="image/*"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div> */}

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
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="Zip Code"
                required
                className="pl-10 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* <div className="flex items-center mb-4 relative">
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
                required
                placeholder="Latitude"
                className="pl-10 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div> */}

          {/* <div className="flex items-center mb-4 relative">
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
                required
                placeholder="Longitude"
                className="pl-10 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div> */}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 mt-7 px-4 bg-cyan-700 text-white font-bold rounded-md hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Create Bookshelf
      </button>
    </form>
  );
};

export default CreateShelfForm;