import { Link, useNavigate } from "react-router-dom";
import { GoBackComponent } from "../../Components";
import bannerImgUrl from "../../assets/images/banner_default.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/User/AuthContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const UserUpdatePage = () => {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  // fetching data from local storage
  const userLocal = localStorage.getItem("user");
  const user = JSON.parse(userLocal);
  // console.log(userLocal);
  const { firstName, lastName, email, image, createdAt } = user;
  // console.log(email, firstName, lastName, email, image, createdAt);

  // States define
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userData, setUserData] = useState(userLocal);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    zipCode: "",
    city: "",
    state: "",
    country: "",
    image: "",
  });

  // =================================================================
  // Check if user is logged in
  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/registrationPage");
    setUserData(userLocal);
  }, [logout]);

  // handleChange
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // handleImageChange
  const handleImageChange = (e) => {
    setImageData(e.target.files[0]);
  };
  // ==================================================================
  // handleUpload image to Cloud Storage
  const handleUpload = async () => {
    // e.preventDefault();
    if (!imageData) return "";
    // Set loading to true
    setLoading(true);
    setError("");
    setSuccess("");
    // =================================================================
    // Upload image to Cloudinary
    // =================================================================

    const cloud_name = import.meta.env.VITE_CLOUD_NAME;
    const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
    const cloud_URL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

    // Save image to cloudinary
    // const response = await axios.post(cloud_URL, userProfilePhoto);
    // const { url } = response.data;

    // =================================================================
    const userProfilePhoto = new FormData();
    userProfilePhoto.append("file", imageData);
    userProfilePhoto.append("cloud_name", cloud_name);
    userProfilePhoto.append("upload_preset", upload_preset);
    console.log(cloud_URL);

    try {
      const response = await axios.post(
        await axios.post(cloud_URL, userProfilePhoto)
      );
      const { url } = response.data;
      console.log(url);
      return url;
    } catch (error) {
      console.error("Error uploading the image", error);
      setError("Error uploading the image. Please try again.");
      setLoading(false);
      return "";
    }
  };
  // ==================================================================
  // handleSubmit
  // ==================================================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleUpload();
    // setError("");
    // setSuccess("");

    // let imageUrl = formData.image;
    // if (imageData) {
    //   imageUrl = await handleUpload();
    // }

    // if (!imageUrl) return; // If image upload failed, don't proceed

    // const updatedFormData = { ...formData, image: imageUrl };
    // console.log(image);

    // try {
    //   const response = await axios.post(
    //     "http://localhost:5050/api/v1/users/update",
    //     updatedFormData
    //   );
    //   console.log("User updated successfully:", response.data);
    //   setSuccess("Profile updated successfully!");
    // } catch (error) {
    //   console.error("Error updating user:", error);
    //   setError("Server error! Please try again!");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <main>
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
      <div
        className="bg-gray-400 h-[180px] relative container max-w-screen-lg mx-auto bg-cover bg-center bg-no-repeat w-[100%]"
        style={{
          backgroundImage: `url(${bannerImgUrl})`,
        }}
      >
        <div className="avatar absolute bottom-[-48px] left-[32px]">
          <div className="ring-gray ring-offset-base-100 w-44 rounded-full ring ring-offset-2">
            <img src={image} />
          </div>
        </div>
      </div>
      <div className="py-2 px-4 container mx-auto justify-between screen-max-lg bg-gray-100 max-w-screen-lg">
        <form onSubmit={handleSubmit} className="w-4/12 mx-auto">
          <div className="flex flex-col">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Street:</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Zip Code:</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label>State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Profile Image:</label>
            <input type="file" onChange={handleImageChange} />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Update Profile"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
        </form>
      </div>
    </main>
  );
};

export default UserUpdatePage;
