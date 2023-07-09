const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getDevs,
  deleteDev,
  getAdmininfo,
  getDevinfo,
} = require("../controllers/userControllers");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getDevs);
router.delete("/:id", deleteDev);
router.get("/admin/:id", getAdmininfo);
router.get("/dev/:id", getDevinfo);
module.exports = router;
