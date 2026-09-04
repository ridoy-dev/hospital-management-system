import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Context } from "../Context/AppContext";
const Login = () => {
  const { isAuthenticated, setIsAuthenticated,backendUrl} = useContext(Context);


    const [formData, setFormData] = useState(
      {
        email: "",
        password: "",
        confirmPassword: ""
      }
    );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({    
      ...prev,
      [name]: value
    }));
  };

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
           const {data}= await axios
        .post(
          backendUrl + "/api/user/login",
          { ...formData, role: "Patient" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
          toast.success(data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setFormData({
            email: "",
            password: "",
            confirmPassword: ""
          });
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container form-component login-form">
        <h2>Sign In</h2>
        <p>Please Login To Continue</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
          voluptas expedita itaque ex, totam ad quod error?
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Enter Your Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Not Registered?</p>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Register Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;