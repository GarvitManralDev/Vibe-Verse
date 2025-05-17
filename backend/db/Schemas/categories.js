const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  vibeScore: {
    type: Number,
    required: true,
  },
});

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["regular", "edgy"],
    required: true,
  },
  topPlayers: {
    type: [playerSchema],
    validate: [(arr) => arr.length <= 3, "Only top 3 players are allowed"],
  },
  totalTimesPlayed: {
    type: Number,
    default: 0,
  },
  ServerName: {
    type: String,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
  textColor: {
    type: String,
  },
  description: {
    type: String,
  },
  playCount: {
    type: Number,
    default: 0,
  },
  difficulty: {
    type: Number,
  },
});

module.exports = mongoose.model("Category", categorySchema);
