import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import logo from '../assets/logo.png'; 
import './CustomerDashboard.css';
import Footer from './Footer';

function CustomerDashboard() {
  return (
    <>
      <div className="dashboard-header">
        <img src={logo} alt="Logo" className="dashboard-logo" />
        <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
        <p className="dashboard-subtitle">
          Manage your bookings, track services, and keep your profile updated.
        </p>
      </div>

      <Navbar />

      <div className="dashboard-wrapper">
        <div className="dashboard-cards">

          <Link to="/user/view-services" className="dashboard-card">
            <span className="icon">📅</span>
            <h3>View & Book Services</h3>
          </Link>

          <Link to="/user/profile-settings" className="dashboard-card">
            <span className="icon">👤</span>
            <h3>Profile & Settings</h3>
          </Link>

          <Link to="/user/booking-history" className="dashboard-card">
            <span className="icon">📖</span>
            <h3>Booking History</h3>
          </Link>

          <Link to="/user/give-feedback" className="dashboard-card">
            <span className="icon">📝</span>
            <h3>Give Feedback</h3>
          </Link>

        </div>
      </div>
      <Footer/>
    </>
  );
}

export default CustomerDashboard;
