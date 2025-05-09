//  src/routes/team.routes.js 

import express from "express";
import {createTeam, getAllTeams, getTeamById , deleteTeam, updateTeam, addMembersToTeam, removeMembersFromTeam, changeTeamLeader} from "../controllers/team.controllers.js";
import {isAuthenticated ,isAdmin, isAdminOrTeamLeader} from "../middlewares/auth.middlewares.js";
import {validateMongoId} from "../middlewares/validateMongoId.middlewares.js";

const router = express.Router();

router.get("/", isAuthenticated, isAdminOrTeamLeader,getAllTeams);
router.get("/:teamId", isAuthenticated, validateMongoId,  isAdminOrTeamLeader, getTeamById);
router.post("/create", isAuthenticated, isAdmin, createTeam);
router.delete("/:teamId", isAuthenticated, validateMongoId, isAdmin, deleteTeam);
router.put("/:teamId", isAuthenticated, validateMongoId, isAdmin, updateTeam);
router.put("/:teamId/addMembers", isAuthenticated, validateMongoId, isAdminOrTeamLeader, addMembersToTeam);
router.put("/:teamId/removeMembers",  isAuthenticated, validateMongoId,  isAdminOrTeamLeader, removeMembersFromTeam);

router.put("/:teamId/changeLeader", isAuthenticated, validateMongoId, isAdminOrTeamLeader, changeTeamLeader);

export default router;