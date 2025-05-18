const User = require("../db/Schemas/user");
const Category = require("../db/Schemas/categories");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.SECRET;

const createUser = async (req, res) => {
  console.log("Signup here");
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const checkUser = async (req, res) => {
  console.log("Login here");
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  try {
    const user = await User.findOne({ username, password }); // Ideally hash & compare passwords
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're using JWT and middleware to attach user
    const { avatar, insta, snap, tinder, hinge, bumble } = req.body;

    const updatedFields = {
      ...(avatar && { avatar }),
      ...(insta && { insta }),
      ...(snap && { snap }),
      ...(tinder && { tinder }),
      ...(hinge && { hinge }),
      ...(bumble && { bumble }),
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedFields },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUserScores = async (req, res) => {
  try {
    const userId = req.user.id;
    const { newVibeScore, newCrazyScore, categoryName } = req.body;

    if (
      typeof newVibeScore !== "number" ||
      typeof newCrazyScore !== "number" ||
      typeof categoryName !== "string"
    ) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const user = await User.findById(userId);
    const category = await Category.findOne({ name: categoryName });

    if (!user || !category) {
      return res.status(404).json({ message: "User or category not found" });
    }

    user.vibeScore += newVibeScore;
    user.crazinessLevel += newCrazyScore;
    user.contestsParticipated += 1;

    const prevCount = user.contestTypes.get(categoryName) || 0;
    user.contestTypes.set(categoryName, prevCount + 1);

    const sortedContests = Array.from(user.contestTypes.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name]) => name);
    user.topContestTypes = sortedContests;

    await user.save();

    category.playCount += 1;

    const userIdStr = userId.toString();

    const isTopPlayer = !(
      Array.isArray(category.topPlayers) &&
      category.topPlayers.some(
        (p) => p.userId && p.userId.toString() === userIdStr
      )
    );

    const topPlayer = {
      userId: userIdStr,
      username: user.username,
      avatar: user.avatar,
      vibeScore: user.vibeScore,
    };

    if (isTopPlayer) {
      category.topPlayers.push(topPlayer);
    } else {
      category.topPlayers = category.topPlayers.map((p) =>
        p.userId.toString() === userIdStr ? topPlayer : p
      );
    }

    // Clean topPlayers to ensure all required fields exist before save
    category.topPlayers = category.topPlayers
      .filter((p) => p.userId && p.username && p.vibeScore !== undefined)
      .map((p) => ({
        userId: p.userId.toString(),
        username: p.username,
        avatar: p.avatar || "",
        vibeScore: p.vibeScore,
      }));

    category.topPlayers.sort((a, b) => b.vibeScore - a.vibeScore);
    category.topPlayers = category.topPlayers.slice(0, 3);

    await category.save();

    res.status(200).json({
      message: "Scores and participation updated",
      user,
      category,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTopVibers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [topVibers, total] = await Promise.all([
      User.find()
        .sort({ vibeScore: -1 })
        .skip(skip)
        .limit(limit)
        .select("username vibeScore avatar crazinessLevel "),
      User.countDocuments(),
    ]);

    res.status(200).json({
      topVibers,
      total,
    });
  } catch (error) {
    console.error("Error fetching top vibers:", error);
    res.status(500).json({
      message: "Error fetching top vibers",
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password"); // omit password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({
      message: "Error fetching user details",
      error: error.message,
    });
  }
};

const getSimilarUsers = async (req, res) => {
  try {
    const userId = req.user.id;

    const currentUser = await User.findById(userId).select("-password");
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { contestType, vibescore, craziness } = currentUser;
    const range = 1;

    const users = await User.find({
      _id: { $ne: userId },
      $or: [
        { contestType },
        { vibescore: { $gte: vibescore - range, $lte: vibescore + range } },
        { craziness: { $gte: craziness - range, $lte: craziness + range } },
      ],
    }).select("-password");

    if (!users.length) {
      return res.status(404).json({ message: "No similar users found" });
    }

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createUser,
  checkUser,
  getUser,
  updateUserProfile,
  updateUserScores,
  getTopVibers,
  getUserById,
  getSimilarUsers,
};
