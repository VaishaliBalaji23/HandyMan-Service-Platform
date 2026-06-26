import express from "express";
import {
  createFeedback,
  fetchAllFeedbacks,
  fetchUserFeedbacks,
  removeFeedback
} from "../controller/feedbackController.js";
import { authRequired } from "../utils/jwtUtils.js";

const router = express.Router();

// ✅ Create new feedback (user)
router.post("/addFeedback", authRequired, createFeedback);

// ✅ Get all feedbacks (admin)
router.get("/getAllFeedbacks", fetchAllFeedbacks);

// ✅ Get feedbacks for logged-in user (JWT email)
router.get("/myFeedbacks", authRequired, fetchUserFeedbacks);

// ✅ Delete feedback
router.delete("/deleteFeedback/:id", authRequired, removeFeedback);

export default router;
