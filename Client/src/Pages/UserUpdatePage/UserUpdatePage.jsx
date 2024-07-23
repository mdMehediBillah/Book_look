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

  const userLocal = localStorage.getItem("user");
  const user = JSON.parse(userLocal);
  const {
    firstName,
    lastName,
    email,
    street,
    zipCode,
    city,
    state,
    country,
    image,
    banner,
  } = user;

  const [formData, setFormData] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
    password: "",
    street: street || "",
    zipCode: zipCode || "",
    city: city || "",
    state: state || "",
    country: country || "",
    image: "",
    banner: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState(image || "");
  const [bannerPreview, setBannerPreview] = useState(banner || bannerImgUrl);

  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/registrationPage");
  }, [logout]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,
      });

      if (name === "image") {
        setImagePreview(URL.createObjectURL(file));
      } else if (name === "banner") {
        setBannerPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const cloud_name = import.meta.env.VITE_CLOUD_NAME;
    const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
    const cloud_URL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

    const data = new FormData();
    data.append("file", file);
    data.append("cloud_name", cloud_name);
    data.append("upload_preset", upload_preset);

    const response = await axios.post(cloud_URL, data);
    return response.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image
        ? await uploadImageToCloudinary(formData.image)
        : image;
      let bannerUrl = formData.banner
        ? await uploadImageToCloudinary(formData.banner)
        : banner;

      const updatedFormData = {
        ...formData,
        image: imageUrl,
        banner: bannerUrl,
      };

      const response = await axios.put(
        `http://localhost:8000/api/v1/auth/update/${user._id}`,
        updatedFormData
      );
      console.log("User updated successfully:", response.data);
      setSuccess("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Server error! Please try again!");
    } finally {
      setLoading(false);
    }
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
          backgroundImage: `url(${bannerPreview})`,
        }}
      >
        <div className="avatar absolute bottom-[-48px] left-[32px]">
          <div className="ring-gray ring-offset-base-100 w-44 rounded-full ring ring-offset-2">
            <img src={imagePreview} alt="Profile" />
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
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              className="w-full text-gray-900 outline-none bg-transparent"
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
          <div className="flex flex-col">
            <label>Profile Image:</label>
            <input type="file" name="image" onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <label>Banner Image:</label>
            <input type="file" name="banner" onChange={handleChange} />
          </div>
          <div className="mb-4 px-2">
            <label>
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mr-2 w-4 h-4"
              />
              I accept the{" "}
              <Link to="/terms_condition">
                <span className="hover:underline text-cyan-600 cursor-pointer">
                  terms and conditions
                </span>
              </Link>
            </label>
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
