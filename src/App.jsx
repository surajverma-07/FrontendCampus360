import React, { useEffect, Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { userState } from "./context/UserContext";
import Navbar from "./components/Navbar.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Lazy-loaded pages for better performance  
const Home = React.lazy(() => import("./pages/Home.jsx"));
const LoginPage = React.lazy(() => import("./pages/LoginPage.jsx"));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage.jsx"));
const AllPost = React.lazy(() => import("./pages/AllPost.jsx"));
const MyPost = React.lazy(() => import("./pages/MyPost.jsx"));
const AddPost = React.lazy(() => import("./pages/AddPost.jsx"));
const AllEvents = React.lazy(() => import("./pages/AllEvent.jsx"));
const MyEvent = React.lazy(() => import("./pages/MyEvent.jsx"));
const AddEvent = React.lazy(() => import("./pages/AddEvent.jsx"));
const AllCareers = React.lazy(() => import("./pages/AllCareers.jsx"));
const MyCareers = React.lazy(() => import("./pages/MyCareers.jsx"));
const AddCareer = React.lazy(() => import("./pages/AddCareer.jsx"));
const AllProducts = React.lazy(() => import("./pages/AllProducts.jsx"));
const MyProducts = React.lazy(() => import("./pages/MyProducts.jsx"));
const AddProducts = React.lazy(() => import("./pages/AddProducts.jsx"));
const Profile = React.lazy(() => import("./pages/UserProfile.jsx"));
const AdminPanel = React.lazy(() => import("./pages/AdminPanel.jsx"));

function App() {
  const navigate = useNavigate();
  const { isAuthorized, userData } = userState();

  useEffect(() => {
    // Redirect to login if the user is not authorized
    if (isAuthorized === false) {
      console.log("User not authorized, redirecting to login");
      navigate("/login");
    }
  }, [isAuthorized]);

  const isAdmin = userData?.role === "admin"; // Example check for admin role
   console.log("isAuthorized: ", isAuthorized);
  return (
    <>
      {/* Navbar visible on all pages */}
      {/* <Navbar /> */}

      {/* Suspense for lazy-loaded components */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} exact />
          <Route path="/signup" element={<SignUpPage />} exact />
          <Route path="/login" element={<LoginPage />} exact />

          {/* Protected Routes */}
          {isAuthorized && (
            <>
              {/* Post Routes */}
              <Route path="post/all-posts" element={<AllPost />} exact />
              <Route path="post/my-posts" element={<MyPost />} exact />
              <Route path="post/add-post" element={<AddPost />} exact />

              {/* Event Routes */}
              <Route path="event/all-events" element={<AllEvents />} exact />
              <Route path="event/my-events" element={<MyEvent />} exact />
              <Route path="event/add-event" element={<AddEvent />} exact />

              {/* Career Routes */}
              <Route path="career/all-careers" element={<AllCareers />} exact />
              <Route path="career/my-careers" element={<MyCareers />} exact />
              <Route path="career/add-career" element={<AddCareer />} exact />

              {/* Product Routes */}
              <Route path="product/all-products" element={<AllProducts />} exact />
              <Route path="product/my-products" element={<MyProducts />} exact />
              <Route path="product/add-product" element={<AddProducts />} exact />
               
              {/* Profile */}
              <Route path="/profile" element={<Profile />} exact />

              {/* Admin-only Route */}
              {isAdmin && <Route path="/admin-panel" element={<AdminPanel />} exact />}
            </>
          )}

          {/* Fallback route for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;