const express = require("express");
const router = express.Router();

const {
  createProject,
  putModules,
} = require("../controllers/projectController");

router.post("/addproject", createProject);
router.put("/updateModule", putModules);

module.exports = router;
