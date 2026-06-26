// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findAuthByEmail, findUserByEmail } from "../model/authModel.js";

const sanitize = (s = "") => String(s ?? "").trim();
const isEmail = (s = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export const loginUser = async (req, res) => {
  try {
    const email = sanitize(req.body?.email).toLowerCase();
    const password = String(req.body?.password ?? "");

    const errors = [];
    if (!email || !isEmail(email)) errors.push({ field: "email", message: "Valid email is required" });
    if (!password) errors.push({ field: "password", message: "Password is required" });
    if (errors.length) return res.status(400).json({ message: "Validation failed", errors });

    // 1) Fetch auth record
    const auth = await findAuthByEmail(email);
    if (!auth) return res.status(401).json({ message: "Invalid email or password" });

    // 2) Compare password
    const ok = await bcrypt.compare(password, auth.password);
    if (!ok) return res.status(401).json({ message: "Invalid email or password" });

    // 3) Optional user profile/role
    const user = await findUserByEmail(email);
    const payload = {
      sub: auth.id,                 // subject (user id)
      email,
      role: user?.role ?? "user",
      first_name: user?.first_name ?? null,
      last_name: user?.last_name ?? null,
    };

    // 4) Create JWT
   const token = jwt.sign(
  { sub: payload.sub, email: payload.email, role: payload.role },
  process.env.JWT_SECRET || "Dev_Token",
  { expiresIn: process.env.JWT_EXPIRES || "7d" }
);


    // 5) Respond with token + lightweight user info
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        email: payload.email,
        role: payload.role,
        first_name: payload.first_name,
        last_name: payload.last_name,
      }
    });
  } catch (err) {
    console.error("[loginUser] error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
