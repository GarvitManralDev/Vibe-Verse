const fs = require("fs");
const path = require("path");

const getRandomQuestions = (req, res) => {
  const category = req.params.category;
  // Build the file path based on category
  const filePath = path.join(process.cwd(), "data", `${category}.json`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Category not found" });
  }

  try {
    const data = fs.readFileSync(filePath, "utf8");
    const questions = JSON.parse(data);

    if (!Array.isArray(questions) || questions.length === 0) {
      return res
        .status(400)
        .json({ error: "No questions found in this category" });
    }

    // Shuffle questions and pick 7
    const shuffled = questions.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 7);

    return res.json(selected);
  } catch (err) {
    return res.status(500).json({ error: "Failed to read questions" });
  }
};

module.exports = {
  getRandomQuestions,
};
