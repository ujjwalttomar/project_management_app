// src/controllers/team.controllers.js

import Team from "../models/team.model.js";

export const createTeam = async (req, res) => {
  try{
    const {name, description} = req.body;
    const newTeam = await Team.create({
      name,
      description,
      createdBy : req.user._id;
    });
   await newTeam.save();
   res.status(201).json({
     message : "team created successfully!",
     newTeam
   });
  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};

export const updateTeam = async (req, res) => {
  try{
    const { name , description} = req.body;
    const teamId = req.params.teamId;
    const team = await team.findById(teamId);
    if(!team){
      return res.status(404).json({
        message : "team not found."
      });
    }
    team.name = name || team.name;
    team.description = description || team.description;
    await team.save();
    res.status(200).json({
      message : "team updated successfully!", 
      team
    });
  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};

export const deleteTeam = async (req, res) => {
  try{
    const teamId = req.params.teamId;
    if(!team){
      return res.status(404).json({
        message : "team not found."
      });
    }
    await team.deleteOne();
    res.status(200).json({
      message : "team deleted successfully!"
    });
    
  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};

export const getAllTeam = async (req, res) => {
  try{
    const teams = await Team.find();
    if(teams.length == 0){
      return res.status(404).json({
        message : "teams not found."
      });
    }
    res.status(200).json({
      message : "teams found",
      teams
    });
    
  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};

export const getTeamById = async (req, res) => {
  try{
    const teamId = req.params.teamId;
    const team = await Team.findById(teamId);
    if(!team){
      return res.status(404).json({
        message : "team not found."
      });
    }
    res.status(200).json({
      message : "team found",
      team
    });
    
  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};

export const addMembersToTeam = async (req, res) => {
  try{
    const teamId = req.params
  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};

export const removeMembersFromTeam = async (req, res) => {
  try{
    
  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};

export const changeTeamLeader = async (req, res) => {
  try{
    
  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};
