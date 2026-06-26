import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";
import "../styles/PageStyles.css";

const TrackStatus = () => {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId") || 1;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/bookings/getUserBookings/${userId}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("❌ Error fetching bookings:", err));
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <img src={logo} alt="Logo" className="page-logo" />
          <h1 className="page-title">Track Service Status</h1>
          <p className="page-subtitle">
            Stay updated on the progress of your services.
          </p>
        </div>

        <div className="page-content">
          {bookings.length === 0 ? (
            <p className="empty-message">No active services to track.</p>
          ) : (
            bookings.map((b) => (
              <div key={b.id} className="booking-card">
                <p><strong>Service:</strong> {b.service_name}</p>
                <p><strong>Status:</strong> {b.status}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TrackStatus;
