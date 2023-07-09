const mongoose = require("mongoose");

const moduleSchema = mongoose.Schema({
  moduleID: {
    type: String,
    require: true,
  },
  moduleName: {
    type: String,
    required: true,
  },
  moduleTestScore: {
    type: Number,
    required: true,
  },
  moduleProgress: {
    type: Number,
    required: true,
  },

  moduleFiles: {
    type: [String],
  },
});

const projectSchema = mongoose.Schema(
  {
    adminid: {
      type: String,
      require: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
    modules: {
      type: [],
      required: true,
    },
    assignedDev: {
      type: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectModel = mongoose.model("Project", projectSchema);

module.exports = ProjectModel;
