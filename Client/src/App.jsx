import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BorrowBookPage,
  CreateBookPage,
  CreateShelf,
  DonateBookPage,
  HomePage,
  NotFoundPage,
  RegistrationPage,
  TermsConditionPage,
  UserProfilePage,
  UserUpdatePage,
} from "./Pages";
import {
  BookDetailsCom,
  CreateBookComponent,
  SearchBookComponent,
} from "./Components";
import AdminDashboardPage from "./Pages/dashboardPages/adminDashboardPage/AdminDashboardPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registrationPage" element={<RegistrationPage />} />
        <Route path="/donate_book" element={<DonateBookPage />} />
        <Route path="/borrow_book" element={<BorrowBookPage />} />
        <Route path="/create_shelf" element={<CreateShelf />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/profile_update" element={<UserUpdatePage />} />

        <Route path="/create_book/:id" element={<CreateBookPage />}>
          <Route index element={<SearchBookComponent />} />
          <Route path="createBookSearch" element={<SearchBookComponent />} />
          <Route path="createBookinput" element={<CreateBookComponent />} />
        </Route>
        <Route path="/createBookSearch/:id" element={<BookDetailsCom />} />

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

export default App;
