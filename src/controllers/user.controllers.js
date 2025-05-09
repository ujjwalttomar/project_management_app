// src/contollers/user.controllers.js

import User from "../models/user.model.js";

export const getUserById = async (req, res) => {
  try{
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if(!user){
     return res.status(404).json({message : "user not found."});
    }
    res.status(200).json({message : "user found.", user});
  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};
export const updateRole = async (req, res) => {
  try{
    const userId = req.params.userId;
  const {role}  = req.body;
  const user = await User.findById(userId);
  if (!user) {
      return res.status(404).json({ message: "user not found." });}
  user.role = role || user.role;
  await user.save();
  res.status(200).json({message : "role updated successfully" , user});
  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
  };
  
export const deleteUser = async (req, res) => {
  try{
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found." });}
      await user.deleteOne();
      res.status(200).json({message : "user deleted successfully." });
      
  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};
export const getAllUsers = async (req, res) => {
  try{
    const users =await  User.find();
    res.status(200).json({message :"users found.", users});
    }
  catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};

// For logged-in user to get their own data
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); // Don't return hashed password
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User profile fetched.", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// For user to update their profile info (name, email, etc.)
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully.", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// For user to change their password
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect." });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// For verifying user’s email manually (simulate via token/email flow later)
export const verifyEmail = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.isEmailVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
