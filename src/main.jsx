import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./font.css";
import Navbar from "./components/Navbar.jsx";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/UserContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <Navbar />
      <App />
    </UserProvider>
  </BrowserRouter>
);
