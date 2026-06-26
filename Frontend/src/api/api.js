// src/services/api.js

// ✅ Adjust if backend runs on a different port or domain
const API_BASE = "http://localhost:5000";

/* ------------------------------
   AUTHENTICATION
------------------------------ */
export async function loginRequest({ email, password }) {
  const res = await fetch(`${API_BASE}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    const msg = data?.message || "Login failed";
    const errors = data?.errors || null;
    const err = new Error(msg);
    err.errors = errors;
    throw err;
  }

  // Store token for authenticated routes
  if (data?.token) localStorage.setItem("access_token", data.token);
  return data;
}

function authHeaders() {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function logoutLocal() {
  localStorage.removeItem("access_token");
}

export async function fetchMyProfile() {
  const res = await fetch(`${API_BASE}/api/me`, {
    method: "GET",
    headers: { "Content-Type": "application/json", ...authHeaders() },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to load profile");
  return data;
}

/* ------------------------------
   BOOKINGS API
------------------------------ */

// ✅ Create booking (Frontend → Backend → Database + Email)
export async function createBooking(formData) {
  // Convert frontend formData keys to match DB fields
  const bookingPayload = {
    name: formData.name,
    email: formData.email,
    address: formData.address,
    phone: formData.phone,
    service_type: formData.serviceType, // DB column name
    issue: formData.issue,
    booking_date: formData.date,        // DB column name
    booking_time: formData.time         // DB column name
    // ⚠️ created_at handled automatically by backend (NOW())
  };

  const res = await fetch(`${API_BASE}/api/addBooking`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingPayload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to create booking");
  return data; // { message, id }
}

// ✅ Fetch all bookings (Admin dashboard)
export async function getAllBookings() {
  const res = await fetch(`${API_BASE}/api/getBookings`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to fetch bookings");
  return data;
}

// ✅ Fetch a single booking by ID
export async function getBookingById(id) {
  const res = await fetch(`${API_BASE}/api/getBooking/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to fetch booking");
  return data;
}

// ✅ Fetch bookings for logged-in user
export async function getUserBookings() {
  const res = await fetch(`${API_BASE}/api/getUserBookings`, {
    method: "GET",
    headers: { "Content-Type": "application/json", ...authHeaders() },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to fetch user bookings");
  return data;
}

// ✅ Update booking by ID
export async function updateBooking(id, formData) {
  const bookingPayload = {
    name: formData.name,
    email: formData.email,
    address: formData.address,
    phone: formData.phone,
    service_type: formData.serviceType,
    issue: formData.issue,
    booking_date: formData.date,
    booking_time: formData.time
  };

  const res = await fetch(`${API_BASE}/api/editBooking/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(bookingPayload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to update booking");
  return data;
}

// ✅ Delete booking by ID
export async function deleteBooking(id) {
  const res = await fetch(`${API_BASE}/api/deleteBooking/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", ...authHeaders() },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to delete booking");
  return data;
}

/* ------------------------------
   FEEDBACKS API
------------------------------ */

// ✅ Add feedback (requires JWT)
export async function addFeedback(comment) {
  const res = await fetch(`${API_BASE}/api/addFeedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ comment }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to add feedback");
  return data;
}

// ✅ Get all feedbacks (for Admin)
export async function getAllFeedbacks() {
  const res = await fetch(`${API_BASE}/api/getAllFeedbacks`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to fetch feedbacks");
  return data;
}

// ✅ Get feedbacks for logged-in user
export async function getMyFeedbacks() {
  const res = await fetch(`${API_BASE}/api/myFeedbacks`, {
    method: "GET",
    headers: { "Content-Type": "application/json", ...authHeaders() },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to fetch user feedbacks");
  return data;
}

// ✅ Delete feedback
export async function deleteFeedback(id) {
  const res = await fetch(`${API_BASE}/api/deleteFeedback/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", ...authHeaders() },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to delete feedback");
  return data;
}

// ✅ Fetch all users (Admin dashboard)
export async function getAllUsers() {
  const res = await fetch(`${API_BASE}/api/getUsers`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to fetch users");
  return data;
}


// ✅ Fetch all services
export async function getAllServices() {
  const res = await fetch(`${API_BASE}/api/getServices`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to fetch services");
  return data;
}
// ✅ Add this in your api.js
export async function registerRequest(userData) {
  try {
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}
