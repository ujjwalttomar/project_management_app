// src/routes/team.routes.js 

import express from "express";
import {createTeam, getAllTeams, getTeamById , deleteTeam, updateTeam, addMembersToTeam, removeMembersFromTeam} from "../controllers/team.controllers.js";