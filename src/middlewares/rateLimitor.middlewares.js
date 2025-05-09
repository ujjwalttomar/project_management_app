//  src/middlewares/rateLimitor.middlewares.js


import rateLimit from "express-rate-limit";

export const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit to 5 requests per IP
  message: "Too many password reset attempts, please try again later.",
});