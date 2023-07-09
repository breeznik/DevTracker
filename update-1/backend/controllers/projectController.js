const asyncHandler = require("express-async-handler");
const Project = require("../models/projectmodel");

//@desc create a project
//@routes POST /addproject
//@access private

const createProject = asyncHandler(async (req, res) => {
  const { adminid, projectName, description, dueDate, modules, assignedDev } =
    req.body;
  if (!adminid) {
    res.status(400);
    throw new Error("Admin ID is Mandatory");
  }

  if (!projectName || !description || !dueDate || !modules || !assignedDev) {
    res.status(400);
    throw new Error("Complete Project data is Mandatory");
  }

  const project = await Project.create({
    adminid,
    projectName,
    description,
    dueDate,
    modules,
    assignedDev,
  });

  console.log(`project created ${project}`);
  if (project) {
    const projectinfo = {
      project: {
        adminid: project.adminid,
        projectName: project.projectName,
        description: project.description,
        dueDate: project.dueDate,
        modules: project.modules,
        assignedDev: project.assignedDev,
      },
    };
    res.status(201).json(projectinfo);
  } else {
    res.status(400);
    throw new Error("Project Data is invalid ");
  }
});

const putModules = asyncHandler(async (req, res) => {
  const { projectId, updatedModules, moduleTestScore, moduleID } =
    req.body.params;
  if (!moduleTestScore) {
    try {
      // Find the project by ID
      const project = await Project.findById(projectId);
      // Check if the project exists
      if (!project) {
        res.status(404);
        throw new Error("Project not found");
      }
      // Update the modules array with the updatedModules
      project.modules = updatedModules;
      // Save the updated project
      const updatedProject = await project.save();
      console.log("modules updated");
      res.status(200).json(updatedProject);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  if (moduleTestScore && moduleID) {
    try {
      // Find the project by ID
      const project = await Project.findById(projectId);
      // Check if the project exists
      if (!project) {
        res.status(404).json({ error: "Project not found" });
        return;
      }

      // Update the module test score directly
      const updatedModules = project.modules.map((module) => {
        if (module.moduleID === moduleID) {
          return { ...module, moduleTestScore: moduleTestScore };
        }
        return module;
      });
      project.modules = updatedModules;

      // console.log("project - ", project.modules);
      // Save the updated project
      const updatedProject = await project.save();
      console.log("updated project : ,", updatedProject);
      console.log("Module test score updated");
      res.status(200).json(updatedProject);
    } catch (error) {
      console.error("Error updating module test score:", error);
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = { createProject, putModules };
