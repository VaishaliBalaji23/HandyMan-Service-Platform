// server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"; // ✅ <-- Add this line
import db from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import cookieParser from "cookie-parser";
import { sendMail } from "./emailService.js";

dotenv.config();
const app = express();


app.get("/test-email", async (req, res) => {
  try {
    await sendMail(
      "handymanservices380@gmail.com",
      "Test Email",
      "Hello! This is a test email from your Handyman app."
    );
    res.send("✅ Test email sent!");
  } catch (error) {
    res.status(500).send("❌ Failed to send email: " + error.message);
  }
});

app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true, // ⬅️ required for cookies
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Fix: path imported above
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(express.json());
app.use(cookieParser());

// ✅ Check DB connection
db.getConnection((err, connection) => {
  if (err) console.error("❌ Database connection failed:", err);
  else {
    console.log("✅ MySQL connected successfully (verified in server.js)");
    connection.release();
  }
});

// ✅ Routes
app.use("/api", userRoutes);
app.use("/api", bookingRoutes);
app.use("/api", feedbackRoutes);
app.use("/api", authRoutes);
app.use("/api", serviceRoutes);

// ✅ Default route
app.get("/", (req, res) => res.send("Welcome to Handyman API"));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌐 Server running at http://localhost:${PORT}`));
