import React, { useState } from "react";
import { Country } from "country-state-city";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "./CustomTimePicker.css";
import TimeSelectionOptions from "../../Components/CreateShelfComponent/TimeSelectionOptions/TimeSelectionOptions.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
import BookshelfMap from "../../Components/CreateShelfComponent/BookshelfMap/BookshelfMap.jsx";
import MapSearch from "../../Components/CreateShelfComponent/MapSearch/MapSearch.jsx";
import AddressInput from "../../Components/CreateShelfComponent/AddressInput/AddressInput.jsx";
//==========================================================================
// Function to upload image to Cloudinary
//==========================================================================
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
//==========================================================================
// Function to create a new bookshelf
//==========================================================================

const CreateShelfForm = () => {
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    openingTime: "",
    closingTime: "",
    street: "",
    zipCode: "",
  });

  //==========================================================================
  //==========================================================================

  const [is24Hours, setIs24Hours] = useState(false);
  const [loading, setLoading] = useState(false);
  const [useMap, setUseMap] = useState(true);
  //==========================================================================
  //functions
  //==========================================================================

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

  // for selecting 24 hours or custom time
  const handleRadioChange = (e) => {
    setIs24Hours(e.target.value === "24hours");
  };
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    //==========================================================================
    // Upload images if they are selected
    //==========================================================================
    try {
      let imageUrl = formData.image
        ? await uploadImageToCloudinary(formData.image)
        : null;
      //==========================================================================
      // Create updated form data with URLs
      //==========================================================================
      console.log(" formData", formData);
      const updatedFormData = {
        ...formData,
        image: imageUrl,
        openingTime: is24Hours ? "00:00" : formData.openingTime,
        closingTime: is24Hours ? "23:59" : formData.closingTime,
      };
      //==========================================================================
      //==========================================================================
      console.log(" updatedFormData", updatedFormData);
      console.log(Country.getAllCountries());

      const x = Country.getAllCountries().filter(
        (country) => country.isoCode === updatedFormData.country
      );

      const formReq = { ...updatedFormData, country: x[0].name };

      const response = await axios.post(
        "http://localhost:8000/api/v1/bookshelves/new",
        formReq
      );
      // const response = await axios.post(
      //   "http://localhost:8000/api/v1/bookshelves/new",
      //   updatedFormData
      // );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error creating bookshelf:", error);
      toast.error(error.response?.data?.message || "Error creating bookshelf");
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };
  const handleLocationSelect = (addressData) => {
    setFormData((prevState) => ({
      ...prevState,
      ...addressData,
    }));
  };

  const handleLocationManual = (addressData) => {
    // setFormData((prevState) => ({
    //   ...prevState,
    //   addressData,
    // }));
    console.log(addressData);
    setFormData((prevState) => ({
      ...prevState,
      ...addressData,
    }));
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
        <div className="space-y-4 text-sm">
          Bookshelf Name:
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
          <div className="flex items-center mb-4">
            {/* <FontAwesomeIcon icon={faImage} className="mr-2 text-gray-600" /> */}
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
          <div className="flex items-center mb-4">
            {/* <FontAwesomeIcon icon={faClock} className="mr-2 text-gray-600" /> */}
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
            <button
              type="button"
              onClick={() => setUseMap(true)}
              className={`mr-2 py-2 px-4 ${
                useMap ? "bg-cyan-700 text-white" : "bg-gray-200 text-gray-700"
              } font-bold rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              Use Map
            </button>
            <button
              type="button"
              onClick={() => setUseMap(false)}
              className={`py-2 px-4 ${
                !useMap ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-700"
              } font-bold rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              Add Manually
            </button>
          </div>
          {useMap ? (
            <BookshelfMap onLocationSelect={handleLocationSelect} />
          ) : (
            <AddressInput
              formData={formData}
              handleChange={handleChange}
              handleLocationChange={handleLocationManual}
            />
          )}
        </div>
      </div>

      <div>
        <BookshelfMap onLocationSelect={handleLocationSelect} />
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
