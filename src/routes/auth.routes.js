//  auth.routes.js

import express from "express";
import {registerUser , loginUser , forgotPassword} from "../controllers/auth.controllers.js";
import {validateRegister , validateLogin, validateEmail} from "../middlewares/validation.middlewares.js";


const router = express.Router();

router.post("/register" , validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.post("/forgotPassword", validateEmail, forgotPassword); //probably add rateLimiter middleware here. 

export default router;