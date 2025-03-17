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
import About from "./page/About";
import Forgot from "./components/Forgot";
import { useContext } from "react";
import { MyContext } from "./Context/context";
import UserRoute from "./Routes/UserRoute";
function App() {
  return (
    <>
      <Router>
        {/* {User.admin === true ? "" : <NavigationBar />} */}
        <Routes>
          {/* User Routes */}
          <Route path="/*" element={<UserRoute />} />

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
      </Router>
    </>
  );
}

export default App;
