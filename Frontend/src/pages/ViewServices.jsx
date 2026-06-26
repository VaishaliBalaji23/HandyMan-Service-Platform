import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";
import "../styles/PageStyles.css";
import { getAllServices } from "../api/api"; // ✅ Import API function

const API_BASE = "http://localhost:5000"; // ✅ your backend URL

const ViewServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch all services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllServices();
        setServices(data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setError("Unable to load services at this time.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // ✅ Navigate to booking
  const handleBook = (serviceName) => {
    navigate("/booknow", { state: { serviceName } });
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <img src={logo} alt="Logo" className="page-logo" />
          <h1 className="page-title">Our Services</h1>
          <p className="page-subtitle">
            Explore our wide range of professional handyman and construction services.
          </p>
        </div>

        <div className="page-content">
          {loading ? (
            <p className="loading-text">Loading services...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : (
            <div className="service-grid">
              {services.map((service, index) => (
                <div key={index} className="service-card">
                  <img
                    src={
                      service.profile_picture
                        ? `${API_BASE}${service.profile_picture}`
                        : "/images/default.png"
                    }
                    alt={service.service_name}
                    className="service-image"
                    onError={(e) => (e.target.src = "/images/default.png")}
                  />
                  <h3 className="service-title">{service.service_name}</h3>
                  <p className="service-desc">{service.description}</p>
                  <button
                    className="book-btn"
                    onClick={() => handleBook(service.service_name)}
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewServices;
