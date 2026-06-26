import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";
import "../styles/PageStyles.css";
import { getAllUsers } from "../api/api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllUsers()
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <img src={logo} alt="Logo" className="page-logo" />
          <h1 className="page-title">Manage Users</h1>
          <p className="page-subtitle">View, edit, and assign roles to users.</p>
        </div>

        <div className="table-container">
          {error && <p className="error-message">❌ {error}</p>}
          {users.length === 0 && !error ? (
            <p className="empty-message">No users found.</p>
          ) : (
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{`${u.first_name} ${u.last_name}`}</td>
                    <td>{u.email}</td>
                    <td>{u.phone_number || "—"}</td>
                    <td>{u.role}</td>
                    <td>{new Date(u.created_at).toLocaleString()}</td>
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

export default ManageUsers;
