import {
  FaFacebook,
  FaWhatsapp,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GiBlackBook } from "react-icons/gi";
import { Link } from "react-router-dom";
import NewsletterSubscription from "../NewsletterSubscription/NewsletterSubscription";

const FooterComponent = () => {
  return (
    <div className="bg-cyan-900 min-h-48 text-white">
      <div className="flex justify-evenly py-3">
        <div className="py-3 grid grid-cols-1 gap-2">
          <img
            src="src/assets/images/app-gallery-badge-en.png"
            alt="downloadButtonForAppGallery"
            width="160"
            height="80"
            className="cursor-pointer"
          />
          <img
            src="src/assets/images/app-store-badge-en.png"
            alt="downloadButtonForAppleStore"
            width="160"
            height="80"
            className="cursor-pointer"
          />
          <img
            src="src/assets/images/google-play-badge-en.png"
            alt="downloadButtonForPlayStore"
            width="160"
            height="80"
            className="cursor-pointer"
          />
        </div>
        <div className="py-3 ">
          <ul className="grid grid-cols-1 gap-2 cursor-pointer ">
            <Link to="/">
              <li className="hover:text-cyan-200 text-sm">Home</li>
            </Link>
            <Link to="/about_us">
              <li className="hover:text-cyan-200 text-sm">About Us</li>
            </Link>
            <Link to="/contact_us">
              <li className="hover:text-cyan-200 text-sm">Contact Us</li>
            </Link>
            <Link to="/how_it_works">
              <li className="hover:text-cyan-200 text-sm">How it Works</li>
            </Link>
            <li className="hover:text-cyan-200 text-sm">FAQ</li>
            <li className="hover:text-cyan-200 text-sm">Terms & Conditions</li>
          </ul>
        </div>
        <div className="">
          <h6 className="font-medium text-2xl  pb-4 py-3 cursor-default">
            Newsletter
          </h6>
          <NewsletterSubscription />
          {/* <form action="" className="py-2">
            <div className="flex  h-4 items-center  ">
              <input
                type=""
                name=""
                id=""
                placeholder="Email Address"
                className="p-0,5 pl-3 rounded-l-full h-8"
              />
              <button
                type="button"
                className=" px-4 py-1 h-8 bg-cyan-100 rounded-r-full text-center cursor-pointer text-s hover:bg-cyan-200 text-black "
              >
                Subscribe
              </button>
            </div>
          </form> */}
          <ul className="flex py-4 gap-1 cursor-pointer">
            <li className="px-0.5 text-3xl hover:text-green-600 ">
              <FaWhatsapp color="" />
            </li>
            <li className="px-0.5 text-3xl hover:text-blue-600">
              <FaFacebook />
            </li>
            <li className="px-0.5 text-3xl hover:text-red-600">
              <FaYoutube />
            </li>
            <li className="px-0.5 text-3xl hover:text-blue-800">
              <FaLinkedin />
            </li>
            <li className="px-0.5 text-3xl hover:text-pink-700">
              <FaInstagram />
            </li>
            <li className="px-0.5 text-3xl hover:text-black ">
              <FaXTwitter />
            </li>
          </ul>
          <p className="text-sm hover:text-cyan-200">
            <a href="tel:+1629386868">Mobile: +49 162 9386868</a>
          </p>
          <p className="text-sm hover:text-cyan-200">
            <a href="mailto:mailbillah@gmail.com">Email: team@booklook.com</a>
          </p>
        </div>
      </div>

      <div className="flex justify-evenly p-4 border-t border-white">
        <div className=" w-2/12 logo ">
          <Link to="/" className="flex justify-center items-center gap-2">
            <GiBlackBook className="min-w-11  min-h-11 text-cyan-200 " />

            <div>
              <span className="text-rose-400 font-semibold text-2xl">Book</span>
              <span className="text-cyan-400 font-semibold text-2xl">Look</span>
            </div>
          </Link>
        </div>
        <Link to="/">
          <p className="flex  justify-center pt-2 cursor-default">
            ©2024 booklook.com
          </p>
        </Link>
      </div>
    </div>
  );
};

export default FooterComponent;
