// routes/serviceRoutes.js
import express from "express";
import {
  addService,
  getServices,
  getService,
  editService,
  removeService
} from "../controller/serviceController.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

// Create service (with image upload)
router.post("/addService", upload.single("profile_picture"), addService);

// Get services
router.get("/getServices", getServices);
router.get("/getService/:id", getService);

// Update service (with optional image upload)
router.put("/editService/:id", upload.single("profile_picture"), editService);

// Delete service
router.delete("/deleteService/:id", removeService);

export default router;
