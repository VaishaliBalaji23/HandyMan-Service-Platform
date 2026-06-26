// model/bookingModel.js
import db from "../config/database.js";

// Create a new booking
export const createBooking = async ({ name, email, address, phone, service_type, issue, booking_date, booking_time }) => {
  const [result] = await db.query(
    `INSERT INTO bookings (name, email, address, phone, service_type, issue, booking_date, booking_time, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
    [name, email, address, phone, service_type, issue, booking_date, booking_time]
  );
  return result.insertId;
};

// Get all bookings
export const getAllBookings = async () => {
  const [rows] = await db.query("SELECT * FROM bookings ORDER BY created_at DESC");
  return rows;
};

// Get booking by ID
export const getBookingById = async (id) => {
  const [rows] = await db.query("SELECT * FROM bookings WHERE id = ?", [id]);
  return rows[0];
};

// Get bookings by user email
export const getBookingsByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM bookings WHERE email = ? ORDER BY created_at DESC",
    [email]
  );
  return rows;
};

// Update booking
export const updateBooking = async (id, { name, email, address, phone, service_type, issue, booking_date, booking_time }) => {
  const [result] = await db.query(
    `UPDATE bookings 
     SET name = ?, email = ?, address = ?, phone = ?, 
         service_type = ?, issue = ?, booking_date = ?, booking_time = ?
     WHERE id = ?`,
    [name, email, address, phone, service_type, issue, booking_date, booking_time, id]
  );
  return result.affectedRows;
};

// Delete booking
export const deleteBooking = async (id) => {
  const [result] = await db.query("DELETE FROM bookings WHERE id = ?", [id]);
  return result.affectedRows;
};
