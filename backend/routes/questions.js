const express = require("express");
const router = express.Router();

const { getRandomQuestions } = require("../controller/questions");

router.get("/:category", getRandomQuestions);

module.exports = router;
