const express = require("express");
const router = express.Router();

const {
  createProject,
  putModules,
  putProject,
  deleteProject,
} = require("../controllers/projectController");

router.post("/addproject", createProject);
router.put("/updateModule", putModules);
router.put("/projectUpdate", putProject);
router.delete("/:ProjectID", deleteProject);

module.exports = router;
