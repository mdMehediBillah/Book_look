import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BorrowBookPage,
  CreateShelf,
  DonateBookPage,
  HomePage,
  NotFoundPage,
  RegistrationPage,
  TermsConditionPage,
  UserProfilePage,
  UserUpdatePage,
} from "./Pages";
import { NavigationComponent } from "./Components";
import AdminDashboardPage from "./Pages/dashboardPages/adminDashboardPage/AdminDashboardPage";

function App() {
  return (
    <>
      <ConditionalNavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registrationPage" element={<RegistrationPage />} />
        <Route path="/donate_book" element={<DonateBookPage />} />
        <Route path="/borrow_book" element={<BorrowBookPage />} />
        <Route path="/create_shelf" element={<CreateShelf />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/profile_update" element={<UserUpdatePage />} />
        <Route path="/terms_condition" element={<TermsConditionPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        limit={1}
        autoClose={1500}
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
  const hideNavBarRoutes = [
    "/registrationPage",
    "/profile",
    "/terms_condition",
    "/profile_update",
  ];

  return !hideNavBarRoutes.includes(location.pathname) ? (
    <NavigationComponent />
  ) : null;
};
export default App;
