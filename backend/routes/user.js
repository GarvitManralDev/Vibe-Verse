const express = require("express");
const router = express.Router();
const {
  createUser,
  checkUser,
  getUser,
  updateUserProfile,
  updateUserScores,
  getTopVibers,
  getUserById,
} = require("../controller/user");
const { authenticateToken } = require("../utils/user");

router.post("/signup", createUser);
router.post("/login", checkUser);
router.get("/", authenticateToken, getUser);
router.put("/update-profile", authenticateToken, updateUserProfile);
router.put("/scores", authenticateToken, updateUserScores);
router.get("/top-vibers", getTopVibers);
router.get("/:id", getUserById);
module.exports = router;
