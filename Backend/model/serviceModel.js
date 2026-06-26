// model/serviceModel.js
import db from "../config/database.js";

/* =========================================================
   CREATE NEW SERVICE
========================================================= */
export const createService = async ({ service_name, description, profile_picture }) => {
  const [result] = await db.query(
    `INSERT INTO services (service_name, description, profile_picture, created_at)
     VALUES (?, ?, ?, NOW())`,
    [service_name, description, profile_picture]
  );
  return result.insertId;
};

/* =========================================================
   GET ALL SERVICES
========================================================= */
export const getAllServices = async () => {
  const [rows] = await db.query("SELECT * FROM services ORDER BY created_at DESC");
  return rows;
};

/* =========================================================
   GET SERVICE BY ID
========================================================= */
export const getServiceById = async (id) => {
  const [rows] = await db.query("SELECT * FROM services WHERE id = ?", [id]);
  return rows[0];
};

/* =========================================================
   UPDATE SERVICE
========================================================= */
export const updateService = async (id, { service_name, description, profile_picture }) => {
  const [result] = await db.query(
    `UPDATE services
     SET service_name = ?, description = ?, profile_picture = ?
     WHERE id = ?`,
    [service_name, description, profile_picture, id]
  );
  return result.affectedRows;
};

/* =========================================================
   DELETE SERVICE
========================================================= */
export const deleteService = async (id) => {
  const [result] = await db.query("DELETE FROM services WHERE id = ?", [id]);
  return result.affectedRows;
};
