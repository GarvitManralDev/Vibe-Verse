const Category = require("../db/Schemas/categories");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    const regular = categories.filter((cat) => cat.type === "regular");
    const edgy = categories.filter((cat) => cat.type === "edgy");

    res.status(200).json({ regular, edgy });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res
      .status(500)
      .json({ message: "Server error while fetching categories." });
  }
};

module.exports = { getAllCategories };
