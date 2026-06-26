import React, { useState } from "react";
import "./Login.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api/api.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [fieldErrs, setFieldErrs] = useState({}); // { email: "...", password: "..." }

  const handleChange = (e) => {
    setErrMsg("");
    setFieldErrs({});
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validateLocal = () => {
    const errs = {};
    const email = form.email.trim().toLowerCase();
    if (!email || !emailRegex.test(email)) errs.email = "Enter a valid email";
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
      // Expecting { token, user } from backend
      const { token, user } = await loginRequest({
        email: form.email.trim().toLowerCase(),
        password: String(form.password),
      });

      // Persist token + user for later use (Profile page will use the token)
      if (token) localStorage.setItem("access_token", token);
      localStorage.setItem("auth_user", JSON.stringify(user || {}));

      // If backend returns an id, keep it (not strictly required when using /users/me)
      const uid = user?.id ?? user?.user_id ?? user?.auth_id ?? null;
      if (uid) localStorage.setItem("userId", String(uid));

      // ⬇️ keep your original redirect behavior
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      // Surface server validations (400) if provided
      if (err?.errors && Array.isArray(err.errors)) {
        const fe = {};
        err.errors.forEach((e) => {
          if (e?.field && e?.message) fe[e.field] = e.message;
        });
        setFieldErrs(fe);
      }

      // Generic / fallback message
      setErrMsg(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <img src={logo} alt="Logo" className="login-logo" />
      <div className="login-container">
        <h2>Login</h2>

        {errMsg && <div className="error-banner">{errMsg}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={form.email}
              onChange={handleChange}
              autoComplete="username"
              required
            />
            {fieldErrs.email && <small className="field-error">{fieldErrs.email}</small>}
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
            {fieldErrs.password && <small className="field-error">{fieldErrs.password}</small>}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
