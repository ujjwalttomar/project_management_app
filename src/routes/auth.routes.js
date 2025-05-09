//  src/routes/auth.routes.js

import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  userLogout
} from "../controllers/auth.controllers.js";
import {
  validateRegister,
  validateLogin,
  validateEmail
} from "../middlewares/validation.middlewares.js";

const router = express.Router();


router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.post("/forgot-password", validateEmail, forgotPassword);
router.post("/reset-password", validateEmail, resetPassword);
router.post("/logout", userLogout);

export default router;
