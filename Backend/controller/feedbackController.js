import {
  addFeedback,
  getAllFeedbacks,
  getFeedbacksByEmail,
  deleteFeedback
} from "../model/feedbackModel.js";

// ✅ Create Feedback
export const createFeedback = async (req, res) => {
  try {
    const { comment } = req.body;
    const user_email = req.user?.email; // extracted from JWT token

    if (!user_email || !comment) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const feedbackId = await addFeedback({ user_email, comment });
    res.status(201).json({ message: "Feedback added successfully", feedbackId });
  } catch (err) {
    console.error("Error creating feedback:", err);
    res.status(500).json({ message: "Error creating feedback" });
  }
};

// ✅ Get all feedbacks (for Admin)
export const fetchAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await getAllFeedbacks();
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error("Error fetching feedbacks:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get feedbacks by user (JWT email)
export const fetchUserFeedbacks = async (req, res) => {
  try {
    const user_email = req.user?.email;
    if (!user_email)
      return res.status(401).json({ message: "Unauthorized: Missing email in token" });

    const feedbacks = await getFeedbacksByEmail(user_email);
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error("Error fetching user feedbacks:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete feedback by ID
export const removeFeedback = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await deleteFeedback(id);
    if (!deleted) return res.status(404).json({ message: "Feedback not found" });

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (err) {
    console.error("Error deleting feedback:", err);
    res.status(500).json({ message: err.message });
  }
};
