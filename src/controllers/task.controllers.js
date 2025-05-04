// src/controllers/task.controllers.js

import Task from "../models/task.model.js";
import User from "../models/user.model.js"

export const getAllTasks = async (req ,res) => {
  try {
    const tasks = await Task.find();
    if(tasks.length === 0){
      return res.status(404).json({message : "tasks not found."});
    }
    res.status(200).json({tasks});
    
  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};

export const getTaskById = async (req ,res) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if(!task){
      return res.status(404).json({message : "task not found."});
    }
    res.status(200).json({message : "task found." , task});
  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};

export const createTask = async (req ,res) => {
  try {
    const {title, description, deadline, priority, status} = req.body;
    if(!title || !description || !priority || !deadline){
     return res.status(400).json({message : "enter all required fields!"});
    const newTask = await Task.create({
      title,
      description,
      priority,
      deadline,
      status
    });}
    res.status(201).json({message : "task created successfully.", newTask});
  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};

export const updateTask = async (req ,res) => {
  try {
    const taskId = req.params.taskId;
    const {title, description, deadline, priority} = req.body;
    const task = await Task.findById(taskId);
    if(!task){
      return res.status(404).json({message : "task not found."});
    }
    task.description = description || task.description;
    task.title = title || task.title;
    task.deadline = deadline || task.deadline;
    task.priority = priority || task.priority;
    
    await task.save();
    
    res.status(200).json({message : "task updated successfully.", task});
    
  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};

export const deleteTask = async (req ,res) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if(!task){
      return res.status(404).json({message : "task not found."});
    }
    await task.deleteOne();
    res.status(200).json({message : "task deleted successfully."});
  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};

export const assignUserToTask = async (req ,res) => {
  try {
    const taskId = req.params.taskId;
    const {userId} = req.body;
    
    if(!userId){
      return res.status(404).json({message : "user ID is required to assign tasks."});
    }
    const task = await Task.findById(taskId);
    if (!task){
      return res.status(404).json({message : "task not found."});
    }
    const user = await User.findById(userId);
    if(!user){
      return res.status(400).json({message : "user not found."});
    }
    task.assignedTo = user._id;
    await task.save();
    res.status(200).json({message : "task assigned successfully.", task})
  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};

export const updateTaskStatus = async (req ,res) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if (!task){
      return res.status(404).json({message : "task not found."});
    }
    const {status} = req.body;
    task.status = status || task.status;
    await task.save();
    res.status(201).json({message : "status updated successfully.", task});
  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};

