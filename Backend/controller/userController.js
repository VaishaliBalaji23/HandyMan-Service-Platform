// controllers/userController.js
import bcrypt from "bcryptjs";
import {
  createUser,
  createAuth,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateAuthEmail,
  emailExistsInUsers,
  emailExistsInAuth,
  withTransaction,
  getUserByEmail
} from "../model/userModel.js";

const isEmail = (s = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s).trim());
const sanitize = (s = "") => String(s ?? "").trim();

// Register User (users + auth) – atomic with transaction
export const registerUser = async (req, res) => {
  try {
    const first_name   = sanitize(req.body?.first_name);
    const last_name    = sanitize(req.body?.last_name);
    const email        = sanitize(req.body?.email).toLowerCase();
    const phone_number = sanitize(req.body?.phone_number);
    const role         = sanitize(req.body?.role || "user").toLowerCase();
    const password     = String(req.body?.password ?? "");

    const errors = [];
    if (!first_name) errors.push({ field: "first_name", message: "first_name is required" });
    if (!last_name)  errors.push({ field: "last_name",  message: "last_name is required" });
    if (!email || !isEmail(email)) errors.push({ field: "email", message: "Valid email is required" });
    if (!password || password.length < 6) errors.push({ field: "password", message: "Password must be at least 6 chars" });
    if (role && !["admin","user"].includes(role)) errors.push({ field: "role", message: "role must be 'admin' or 'user'" });

    if (errors.length) return res.status(400).json({ message: "Validation failed", errors });

    // Reject duplicate emails up-front
    if (await emailExistsInUsers(email) || await emailExistsInAuth(email)) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    // Transaction: insert users + auth together
    const userId = await withTransaction(async (conn) => {
      const newUserId = await createUser(conn, { first_name, last_name, email, phone_number, role });
      await createAuth(conn, { email, password: hashed });
      return newUserId;
    });

    return res.status(201).json({ message: "User registered successfully", userId });
  } catch (err) {
    console.error("[registerUser] error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUsers = async (_req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    console.error("[getUsers] error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });

    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (err) {
    console.error("[getUser] error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update user; if email changed, sync auth.email as well
export const editUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });

    const current = await getUserById(id);
    if (!current) return res.status(404).json({ message: "User not found" });

    const first_name   = sanitize(req.body?.first_name ?? current.first_name);
    const last_name    = sanitize(req.body?.last_name ?? current.last_name);
    const email        = sanitize(req.body?.email ?? current.email).toLowerCase();
    const phone_number = sanitize(req.body?.phone_number ?? current.phone_number ?? "");
    const role         = sanitize(req.body?.role ?? current.role).toLowerCase();

    const errors = [];
    if (!first_name) errors.push({ field: "first_name", message: "first_name is required" });
    if (!last_name)  errors.push({ field: "last_name",  message: "last_name is required" });
    if (!email || !isEmail(email)) errors.push({ field: "email", message: "Valid email is required" });
    if (role && !["admin","user"].includes(role)) errors.push({ field: "role", message: "role must be 'admin' or 'user'" });
    if (errors.length) return res.status(400).json({ message: "Validation failed", errors });

    // If email changed, ensure it isn't used by another account
    if (email !== current.email) {
      const emailInUsers = await emailExistsInUsers(email);
      const emailInAuth  = await emailExistsInAuth(email);
      if (emailInUsers || emailInAuth) {
        return res.status(409).json({ message: "Email already in use by another account" });
      }
    }

    await withTransaction(async (conn) => {
      const affected = await updateUser(conn, id, { first_name, last_name, email, phone_number, role });
      if (!affected) throw new Error("No changes applied");
      if (email !== current.email) {
        await updateAuthEmail(conn, current.email, email);
      }
    });

    return res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error("[editUser] error:", err);
    const msg = /No changes applied/.test(err.message) ? "No changes made" : "Server error";
    const code = /No changes applied/.test(err.message) ? 400 : 500;
    return res.status(code).json({ message: msg });
  }
};

export const removeUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });

    const affected = await deleteUser(id);
    if (!affected) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("[removeUser] error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getProfileFromToken = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    // Prefer user_id from token, else fall back to email
    let dbUser = null;
    if (req.user.user_id) {
      dbUser = await getUserById(Number(req.user.user_id));
    } 
    if (!dbUser && req.user.email) {
      dbUser = await getUserByEmail(req.user.email.toLowerCase());
    }

    // If not found in DB, at least return token claims
    const profile = dbUser
      ? {
          id: dbUser.id,
          first_name: dbUser.first_name,
          last_name: dbUser.last_name,
          email: dbUser.email,
          phone_number: dbUser.phone_number,
          role: dbUser.role,
          created_at: dbUser.created_at,
        }
      : {
          id: req.user.user_id ?? null,
          first_name: req.user.first_name ?? null,
          last_name: req.user.last_name ?? null,
          email: req.user.email ?? null,
          role: req.user.role ?? "user",
        };

    return res.status(200).json({
      profile,
      // expose useful token metadata if you want
      token_meta: {
        auth_id: req.user.auth_id ?? null,
        user_id: req.user.user_id ?? null,
        sub: req.user.sub ?? null,
        iat: req.user.iat,
        exp: req.user.exp,
      },
    });
  } catch (err) {
    console.error("[getProfileFromToken] error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
