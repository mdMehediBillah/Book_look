import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BorrowBookPage,
  CreateShelf,
  DonateBookPage,
  HomePage,
  RegistrationPage,
  UserProfilePage,
} from "./Pages";
import { NavigationComponent } from "./Components";

function App() {
  return (
    <>
      <ConditionalNavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/donate_book" element={<DonateBookPage />} />
        <Route path="/borrow_book" element={<BorrowBookPage />} />
        <Route path="/create_shelf" element={<CreateShelf />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        limit={1}
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

const ConditionalNavBar = () => {
  const location = useLocation();

  // Don't display Navbar on these routes
  const hideNavBarRoutes = ["/registration", "/profile"];

  return !hideNavBarRoutes.includes(location.pathname) ? (
    <NavigationComponent />
  ) : null;
};
export default App;
