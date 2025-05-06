import express from "express";
import {
  getUserById,
  getAllUsers,
  deleteUser,
  updateRole,
  updatePassword,
  updateProfile,
  verifyEmail,
  getMe
} from "../controllers/user.controllers.js";

import {
  protect,
  isAdmin,
  isTeamLeaderOrAdmin
} from "../middlewares/auth.middlewares.js";

import { validateEmail } from "../middlewares/validation.middlewares.js";

const router = express.Router();

// Admin/TeamLeader Routes
router.get("/", protect, isTeamLeaderOrAdmin, getAllUsers);
router.get("/:userId", protect, isTeamLeaderOrAdmin, getUserById);
router.put("/:userId/role", protect, isAdmin, updateRole);
router.delete("/:userId", protect, isAdmin, deleteUser);

// User Self-Service Routes
router.get("/me", protect, getMe);
router.put("/update-profile", protect, updateProfile);
router.put("/update-password", protect, updatePassword);
router.post("/verify-email", protect, validateEmail, verifyEmail);

export default router;
