//  src/routes/task.routes.js


import express from "express";
import {createTask, getTaskById, getAllTasks, updateTask, deleteTask, assignUserToTask , updateTaskStatus } from "../controllers/task.controllers.js";
import {validateMongoId} from "../middlewares/validateMongoId.middlewares.js";
import {isAuthenticated, isAdmin , isAdminOrTeamLeader} from "../middlewares/auth.middle.js";

const router = express.Router();

router.get("/", isAuthenticated,isAdminOrTeamLeader, getAllTask);
router.get("/:taskId", isAuthenticated, validateMongoId, isAdminOrTeamLeader, getTaskById);
router.post("/create", isAuthenticated, isAdminOrTeamLeader, createTask);
router.put("/:taskId", isAuthenticated, validateMongoId, isAdminOrTeamLeader, updateTask);
router.delete("/:taskId", isAuthenticated, isAdmin, validateMongoId, deleteTask);
router.put("/:taskId/assign", isAuthenticated, validateMongoId, isAdminOrTeamLeader, assignUserToTask);
router.put("/:taskId/status", isAuthenticated, validateMongoId, isAdminOrTeamLeader, updateTaskStatus);

export default router;
