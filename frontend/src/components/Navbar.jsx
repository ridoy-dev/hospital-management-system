import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../Context/AppContext";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const {
    isAuthenticated,
    setIsAuthenticated,
    backendUrl,
  } = useContext(Context);

  const navigateTo = useNavigate();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setShow(false);
  };

  // Login
  const goToLogin = () => {
    setShow(false);
    navigateTo("/login");
  };

  // Logout
  const handleLogout = async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/user/patient/logout`,
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message);
      setIsAuthenticated(false);
      setShow(false);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Logout failed"
      );
    }
  };

  return (
    <nav className={`nav container ${scrolled ? "navbar-scrolled" : ""}`}>
      {/* Logo */}
      <div
        className="logo"
        onClick={() => navigateTo("/")}
      >
        <img
          src="/ABC_logo.png"
          alt="ABC Medical Logo"
          className="logo-img"
        />
      </div>

      {/* Navigation Links */}
      <div className={`navLinks ${show ? "showmenu" : ""}`}>
        <div className="links">
          <Link to="/" onClick={handleLinkClick}>
            Home
          </Link>

          <Link to="/doctors" onClick={handleLinkClick}>
            All Doctors
          </Link>

          <Link to="/opd-schedule" onClick={handleLinkClick}>
            Doctors Schedule
          </Link>

          <Link to="/my-appointment" onClick={handleLinkClick}>
            My Appointment
          </Link>

          <Link to="/about" onClick={handleLinkClick}>
            About Us
          </Link>
        </div>

        {/* Login / Logout */}
        {isAuthenticated ? (
          <button
            className="logoutBtn btn"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        ) : (
          <button
            className="loginBtn btn"
            onClick={goToLogin}
          >
            LOGIN
          </button>
        )}
      </div>

      {/* Hamburger */}
      <button
        className="hamburger"
        onClick={() => setShow((prev) => !prev)}
        aria-label="Toggle navigation menu"
      >
        <GiHamburgerMenu />
      </button>
    </nav>
  );
};

export default Navbar;