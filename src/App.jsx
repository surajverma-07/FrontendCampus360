import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AllPost from "./pages/AllPost";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<LoginPage />} exact />
        <Route path="/signup" element={<SignUpPage />} exact />
        <Route path="/allpost" element={<AllPost />} exact />
      </Routes>
    </>
  );
}

export default App;
