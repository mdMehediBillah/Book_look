import { NavigationComponent, FooterComponent } from "../../Components";

const AboutUsPage = () => {
  return (
    <main>
      <NavigationComponent />
      <div className=" cursor-default max-w-screen-lg mx-auto">
        <div className="flex justify-center py-9 ">
          <h4 className="text-4xl font-medium  ">About Us</h4>
        </div>
        {/* <div className="flex justify-center pb-9">
          <div className=" grid grid-cols-1 mx-auto size-9/12  ">
            <div className="YOHANNES bg-cyan-100 grid grid-cols-2 mx-auto gap-11 py-3 px-3 items-center border-2 border-gray-300 rounded-xl my-2 ">
              <p>
                <p className="font-semibold text-xl">Yohannes Habtemariam</p>
                please introduce yourself by your own, i really dont know how to
                do this im really sorry
              </p>
              <img
                src="src/assets/images/yohannes.png"
                alt="Image of Yohannes"
                width="160"
                height="160"
                className="rounded-xl"
              />
            </div>
            <div className="ANNA bg-cyan-200 flex justify-center gap-11 py-3 px-3 items-center border-2 border-gray-300 rounded-xl my-2">
              <img
                src="src/assets/images/anna.png"
                alt="Image of Anna"
                width="160"
                height="160"
                className="rounded-xl"
              />
              <p>
                <p className="font-semibold text-xl"> Anna Najafi</p>
                <br />
                please introduce yourself by your own, i really dont know how to
                do this im really sorry
              </p>
            </div>
            <div className="MEHEDI bg-cyan-100 flex justify-center gap-11 py-3 px-3 items-center border-2 border-gray-300 rounded-xl my-2">
              <p>
                <p className="font-semibold text-xl">Md Mehedi Billah</p>
                <br />
                please introduce yourself by your own, i really dont know how to
                do this im really sorry
              </p>
              <img
                src="src/assets/images/mehedi.png"
                alt="Image of Mehedi"
                width="160"
                height="160"
                className="rounded-xl"
              />
            </div>
            <div className="ERDINC bg-cyan-200 flex justify-center gap-11 py-3 px-3 items-center border-2 border-gray-300 rounded-xl my-2">
              <img
                src="src/assets/images/erdinc.png"
                alt="Image of Erdinc"
                width="160"
                height="160"
                className="rounded-xl"
              />
              <p>
                <p className="font-semibold text-xl">Erdinc Yasar</p>
                <br />
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
                deleniti ab consequatur maxime eos, illo ipsam voluptas officia
                fugit deserunt tempora voluptatibus assumenda reiciendis ullam
                rem placeat aliquam, est amet.
              </p>
            </div>
          </div>
        </div> */}

        <div className="card card-side shadow-xl bg-cyan-100 mb-5 size-4/5 mx-auto  ">
          <figure>
            <img src="src/assets/images/yohannes.png" alt="Image of Yohannes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Yohannes Habtemariam</h2>
            <p>
              {" "}
              please introduce yourself by your own, i really dont know how to
              do this im really sorry
            </p>
          </div>
        </div>
        <div className="card card-side shadow-xl bg-cyan-100 mb-5 size-4/5 mx-auto">
          <div className="card-body">
            <h2 className="card-title">Anna Najafi</h2>
            <p>
              {" "}
              please introduce yourself by your own, i really dont know how to
              do this im really sorry
            </p>
          </div>
          <figure>
            <img src="src/assets/images/anna.png" alt="Image of Anna" />
          </figure>
        </div>
        <div className="card card-side shadow-xl bg-cyan-100 mb-5 size-4/5 mx-auto">
          <figure>
            <img src="src/assets/images/mehedi.png" alt="Image of Mehedi" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">MD Mehedi Billah</h2>
            <p>
              {" "}
              please introduce yourself by your own, i really dont know how to
              do this im really sorry
            </p>
          </div>
        </div>
        <div className="card card-side shadow-xl bg-cyan-100 mb-5 size-4/5 mx-auto">
          <div className="card-body">
            <h2 className="card-title">Erdinc Yasar</h2>
            <p>
              {" "}
              please introduce yourself by your own, i really dont know how to
              do this im really sorry
            </p>
          </div>
          <figure>
            <img src="src/assets/images/erdinc.png" alt="Image of Erdinc" />
          </figure>
        </div>
      </div>
      <FooterComponent />
    </main>
  );
};

export default AboutUsPage;
