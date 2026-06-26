import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";
import "../styles/PageStyles.css";

const API = process.env.REACT_APP_API_URL || ""; // e.g. http://localhost:5000/api

const ProfileSettings = () => {
  const [profile, setProfile] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userId = localStorage.getItem("userId") || 1;

    const run = async () => {
      try {
        if (token) {
          const res = await axios.get(`${API}/me`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          setProfile(res.data?.profile || null);
          return;
        }

        // Fallback
        const res = await axios.get(`${API}/users/getUser/${userId}`);
        setProfile(res.data || null);
      } catch (e) {
        const msg = e?.response?.data?.message || e?.message || "Failed to load profile";
        setErr(msg);
      }
    };

    run();
  }, []);

  const fullName =
    (profile?.first_name || "") +
    (profile?.first_name && profile?.last_name ? " " : "") +
    (profile?.last_name || "");

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <img src={logo} alt="Logo" className="page-logo" />
          <h1 className="page-title">Profile Settings</h1>
        </div>

        {err && <div className="error-banner">{err}</div>}

        <div className="profile-table-container">
          {profile ? (
            <table className="profile-table">
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{fullName || profile?.name || "—"}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{profile?.email || "—"}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{profile?.phone_number || profile?.phone || "—"}</td>
                </tr>
                <tr>
                  <th>Role</th>
                  <td>{profile?.role || "—"}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p className="empty-message">Loading profile...</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileSettings;
