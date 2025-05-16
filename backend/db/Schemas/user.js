const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    vibeScore: {
      type: Number,
      default: 0,
    },
    crazinessLevel: {
      type: Number,
      default: 0,
    },
    topScorerStreak: {
      type: Number,
      default: 0,
    },
    contestsParticipated: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
      default: "",
    },

    contestTypes: {
      // stores contest name and participation count
      type: Map,
      of: Number,
      default: {},
    },

    insta: {
      type: String,
      default: "",
    },
    snap: {
      type: String,
      default: "",
    },
    tinder: {
      type: String,
      default: "",
    },
    hinge: {
      type: String,
      default: "",
    },
    bumble: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
