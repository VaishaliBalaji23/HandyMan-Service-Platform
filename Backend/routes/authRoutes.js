
// routes/authRoutes.js
import { Router } from "express";
import { loginUser } from "../controller/authController.js";

const router = Router();

// POST /api/auth/login
router.post("/login", loginUser);

export default router;