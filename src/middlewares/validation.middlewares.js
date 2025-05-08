// middlewares/validation.middlewares.js
import { body } from "express-validator";

export const validateRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("username").notEmpty().withMessage("Username is required"),
  body("password").isLength({ min: 6 }).withMessage("Password min 6 characters"),
];

export const validateLogin = [
  body("username").notEmpty().withMessage("Username or email required"),
  body("password").notEmpty().withMessage("Password required"),
];

export const validateEmail = [
  body("email").isEmail().withMessage("Valid email required"),
];

export const validatePasswordChange = [
  body("currentPassword").notEmpty().withMessage("Current password required"),
  body("newPassword").isLength({ min: 6 }).withMessage("New password min 6 characters"),
];