import React, { useState } from "react";
import "./Register.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../api/api.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[0-9]{10,15}$/;

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    role: "user",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [fieldErrs, setFieldErrs] = useState({});

  const handleChange = (e) => {
    setErrMsg("");
    setFieldErrs({});
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validateLocal = () => {
    const errs = {};
    if (!form.first_name.trim()) errs.first_name = "First name is required";
    if (!form.last_name.trim()) errs.last_name = "Last name is required";
    if (!form.email.trim() || !emailRegex.test(form.email))
      errs.email = "Enter a valid email";
    if (!form.phone_number.trim() || !phoneRegex.test(form.phone_number))
      errs.phone_number = "Enter a valid phone number (e.g. +911234567890)";
    if (!form.password) errs.password = "Password is required";
    setFieldErrs(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setFieldErrs({});
    if (!validateLocal()) return;

    setLoading(true);
    try {
      const response = await registerRequest({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim().toLowerCase(),
        phone_number: form.phone_number.trim(),
        role: form.role,
        password: String(form.password),
      });

      if (response?.token) {
        localStorage.setItem("access_token", response.token);
        localStorage.setItem("auth_user", JSON.stringify(response.user || {}));
      }

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      if (err?.errors && Array.isArray(err.errors)) {
        const fe = {};
        err.errors.forEach((e) => {
          if (e?.field && e?.message) fe[e.field] = e.message;
        });
        setFieldErrs(fe);
      }
      setErrMsg(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <img src={logo} alt="Logo" className="register-logo" />
      <div className="register-container">
        <h2>Register</h2>

        {errMsg && <div className="error-banner">{errMsg}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleChange}
              required
            />
            {fieldErrs.first_name && (
              <small className="field-error">{fieldErrs.first_name}</small>
            )}
          </div>

          <div className="input-group">
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
              required
            />
            {fieldErrs.last_name && (
              <small className="field-error">{fieldErrs.last_name}</small>
            )}
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={form.email}
              onChange={handleChange}
              required
            />
            {fieldErrs.email && (
              <small className="field-error">{fieldErrs.email}</small>
            )}
          </div>

          <div className="input-group">
            <input
              type="tel"
              name="phone_number"
              placeholder="Phone Number (+911234567890)"
              value={form.phone_number}
              onChange={handleChange}
              required
            />
            {fieldErrs.phone_number && (
              <small className="field-error">{fieldErrs.phone_number}</small>
            )}
          </div>

          <div className="input-group">
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            {fieldErrs.password && (
              <small className="field-error">{fieldErrs.password}</small>
            )}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="login-redirect">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
