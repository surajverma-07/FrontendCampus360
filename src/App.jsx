import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AllPost from "./pages/AllPost";
import MyPost from "./pages/MyPost";
import AllEvents from "./pages/AllEvent";
import MyEvent from "./pages/MyEvent";
import AllCareers from "./pages/AllCareers";
import MyCareers from "./pages/MyCareers";
import { userState } from "./context/UserContext";

function App() {
  const navigate = useNavigate();
  const { isAuthorized } = userState();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/signup" element={<SignUpPage />} exact />
        <Route path="/login" element={<LoginPage />} exact />

        {isAuthorized ? (
          <>
            <Route path="/allpost" element={<AllPost />} exact />
            <Route path="/mypost" element={<MyPost />} exact />
            <Route path="/allevent" element={<AllEvents />} exact />
            <Route path="/myevent" element={<MyEvent />} exact />
            <Route path="/allcareer" element={<AllCareers />} exact />
            <Route path="/mycareer" element={<MyCareers />} exact />
          </>
        ) : (
          <>
            <Route path="*" element={navigate("/login")} exact />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
