// src/routes/user.routes.js

import express from "express";
import {getUserbyId, getAllUsers, deleteUser, updateRole} from "../controllers/user.controllers.js";
import {protect, isAdmin , isTeamLeaderOrAdmin } from "../middlewares/auth.middlewares.js"

// ........................adding rate limiting to abuse using of routes .(left).

const router = express.Router();

router.get("/", protect, isTeamLeaderOrAdmin, getAllUsers)
router.get("/:userId", protect, isTeamLeaderOrAdmin, getUserbyId);
router.put("/:userId/role", protect, isAdmin, updateRole);
router.delete("/:userId", protect, isAdmin, deleteUser);

export default router;