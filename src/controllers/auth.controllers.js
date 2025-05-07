//  src/controllers/auth.controllers.js
import User from "../models/user.model.js"


export const loginUser = async (req, res){
  try{
    const {emailOrUsername, password} = req.body;
    if(!emailOrUsername || !password){
      return res.status(400).json({
        message : "enter the required fields.",
      });
    }
    
  }const(error){
    res.status(500).json({message : "server error", error : error.message});
  }
}
export const registerUser = async (req, res){
  try{
    
  }const(error){
    res.status(500).json({message : "server error", error : error.message});
  }
}
export const forgotPassword = async (req, res){
  try{
    
  }const(error){
    res.status(500).json({message : "server error", error : error.message});
  }
}
export const resetPassword = async (req, res){
  try{
    
  }const(error){
    res.status(500).json({message : "server error", error : error.message});
  }
}
export const userLogout = async (req, res){
  try{
    
  }const(error){
    res.status(500).json({message : "server error", error : error.message});
  }
}