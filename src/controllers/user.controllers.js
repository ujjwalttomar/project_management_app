// contollers/user.controllers.js

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
  res.status(200).json({message : "role updated successfully" , user.role});
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
  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};