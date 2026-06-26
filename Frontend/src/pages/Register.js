import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "", role: "customer" });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", user);
      alert("Registered successfully!");
      window.location.href = "/login";
    } catch (err) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="auth-container" data-aos="fade-up">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" value={user.name} placeholder="Name" onChange={(e) => setUser({ ...user, name: e.target.value })} required />
        <input type="email" value={user.email} placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} required />
        <input type="password" value={user.password} placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} required />
        <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
