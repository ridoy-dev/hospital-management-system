import React, { useContext, useEffect } from "react";
import "./App.css";
import { Routes, Route ,useLocation} from "react-router-dom";
import Home from "./page/Home";
import AboutUs from "./page/AboutUs";
import Register from "./page/Register";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import OpdSchedule from "./page/OpdSchedule";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Login from "./page/Login";
import { Context } from "./Context/AppContext";
import Doctors from "./page/Doctors";
import DoctorProfile from "./page/DoctorProfile";
import BookAppointment from "./page/BookAppointment";
import MyAppointment from "./page/MyAppointment";
const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, backendUrl } =
    useContext(Context);
    
  const { pathname } = useLocation();

        useEffect(() => {
          window.scrollTo(0, 0);
        }, [pathname]);
    
 const fetchUser = async () => {
      try {
        const response = await axios.get(
          backendUrl + "/api/user/patient/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };

  useEffect(() => {
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/my-appointment" element={<MyAppointment />} />

          <Route path="/doctors/:doctorId" element={<DoctorProfile />} />
           <Route path="/appointment/:doctorId" element={<BookAppointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/opd-schedule" element={<OpdSchedule />} />

        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
    </>
  );
};

export default App;