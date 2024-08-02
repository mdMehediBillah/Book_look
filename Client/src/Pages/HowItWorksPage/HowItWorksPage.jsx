import { NavigationComponent, FooterComponent } from "../../Components";

const HowItWorks = () => {
  return (
    <div>
      <NavigationComponent />
      <div className=" cursor-default max-w-screen-lg mx-auto">
        <div className="flex justify-center py-9 ">
          <h4 className="text-4xl font-medium  ">How it Works</h4>
        </div>
        <div className="flex flex-col justify-center items-center px-32 pb-9">
          <img
            src="src/assets/images/booklook_drawn_image.png"
            alt=" drawn image of how it works"
            width="600"
            height="auto"
          />
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
            laboriosam cupiditate expedita laudantium, ipsa dolorum asperiores
            corporis obcaecati enim voluptate eius, consectetur ad officia?
            Officia, quaerat quos. Necessitatibus, natus obcaecati!
          </p>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default HowItWorks;
