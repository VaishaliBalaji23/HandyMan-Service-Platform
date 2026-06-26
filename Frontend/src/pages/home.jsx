import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Home.css";

function Home() {
  const location = useLocation();

  useEffect(() => {
    // If user navigated from Navbar with scroll target
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      const section = document.getElementById(id);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 400); // slight delay so DOM is ready
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />

      {/* Example Home Sections */}
      <section id="about" style={{ minHeight: "100vh", padding: "60px" }}>
        <h1>About Us</h1>
        <p>Some info about Handyman Construction...</p>
      </section>

      <section id="services" style={{ minHeight: "100vh", padding: "60px" }}>
        <h1>Our Services</h1>
        <p>Details of all the services...</p>
      </section>

      <Footer />
    </>
  );
}

export default Home;
