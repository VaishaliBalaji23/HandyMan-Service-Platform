import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import logo from "../assets/logo.png";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <div className="admin-header">
        <img src={logo} alt="Logo" className="admin-logo" />
        <h1 className="admin-title">Welcome to Admin Dashboard</h1>
        <p className="admin-subtitle">
          Manage users, services, bookings, and customer feedback efficiently.
        </p>
      </div>

      {/* Dashboard Cards Section */}
      <div className="admin-wrapper">
        <div className="admin-cards">

          {/* Manage Users */}
          <Link to="/admin/users" className="admin-card">
            <span className="icon">🛠️</span>
            <h3>Manage Users</h3>
            <p>View, edit, and assign roles to users</p>
          </Link>

          {/* Manage Services */}
          <Link to="/admin/services" className="admin-card">
            <span className="icon">📋</span>
            <h3>Manage Services</h3>
            <p>View and update services offered</p>
          </Link>

          {/* Manage Bookings */}
          <Link to="/admin/bookings" className="admin-card">
            <span className="icon">📅</span>
            <h3>Manage Bookings</h3>
            <p>Track and update customer bookings</p>
          </Link>

          {/* Feedback & Reviews */}
          <Link to="/admin/feedback" className="admin-card">
            <span className="icon">⭐</span>
            <h3>Feedback & Reviews</h3>
            <p>Monitor customer feedback and ratings</p>
          </Link>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default AdminDashboard;
