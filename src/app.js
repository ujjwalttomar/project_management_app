// src/app.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

import { notFound, errorHandler } from "./middlewares/error.middlewares.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Middlewares
app.use(express.json()); // Parse JSON request bodies
app.use(cors());         // Enable CORS for frontend access
app.use(helmet());       // Secure headers
app.use(morgan("dev"));  // Logging in dev mode

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

// Error-handling middlewares
app.use(notFound);       // 404 handler
app.use(errorHandler);   // Global error handler

export default app;