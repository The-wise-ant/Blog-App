const express = require("express");
const router = express.Router();

///Controllers Imports
const {getAllPosts, getPostById, newPost,
  deletePostById, updatePostById}= require("../controllers/postController");

///////////


const Post = require("../models/postModel");


//Get All Posts//
router.get("/", getAllPosts);
 
 //Get Post By ID//
 router.get("/:id", getPostById);
 
 //Post a Post //
 router.post("/newPost", newPost);
 
 //Delete Post By ID//
    router.delete("/:id", deletePostById)
 
 //Update Post By ID//
 router.put("/:id", updatePostById)


module.exports = router;