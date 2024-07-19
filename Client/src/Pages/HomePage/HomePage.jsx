import { SearchComponent } from "../../Components";
import Location from "../../Components/Location/Location";

const HomePage = () => {
  return (
    <main>
      <section>
        <SearchComponent />
        <h1>Welcome to Home Page</h1>
      </section>
     <div className="container mx-auto flex-grow p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Location />
        </div>
      </div>
    </main>
  );
};

export default HomePage;




