// routes/bookingRoutes.js
import express from "express";
import {
  addBooking,
  getBookings,
  getBooking,
  getUserBookings,
  editBooking,
  removeBooking
} from "../controller/bookingController.js";
import { authRequired } from "../utils/jwtUtils.js";

const router = express.Router();

// Public routes
router.post("/addBooking", addBooking);
router.get("/getBookings", getBookings);
router.get("/getBooking/:id", getBooking);

// Protected route - get user bookings by email from token
router.get("/getUserBookings", authRequired, getUserBookings);

// Update and delete (admin or user)
router.put("/editBooking/:id", editBooking);
router.delete("/deleteBooking/:id", removeBooking);

export default router;
