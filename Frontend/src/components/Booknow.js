import React, { useState, useEffect } from "react";
import "./Booknow.css";
import { getAllServices } from "../api/api"; // ✅ Import from your api.js

const BookNow = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    date: "",
    time: "",
    serviceType: "",
    issue: ""
  });

  const [services, setServices] = useState([]); // ✅ store fetched services
  const [loading, setLoading] = useState(true);

  // ✅ Fetch services when page loads
  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await getAllServices();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/addBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Your booking has been submitted successfully!");
        console.log("Booking Response:", data);

        setFormData({
          name: "",
          email: "",
          address: "",
          phone: "",
          date: "",
          time: "",
          serviceType: "",
          issue: ""
        });
      } else {
        alert(data.message || "Failed to submit booking");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("There was an error submitting your booking. Please try again later.");
    }
  };

  return (
    <div className="booknow-page">
      <div className="book-now-container">
        <h2>Book Your Appointment</h2>
        <form onSubmit={handleSubmit} className="booking-form">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />

          <label>Phone Number:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

          <label>Preferred Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />

          <label>Preferred Time:</label>
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />

          <label>Service Type:</label>
          {loading ? (
            <p>Loading services...</p>
          ) : (
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a Service --</option>
              {services.map((service) => (
                <option key={service.id} value={service.service_name}>
                  {service.service_name}
                </option>
              ))}
            </select>
          )}

          <label>Issue to be Fixed:</label>
          <textarea name="issue" value={formData.issue} onChange={handleChange} required></textarea>

          <button type="submit">Submit Booking</button>
        </form>
      </div>
    </div>
  );
};

export default BookNow;
