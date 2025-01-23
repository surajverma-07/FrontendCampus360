import React, { Suspense } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { userState } from "./context/UserContext"
import Navbar from "./components/Navbar.jsx"
import NotFoundPage from "./pages/NotFoundPage.jsx"

// Lazy-loaded pages for better performance
const Home = React.lazy(() => import("./pages/Home.jsx"))
const LoginPage = React.lazy(() => import("./pages/LoginPage.jsx"))
const SignUpPage = React.lazy(() => import("./pages/SignUpPage.jsx"))
const AllPost = React.lazy(() => import("./pages/AllPost.jsx"))
const MyPost = React.lazy(() => import("./pages/MyPost.jsx"))
const AddPost = React.lazy(() => import("./pages/AddPost.jsx"))
const AllEvents = React.lazy(() => import("./pages/AllEvent.jsx"))
const MyEvent = React.lazy(() => import("./pages/MyEvent.jsx"))
const AddEvent = React.lazy(() => import("./pages/AddEvent.jsx"))
const AllCareers = React.lazy(() => import("./pages/AllCareers.jsx"))
const MyCareers = React.lazy(() => import("./pages/MyCareers.jsx"))
const AddCareer = React.lazy(() => import("./pages/AddCareer.jsx"))
const AllProducts = React.lazy(() => import("./pages/AllProducts.jsx"))
const MyProducts = React.lazy(() => import("./pages/MyProducts.jsx"))
const AddProducts = React.lazy(() => import("./pages/AddProducts.jsx"))
const Profile = React.lazy(() => import("./pages/UserProfile.jsx"))
const AdminPanel = React.lazy(() => import("./pages/AdminPanel.jsx"))
const Chat = React.lazy(() => import("./pages/ChatPage.jsx"))

function App() {
  const { isAuthorized, isAdmin, isLoading } = userState()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route path="user/chat" element={isAuthorized ? <Chat /> : <Navigate to="/login" />} />
          <Route path="post/all-posts" element={isAuthorized ? <AllPost /> : <Navigate to="/login" />} />
          <Route path="post/my-posts" element={isAuthorized ? <MyPost /> : <Navigate to="/login" />} />
          <Route path="post/add-post" element={isAuthorized ? <AddPost /> : <Navigate to="/login" />} />
          <Route path="event/all-events" element={isAuthorized ? <AllEvents /> : <Navigate to="/login" />} />
          <Route path="event/my-events" element={isAuthorized ? <MyEvent /> : <Navigate to="/login" />} />
          <Route path="event/add-event" element={isAuthorized ? <AddEvent /> : <Navigate to="/login" />} />
          <Route path="career/all-careers" element={isAuthorized ? <AllCareers /> : <Navigate to="/login" />} />
          <Route path="career/my-careers" element={isAuthorized ? <MyCareers /> : <Navigate to="/login" />} />
          <Route path="career/add-career" element={isAuthorized ? <AddCareer /> : <Navigate to="/login" />} />
          <Route path="product/all-products" element={isAuthorized ? <AllProducts /> : <Navigate to="/login" />} />
          <Route path="product/my-products" element={isAuthorized ? <MyProducts /> : <Navigate to="/login" />} />
          <Route path="product/add-product" element={isAuthorized ? <AddProducts /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthorized ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/adminpanel" element={isAuthorized && isAdmin ? <AdminPanel /> : <Navigate to="/" />} />

          {/* Fallback route for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App

