import React, { useEffect, useState } from "react";
import { getUserBookings } from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";
import "../styles/PageStyles.css";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await getUserBookings();
        setBookings(data);
      } catch (err) {
        console.error("❌ Error fetching booking history:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <img src={logo} alt="Logo" className="page-logo" />
          <h1 className="page-title">Your Booking History</h1>
          <p className="page-subtitle">
            Review all your past service bookings below.
          </p>
        </div>

        <div className="history-table-container">
          {loading ? (
            <p>Loading your bookings...</p>
          ) : bookings.length === 0 ? (
            <p className="empty-message">You have no previous bookings.</p>
          ) : (
            <table className="history-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.service_type}</td>
                    <td>{b.booking_date}</td>
                    <td>{b.booking_time}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          b.status?.toLowerCase() || "confirmed"
                        }`}
                      >
                        {b.status || "Confirmed"}
                      </span>
                    </td>
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

export default BookingHistory;
