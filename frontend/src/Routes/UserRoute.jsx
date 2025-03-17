import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../page/Home Page/Home";
import RegisterationPage from "../components/RegisterationPage";
import LoginPage from "../components/LoginPage";
import ServicePage from "../page/Service Section/ServicePage";
import CategoryPage from "../page/CategoryPage";
import ContactPage from "../page/Service Section/ContactPage";
import About from "../page/About";
import Forgot from "../components/Forgot";
import Profile from "../components/Profile";
import IdiaFrom from "../page/Service Section/IdiaFrom";
import RequirementForm from "../page/Service Section/RequirementForm";
import FullForm from "../page/Service Section/FullForm";
import ProtectedRoute from "./ProtectedRoute";
import NavigationBar from "../components/NavigationBar";
import Footer from "../page/Footer";

function UserRoute() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<RegisterationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgot/:token" element={<Forgot />} />

        {/* Profile protected */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute to="admin">
              <Profile />
            </ProtectedRoute>
          }
        />
        {/* idiaSubmit form route */}
        <Route
          path="/idiaSubmit"
          element={
            <ProtectedRoute to="admin">
              <IdiaFrom />
            </ProtectedRoute>
          }
        />
        {/* requirementForm form route */}

        <Route
          path="/requirementForm"
          element={
            <ProtectedRoute to="admin">
              <RequirementForm />
            </ProtectedRoute>
          }
        />
        {/* fullform form route */}

        <Route
          path="/fullform"
          element={
            <ProtectedRoute to="admin">
              <FullForm />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default UserRoute;
