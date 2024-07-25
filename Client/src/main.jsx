import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/User/AuthContext.jsx";
import { UserProvider } from "./Context/User/UserContext.jsx";
import { AppProvider } from "./Context/Book/context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <AppProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
