import "./App.css";
import RegisterationPage from "./components/RegisterationPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import IdiaFrom from "./page/Service Section/IdiaFrom";
import ServicePage from "./page/Service Section/ServicePage";
import RequirementForm from "./page/Service Section/RequirementForm";
import FullForm from "./page/Service Section/FullForm";
import Home from "./page/Home Page/Home";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { AdminProvider } from "./Context/AdminContex";
import AdminRoute from "./Routes/AdminRoute";
import LoginPage from "./components/LoginPage";
import CategoryPage from "./page/CategoryPage";
import NavigationBar from "./components/NavigationBar";
import Footer from "./page/Footer";
import ContactPage from "./page/Service Section/ContactPage";
import Profile from "./components/Profile";
function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<RegisterationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<Profile />} />

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

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <AdminProvider>
                <AdminRoute />
              </AdminProvider>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
