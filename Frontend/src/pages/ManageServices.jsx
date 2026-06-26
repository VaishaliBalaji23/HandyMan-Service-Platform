import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";
import "../styles/PageStyles.css";
import { getAllServices } from "../api/api"; // ✅ Your API function

const API_BASE = "http://localhost:5000"; // ✅ Your backend URL

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    service_name: "",
    description: "",
    profile_picture: "",
  });

  // ✅ Fetch all services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllServices();
        setServices(data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Unable to load services at this time.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // ✅ Handle edit click
  const handleEdit = (service) => {
    setSelectedService(service);
    setFormData({
      service_name: service.service_name,
      description: service.description,
      profile_picture: service.profile_picture || "",
    });
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle save (demo purpose only)
  const handleSave = () => {
    alert(`✅ Updated service:
Name: ${formData.service_name}
Description: ${formData.description}
Profile Picture: ${formData.profile_picture}`);
    setSelectedService(null);
  };

  const handleClose = () => {
    setSelectedService(null);
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <img src={logo} alt="Logo" className="page-logo" />
          <h1 className="page-title">Manage Services</h1>
          <p className="page-subtitle">
            View, edit, and update services offered to customers.
          </p>
        </div>

        <div className="page-content">
          {loading ? (
            <p className="loading-text">Loading services...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : services.length === 0 ? (
            <p className="empty-message">No services available right now.</p>
          ) : (
            <div className="service-grid">
              {services.map((s) => (
                <div key={s._id} className="service-card">
                  <img
                    src={
                      s.profile_picture
                        ? `${API_BASE}${
                            s.profile_picture.startsWith("/")
                              ? s.profile_picture
                              : "/" + s.profile_picture
                          }`
                        : "/images/default.png"
                    }
                    alt={s.service_name}
                    className="service-image"
                    onError={(e) => (e.target.src = "/images/default.png")}
                  />
                  <h3 className="service-title">{s.service_name}</h3>
                  <p className="service-desc">{s.description}</p>

                  <button
                    className="book-btn"
                    onClick={() => handleEdit(s)}
                  >
                    Edit Service
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ✅ Modal Dialog Box */}
        {selectedService && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalBox}>
              <h2 style={styles.modalTitle}>Edit Service</h2>

              <label style={styles.label}>Service Name</label>
              <input
                type="text"
                name="service_name"
                value={formData.service_name}
                onChange={handleChange}
                style={styles.input}
              />

              <label style={styles.label}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={{ ...styles.input, height: "80px", resize: "none" }}
              />

              <label style={styles.label}>Profile Picture URL</label>
              <input
                type="text"
                name="profile_picture"
                value={formData.profile_picture}
                onChange={handleChange}
                style={styles.input}
              />

              <div style={styles.btnRow}>
                <button style={styles.saveBtn} onClick={handleSave}>
                  Save Changes
                </button>
                <button style={styles.cancelBtn} onClick={handleClose}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

// ✅ Inline Styles for the Modal
const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: "25px 30px",
    borderRadius: "12px",
    width: "400px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.3s ease-in-out",
  },
  modalTitle: {
    textAlign: "center",
    marginBottom: "15px",
    fontSize: "22px",
    color: "#333",
  },
  label: {
    fontWeight: "600",
    fontSize: "14px",
    color: "#555",
    marginBottom: "5px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
  },
  btnRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  saveBtn: {
    backgroundColor: "#2d89ef",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
  cancelBtn: {
    backgroundColor: "#ddd",
    color: "#333",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default ManageServices;
