import { Link, useNavigate } from "react-router-dom";
import { GoBackComponent } from "../../Components";
import bannerImgUrl from "../../assets/images/banner_default.png";
import profileImgUrl from "../../assets/images/avatar.png";
import { useContext, useEffect, useState } from "react";
import { useAuthContext } from "../../Context/User/AuthContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
// import { format } from "date-fns";
// import { useUserContext } from "../../Context/User/UserContext.jsx";

const UserUpdatePage = () => {
  const url = import.meta.env.VITE_REACT_APP_URL;
  // const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();

  // const userLocal = localStorage.getItem("user");
  // const user = JSON.parse(userLocal);
  const {
    firstName,
    lastName,
    email,
    aboutMe,
    street,
    zipCode,
    city,
    state,
    country,
    image,
    banner,
    createdAt,
  } = user;

  const [formData, setFormData] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
    password: "",
    aboutMe: aboutMe || "",
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
  const [imagePreview, setImagePreview] = useState(image || profileImgUrl);
  const [bannerPreview, setBannerPreview] = useState(banner || bannerImgUrl);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/registrationPage");
  }, []);

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

  const handelUpdate = async (e) => {
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
      // const token = localStorage.getItem("token");
      const response = await axios.put(
        `${url}/api/v1/auth/update/${user._id}`,
        updatedFormData,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      console.log("User updated successfully:", response.data);

      setUser(response.data.result);
      // localStorage.setItem("user", JSON.stringify(response.data.result));
      setSuccess("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Server error! Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pb-16">
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
          <div className="ring-gray-50 ring-cyan-400 w-44 rounded-full ring ring-offset-2">
            <img src={imagePreview} alt="Profile" />
          </div>
        </div>
      </div>
      <div className="py-2 px-4 container mx-auto justify-between screen-max-lg bg-gray-100 max-w-screen-lg pb-16">
        <form onSubmit={handelUpdate} className="">
          <div className="flex justify-between ">
            <div className="flex flex-col pt-12 w-56">
              <label className="mt-1 py-2 px-3 rounded cursor-pointer text-center  px-4 bg-cyan-100 w-8/12 mx-auto rounded-xl font-semibold hover:bg-cyan-300 text-sm">
                Change Profile
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex flex-col items-end w-56">
              <label className="mt-1 py-2 px-3 rounded cursor-pointer text-center  px-4 bg-cyan-100 w-8/12 mx-auto rounded-xl font-semibold hover:bg-cyan-300 text-sm">
                Change Banner
                <input
                  type="file"
                  name="banner"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="flex container mx-auto min-w-[360px] max-w-[900px] justify-between items-end pb-12 mt-8">
            <div>
              <h4 className="text-3xl font-semibold text-gray-600 ">
                Personal information
              </h4>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1 text-gray-500 text-sm">
                <span className="">Email:</span>
                <span>{email}</span>
              </div>
              <div className="flex gap-1 text-gray-500 text-sm">
                <span className="">Member since:</span>
                {/* <span>{`${format(createdAt, "dd/MM/yyyy")}`} </span> */}
              </div>
            </div>
          </div>
          <div className="min-w-[360px] max-w-[900px] mx-auto  grid md:grid-cols-2 sm:grid-cols-1 gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <div className="flex flex-col">
                  <label className="text-sm block  text-gray-700 mb-1">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Your first name"
                    required
                    className="border-2 border-gray-200 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm block  text-gray-700 mb-1">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Your last name"
                    required
                    className="border-2 border-gray-200 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm block  text-gray-700 mb-1">
                  About yourself
                </label>
                <textarea
                  name="aboutMe"
                  value={formData.aboutMe}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  className="border-2 border-gray-200 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50 h-[162px]"
                />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-600 pb-2 pt-6">
                Address
              </h4>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <div className="flex flex-col">
                    <label className="text-sm block  text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Your country"
                      className="border-2 border-gray-200 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm block  text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Your state"
                      className="border-2 border-gray-200 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex flex-col">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Your city"
                      className="border-2 border-gray-200 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm block  text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="Your postal code"
                      className="border-2 border-gray-200 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm block  text-gray-700 mb-1">
                    Road
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Your Road"
                    className="border-2 border-gray-200 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm block  text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address"
                required
                className="border-2 border-gray-200 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm block  text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
                className="border-2 border-gray-200 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
              />
            </div>
            <div className="mb-8 px-2 pt-4">
              <label>
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="mr-2 w-4 h-4"
                />
                I am updating my profile and I agree to the changes
              </label>
            </div>
          </div>

          <div className=" min-w-[360px] max-w-[900px] mx-auto pt-8">
            <div className="w-6/12 mx-auto bg-cyan-900 text-center py-2 px-4 rounded-lg text-white font-semibold hover:bg-rose-600 cursor-pointer">
              <button type="submit" disabled={loading}>
                {loading ? "Uploading..." : "Update Profile"}
              </button>
              {error && (
                <p className="bg-red-700 text-white px-2 py-1 mt-2 text-sm">
                  {error}
                </p>
              )}
              {success && (
                <p className="bg-green-700 px-2 py-1 mt-2 text-sm font-regular">
                  {success}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default UserUpdatePage;
