import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollOrRedirect = (e, id) => {
    e.preventDefault();

    // If we are already on home page → just scroll
    if (location.pathname === "/") {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Else, redirect to home and scroll after navigation
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>

        <li>
          <a href="#about" onClick={(e) => handleScrollOrRedirect(e, "about")}>
            About
          </a>
        </li>

        <li>
          <a href="#services" onClick={(e) => handleScrollOrRedirect(e, "services")}>
            Services
          </a>
        </li>

        <li><Link to="/gallery">Gallery</Link></li>

        <li>
          <a href="#footer" onClick={(e) => handleScrollOrRedirect(e, "footer")}>
            Contact
          </a>
        </li>

        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
