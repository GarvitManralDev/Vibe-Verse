const express = require("express");
const router = express.Router();
const User = require("./user");
const Questions = require("./questions");
const Category = require("./category");
const { authenticateToken } = require("../utils/user");

router.use("/questions", authenticateToken, Questions);
router.use("/user", User);
router.use("/category", Category);

module.exports = router;
