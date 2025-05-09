//  src/routes/project.routes.js

import express from "express";
import {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
    } from "../controllers/project.controllers.js";
import {protect} from "../middlewares/auth.middlewares.js" // to protect routes.

const router = express.Router();

router.get("/", protect, getAllProjects);
router.post("/create" , protect, createProject);
router.get("/:projectId", protect, getProjectById);
router.put("/:projectId", protect, updateProject);
router.delete("/:projectId", protect, deleteProject);

export default router;

