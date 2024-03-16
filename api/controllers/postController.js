const Post = require("../models/postModel");
const asyncHandler = require("express-async-handler");

const getAllPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json({ posts });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

const getPostById = asyncHandler(async (req, res) => {
  try {
    const postID = req.params.id;
    const post = await Post.findById(postID);
    res.json({ "selected post: ": post });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

const newPost = asyncHandler(async (req, res) => {
  try {
    const { title, description } = req.body;
    const newPost = await Post.create({ title, description });
    res.status(201).json({ newPost });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

const deletePostById = asyncHandler(async (req, res) => {
  try {
    const postID = req.params.id;
    const post = await Post.findByIdAndDelete(postID);
    if(!post){
      res.status(404);
      throw new Error(`Cannot find any post with ID= ${postID}`);
    }
    res.json({ "deleted post: ": post });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

const updatePostById = asyncHandler(async (req, res) => {
  try {
    const postID = req.params.id;
    const updatedFields = req.body;
    const updatedPost = await Post.findByIdAndUpdate(postID, updatedFields, { new: true,});

    if(!updatedPost){
      res.status(404);
      throw new Error(`Cannot find any post with ID= ${postID}`);
    }
    
    res.json({ "updated post: ": updatedPost });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

module.exports = {
  getAllPosts,
  getPostById,
  newPost,
  deletePostById,
  updatePostById,
};
