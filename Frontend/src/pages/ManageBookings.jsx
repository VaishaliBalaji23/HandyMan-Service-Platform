import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";
import "../styles/PageStyles.css";
import { getAllBookings } from "../api/api"; // ✅ Import API function

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllBookings()
      .then((data) => setBookings(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <img src={logo} alt="Logo" className="page-logo" />
          <h1 className="page-title">Manage Bookings</h1>
          <p className="page-subtitle">Track and update customer bookings.</p>
        </div>

        <div className="table-container">
          {error && <p className="error-message">❌ {error}</p>}

          {bookings.length === 0 && !error ? (
            <p className="empty-message">No bookings found.</p>
          ) : (
            <table className="user-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Service Type</th>
                  <th>Booking Date</th>
                  <th>Booking Time</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.name}</td>
                    <td>{b.email}</td>
                    <td>{b.service_type}</td>
                    <td>{b.booking_date}</td>
                    <td>{b.booking_time}</td>
                    <td>{new Date(b.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManageBookings;
