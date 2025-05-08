// middlewares/auth.middlewares.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

export const isTeamLeader = (req, res, next) => {
  if (req.user.role !== "team-leader") {
    return res.status(403).json({ message: "Access denied: Team Leaders only" });
  }
  next();
};

export const isTeamLeaderOrAdmin = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "team-leader") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};