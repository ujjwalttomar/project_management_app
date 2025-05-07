// src/controllers/team.controllers.js

import Team from "../models/team.model.js";
import { User } from "../models/user.model.js";

export const createTeam = async (req, res) => {
  try{
    const {name, description} = req.body;
    const newTeam = await Team.create({
      name,
      description,
      createdBy : req.user._id
    });
   
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
    const team = await Team.findById(teamId);
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
    const team = await Team.findById(teamId).populate("members.user", "name email");
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

export const getAllTeams = async (req, res) => {
  try{
    const teams = await Team.find().populate("members.user", "name email");
    if(teams.length == 0){
      return res.status(200).json({
      message: "Teams fetched successfully.",
      teams
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
    const teamId = req.params.teamId;
    const userId = req.params.userId;

    const team = await Team.findById(teamId);
    const user = await User.findById(userId);
    if(!team){
      return res.status(404).json({
        message : "team not found."
      });
    }

    if(!user){
      return res.status(404).json({
        message : "user not found."
      });
    }
    const alreadyMember = team.members.some(m => m.user.toString() === userId);
    if (alreadyMember) {
       return res.status(400).json({ message: "User is already a member of the team." });
}
     team.members.push({user : user._id , role : "user"});
    await team.save();

    res.status(200).json({
      message: "user added to team successfully." ,
      team
    });

  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};

export const removeMembersFromTeam = async (req, res) => {
  try{
    const teamId = req.params.teamId;
    const userId = req.params.userId;

    const team = await Team.findById(teamId);
    const user = await User.findById(userId);
    if(!team){
      return res.status(404).json({
        message : "team not found."
      });
    }

    if(!user){
      return res.status(404).json({
        message : "user not found."
      });
    }
    team.members = team.members.filter(member => member.user.toString() !== userId);

    await team.save();

    res.status(200).json({
      message: "user removed from team successfully.",
      team
    });

  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};

export const changeTeamLeader = async (req, res) => {
  try{
    const { teamId, userId } = req.params;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const member =  team.members.find(m => m.user.toString() === userId);
    const teamLeader = team.members.find(m => m.role === "teamLeader");
    if (!member) {
      return res.status(404).json({ message: "member not found." });
    }
    if (!teamLeader){
      member.role = "teamLeader";
    }
    else{
      member.role = "teamLeader";
      teamLeader.role = "user";
    }
    await team.save();
    
    res.status(200).json({
      message : "team leader changed successfully."
    });
  }catch(error){
    res.status(500).json({message : "server error", error : error.message});
  }
};
