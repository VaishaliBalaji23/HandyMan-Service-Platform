import React, { useState } from "react";
import { addFeedback } from "../api/api"; // ✅ use API function
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";
import "../styles/PageStyles.css";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addFeedback(feedback);
      alert("✅ Feedback submitted successfully!");
      setFeedback("");
    } catch (err) {
      console.error("❌ Error submitting feedback:", err);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <img src={logo} alt="Logo" className="page-logo" />
          <h1 className="page-title">Share Your Feedback</h1>
          <p className="page-subtitle">We appreciate your thoughts and suggestions!</p>
        </div>

        <form className="feedback-form" onSubmit={handleSubmit}>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback here..."
            rows="5"
            required
          />
          <button type="submit" className="submit-btn">Submit Feedback</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default FeedbackForm;
