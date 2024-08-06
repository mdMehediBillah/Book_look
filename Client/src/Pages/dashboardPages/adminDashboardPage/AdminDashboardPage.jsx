import { useContext, useState } from "react";
import "./AdminDashboardPage.scss";
import AdminSidebar from "../../../Components/admin/adminSidebar/AdminSidebar";
import DashboardSummary from "../../../Components/admin/dashboardSummary/DashboardSummary";
import { NavigationComponent, FooterComponent } from "../../../Components";
import { ThemeContext } from "../../../Components/lightDarkMood/ThemeContext.jsx";

const AdminDashboardPage = () => {
  const [isActive, setIsActive] = useState(1);
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  return (
    <main className="admin-dashboard-page">
      <NavigationComponent />

      <section
        className={`admin-dashboard-page-container ${
          theme === "light" ? "bg-gray-50" : "bg-gray-800"
        }`}
      >
        <h4
          className={`text-4xl font-medium text-center ${
            theme === "light" ? "text-gray-800" : "text-gray-50"
          }`}
        >
          Admin Dashboard
        </h4>

        <div
          className={`admin-content-wrapper ${
            theme === "light" ? "bg-gray-50" : "bg-gray-800"
          }`}
        >
          <div className="sidebar ">
            <AdminSidebar isActive={isActive} setIsActive={setIsActive} />
          </div>

          <div className="main ">
            <DashboardSummary isActive={isActive} />
          </div>
        </div>
      </section>
      <FooterComponent />
    </main>
  );
};

export default AdminDashboardPage;
