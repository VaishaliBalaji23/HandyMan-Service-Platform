// controller/serviceController.js
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} from "../model/serviceModel.js";

/* =========================================================
   CREATE SERVICE
========================================================= */
/* =========================================================
   CREATE SERVICE (with image upload)
========================================================= */
export const addService = async (req, res) => {
  try {
    const { service_name, description } = req.body;
    const profile_picture = req.file ? `/uploads/${req.file.filename}` : null;

    if (!service_name || !description || !profile_picture) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const serviceId = await createService({ service_name, description, profile_picture });

    res.status(201).json({
      message: "Service created successfully",
      id: serviceId,
      imagePath: profile_picture,
    });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Error creating service" });
  }
};

/* =========================================================
   GET ALL SERVICES
========================================================= */
export const getServices = async (req, res) => {
  try {
    const services = await getAllServices();
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Error fetching services" });
  }
};

/* =========================================================
   GET SERVICE BY ID
========================================================= */
export const getService = async (req, res) => {
  try {
    const id = req.params.id;
    const service = await getServiceById(id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ message: "Error fetching service" });
  }
};

/* =========================================================
   UPDATE SERVICE
========================================================= */
export const editService = async (req, res) => {
  try {
    const id = req.params.id;
    const { service_name, description, profile_picture } = req.body;

    const updated = await updateService(id, { service_name, description, profile_picture });
    if (!updated) return res.status(404).json({ message: "Service not found or no changes made" });

    res.status(200).json({ message: "Service updated successfully" });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ message: "Error updating service" });
  }
};

/* =========================================================
   DELETE SERVICE
========================================================= */
export const removeService = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await deleteService(id);
    if (!deleted) return res.status(404).json({ message: "Service not found" });

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Error deleting service" });
  }
};
