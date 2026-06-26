import { Router } from "express";
import {
 registerUser,
 getUsers,
 getUser,
 editUser,
 removeUser,
 getProfileFromToken
} from "../controller/userController.js";
import { authRequired } from "../utils/jwtUtils.js";


const router = Router();


// Users CRUD + register
router.post("/register", registerUser); // body: { first_name, last_name, email, phone_number, role, password }
router.get("/getUsers", getUsers);
router.get("/getUser/:id", getUser);
router.put("/editUser/:id", editUser);           // body: { first_name, last_name, email, phone_number, role }
router.delete("/deleteUser/:id", removeUser);
router.get("/me", authRequired, getProfileFromToken);
export default router;
