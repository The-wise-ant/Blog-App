const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
  },
  {
    timestamps: true,
  }
);

const postModel = new mongoose.model("posts", PostSchema);

module.exports = postModel;
