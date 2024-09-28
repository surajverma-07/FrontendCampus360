import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AllPost from "./pages/AllPost";
import MyPost from "./pages/MyPost";
import AllEvents from "./pages/AllEvent";
import MyEvent from "./pages/MyEvent";
import AllCareers from "./pages/AllCareers";
import MyCareers from "./pages/MyCareers";

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/signup" element={<SignUpPage />} exact />
        <Route path="/login" element={<LoginPage />} exact />
        <Route path="/allpost" element={<AllPost />} exact />
        <Route path="/mypost" element={<MyPost />} exact />
        <Route path="/allevent" element={<AllEvents />} exact />
        <Route path="/myevent" element={<MyEvent />} exact />
        <Route path="/allcareer" element={<AllCareers />} exact />
        <Route path="/mycareer" element={<MyCareers />} exact />
      </Routes>
    </>
  );
}

export default App;
