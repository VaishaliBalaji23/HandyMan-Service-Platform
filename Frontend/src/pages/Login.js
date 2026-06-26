import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // Add animations and theme here

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      // redirect based on role
      if (res.data.role === "admin") {
        window.location.href = "/admin-dashboard";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <div className="auth-container" data-aos="fade-up">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
