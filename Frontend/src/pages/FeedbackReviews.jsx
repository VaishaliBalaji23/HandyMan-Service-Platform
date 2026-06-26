import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";
import "../styles/PageStyles.css";
import { getAllFeedbacks } from "../api/api"; // ✅ import API

const FeedbackReviews = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllFeedbacks()
      .then((data) => setFeedbacks(data))
      .catch((err) => setError(err.message || "Failed to fetch feedback"));
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <img src={logo} alt="Logo" className="page-logo" />
          <h1 className="page-title">Feedback & Reviews</h1>
          <p className="page-subtitle">Monitor customer feedback and ratings.</p>
        </div>

        <div className="page-content service-grid">
          {error && <p className="error-message">❌ {error}</p>}
          {feedbacks.length === 0 && !error ? (
            <p className="empty-message">No feedback received yet.</p>
          ) : (
            feedbacks.map((f) => (
              <div key={f.id} className="service-card">
                <h3>{f.user_email}</h3>
                <p>"{f.comment}"</p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(f.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FeedbackReviews;
