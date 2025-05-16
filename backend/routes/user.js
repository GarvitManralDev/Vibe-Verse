const express = require("express");
const router = express.Router();
const {
  createUser,
  checkUser,
  getUser,
  updateUserProfile,
} = require("../controller/user");
const { authenticateToken } = require("../utils/user");

router.post("/signup", createUser);
router.post("/login", checkUser);
router.get("/", authenticateToken, getUser);
router.put("/update-profile", authenticateToken, updateUserProfile);

module.exports = router;
