// src/routes/user.routes.js

import express from "express";
import {getUserById, getAllUsers, deleteUser, updateRole} from "../controllers/user.controllers.js";
import {protect, isAdmin , isTeamLeaderOrAdmin } from "../middlewares/auth.middlewares.js"

// ........................adding rate limiting to abuse using of routes .(left).
// adding the inout valudations for id in url , like we r exprection something like api/v1/users/74928377484893hfj3983748  but the user enters something like api/v1/users/hello-world , then we have to return a valid error . so deinfe a ainput validation middleware .

const router = express.Router();

router.get("/", protect, isTeamLeaderOrAdmin, getAllUsers)
router.get("/:userId", protect, isTeamLeaderOrAdmin, getUserById);
router.put("/:userId/role", protect, isAdmin, updateRole);
router.delete("/:userId", protect, isAdmin, deleteUser);

export default router;