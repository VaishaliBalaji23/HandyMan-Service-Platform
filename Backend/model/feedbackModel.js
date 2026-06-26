import db from "../config/database.js";

// Add new feedback
export const addFeedback = async ({ user_email, comment }) => {
  const [result] = await db.query(
    "INSERT INTO feedbacks (user_email, comment, created_at) VALUES (?, ?, NOW())",
    [user_email, comment]
  );
  return result.insertId;
};

// Get all feedbacks
export const getAllFeedbacks = async () => {
  const [rows] = await db.query(
    "SELECT * FROM feedbacks ORDER BY created_at DESC"
  );
  return rows;
};

// Get feedbacks by email
export const getFeedbacksByEmail = async (user_email) => {
  const [rows] = await db.query(
    "SELECT * FROM feedbacks WHERE user_email = ? ORDER BY created_at DESC",
    [user_email]
  );
  return rows;
};

// Delete feedback
export const deleteFeedback = async (id) => {
  const [result] = await db.query("DELETE FROM feedbacks WHERE id = ?", [id]);
  return result.affectedRows;
};
