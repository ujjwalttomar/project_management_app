// controllers/project.controllers.js



import Project from "../models/project.model.js";

// Controller to fetch all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to create a project
export const createProject = async (req, res) => {
  try {
    const { projectName, deadline, description } = req.body;

    if (!projectName || !deadline || !description) {
      return res.status(400).json({ message: "Enter all required fields!" });
    }

    const nameExists = await Project.findOne({ projectName });
    if (nameExists) {
      return res
        .status(400)
        .json({ message: "Project with this name already exists!" });
    }

    const newProject = await Project.create({
      projectName,
      deadline,
      description,
      createdBy: req.user._id,
    });

    res
      .status(201)
      .json({ message: "Project created successfully.", project: newProject });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to fetch a project by its ID
export const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findById(projectId); 

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json({ message: "Project found!", project });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to delete a project
export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.projectId; 
    const project = await Project.findById(projectId); 

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    await project.remove();
    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller for updating a project
export const updateProject = async (req, res) => {
  try {
    const projectId = req.params.projectId; 
    const { projectName, description, deadline, status } = req.body;

    const project = await Project.findById(projectId); 
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    project.projectName = projectName || project.projectName;
    project.description = description || project.description;
    project.status = status || project.status;
    project.deadline = deadline || project.deadline;

    await project.save();

    res.status(200).json({
      message: "Project updated successfully.",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
