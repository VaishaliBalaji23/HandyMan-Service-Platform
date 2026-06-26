// controller/bookingController.js
import {
  createBooking as createBookingModel, // ✅ renamed to avoid conflict
  getAllBookings,
  getBookingById,
  getBookingsByEmail,
  updateBooking,
  deleteBooking
} from "../model/bookingModel.js";
import emailjs from "@emailjs/nodejs";

/* =========================================================
   CREATE BOOKING (with Email Notification)
========================================================= */
export const addBooking = async (req, res) => {
  try {
    const { name, email, address, phone, date, time, serviceType, issue } = req.body;

    // ✅ Validate required fields
    if (!name || !email || !address || !phone || !date || !time || !serviceType || !issue) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Prepare booking data for DB
    const bookingData = {
      name,
      email,
      address,
      phone,
      service_type: serviceType,
      issue,
      booking_date: date,
      booking_time: time
    };

    // ✅ Save booking in DB
    const bookingId = await createBookingModel(bookingData);

    // ✅ Try sending confirmation email to Admin
    try {
      await emailjs.send(
        "service_lrmza75", // ⚙️ your EmailJS service ID
        "template_bd1zeq5", // ⚙️ your EmailJS template ID
        {
          name,
          user_email: email,
          address,
          phone,
          date,
          time,
          serviceType,
          issue,
        },
        { publicKey: "K_HJO8bpLAnxpjLwy" } // ⚙️ your public API key
      );

      console.log("📧 Booking email sent successfully!");
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError.text || emailError.message);
      // Don’t crash the request if email fails
    }

    res.status(201).json({
      message: "Booking created successfully",
      id: bookingId,
    });

  } catch (error) {
    console.error("❌ Error creating booking:", error);
    res.status(500).json({ message: "Error creating booking" });
  }
};

/* =========================================================
   GET ALL BOOKINGS (Admin)
========================================================= */
export const getBookings = async (req, res) => {
  try {
    const bookings = await getAllBookings();
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error getting bookings:", err);
    res.status(500).json({ error: err.message });
  }
};

/* =========================================================
   GET BOOKING BY ID
========================================================= */
export const getBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await getBookingById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (err) {
    console.error("Error getting booking:", err);
    res.status(500).json({ error: err.message });
  }
};

/* =========================================================
   GET BOOKINGS BY USER EMAIL (JWT)
========================================================= */
export const getUserBookings = async (req, res) => {
  try {
    const email = req.user?.email;
    if (!email) return res.status(401).json({ message: "Unauthorized - email missing in token" });

    const bookings = await getBookingsByEmail(email);
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error getting user bookings:", err);
    res.status(500).json({ error: err.message });
  }
};

/* =========================================================
   UPDATE BOOKING
========================================================= */
export const editBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, address, phone, service_type, issue, booking_date, booking_time } = req.body;

    const updated = await updateBooking(id, {
      name,
      email,
      address,
      phone,
      service_type,
      issue,
      booking_date,
      booking_time
    });

    if (!updated)
      return res.status(404).json({ message: "Booking not found or no changes made" });

    res.status(200).json({ message: "Booking updated successfully" });
  } catch (err) {
    console.error("Error updating booking:", err);
    res.status(500).json({ error: err.message });
  }
};

/* =========================================================
   DELETE BOOKING
========================================================= */
export const removeBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await deleteBooking(id);
    if (!deleted) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error("Error deleting booking:", err);
    res.status(500).json({ error: err.message });
  }
};
