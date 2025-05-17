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
      index: true, // Add index here
    },
    crazinessLevel: {
      type: Number,
      default: 0,
    },
    contestsParticipated: {
      type: Number,
      default: 0,
    },
    contestTypes: {
      type: Map,
      of: Number,
      default: {},
    },
    topContestTypes: {
      type: [String],
      default: [],
    },
    avatar: {
      type: String,
      default: "",
    },
    insta: { type: String, default: "" },
    snap: { type: String, default: "" },
    tinder: { type: String, default: "" },
    hinge: { type: String, default: "" },
    bumble: { type: String, default: "" },
  },
  { timestamps: true }
);

userSchema.index({ vibeScore: -1 });

const User = mongoose.model("User", userSchema);

module.exports = User;
