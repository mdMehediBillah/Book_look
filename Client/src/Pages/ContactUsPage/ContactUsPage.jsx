import { NavigationComponent, FooterComponent } from "../../Components";

const ContactUsPage = () => {
  return (
    <main>
      <NavigationComponent />
      <div className=" max-w-screen-lg mx-auto">
        <div className=" flex justify-center py-9 ">
          <h4 className="text-4xl font-medium cursor-default">Contact Us</h4>
        </div>
        <div className=" flex justify-center">
          <div className=" grid md:grid-cols-2 size-9/12  items-center  ">
            <img
              src="src/assets/images/contactUsBackground.png.png"
              alt="ContactUsImage"
              className="rounded-md  "
            />
            <form className=" flex flex-col py-1 px-1 rounded-md " action="">
              <input
                type="text"
                placeholder="Your Name"
                className="border-2 border-gray-300 w-full p-2 rounded-md focus:outline-none "
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border-2 border-gray-300 w-6ful p-2 mt-4 rounded-md focus:outline-none "
              />
              <textarea
                placeholder="Your Message"
                className="border-2 border-gray-300 w-6ful p-2 mt-4 rounded-md focus:outline-none resize-none"
              />
              <button
                type="submit"
                className="py-2 px-2 mt-4 text-black bg-cyan-200 border-2 border-gray-300 rounded-md w-24 font-light hover:font-medium hover:bg-cyan-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <FooterComponent />
    </main>
  );
};

export default ContactUsPage;
