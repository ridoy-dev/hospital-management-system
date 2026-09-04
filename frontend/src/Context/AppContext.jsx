import React, {
  createContext,
  useState,
  useEffect,
} from "react";

import axios from "axios";

export const Context = createContext({
  isAuthenticated: false,
});

export const AppContextProvider = (props) => {

  // =========================
  // AUTHENTICATION
  // =========================

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const [user, setUser] = useState({});


  // =========================
  // BACKEND URL
  // =========================

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL;


  // =========================
  // DOCTORS
  // =========================

  const [doctors, setDoctors] = useState([]);


  // =========================
  // GET ALL DOCTORS
  // =========================

  const fetchDoctors = async () => {
    try {

      const { data } = await axios.get(
        `${backendUrl}/api/doctor/get-all`
      );

      setDoctors(data.doctors);

    } catch (error) {

      console.log(
        "Failed to fetch doctors:",
        error.response?.data?.message ||
          error.message
      );

    }
  };


  // =========================
  // FETCH DOCTORS WHEN APP LOADS
  // =========================

  useEffect(() => {
    fetchDoctors();
  }, []);


  // =========================
  // CONTEXT VALUE
  // =========================

  const value = {
    isAuthenticated,
    setIsAuthenticated,

    user,
    setUser,

    backendUrl,

    doctors,
    setDoctors,

    fetchDoctors,
  };


  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};