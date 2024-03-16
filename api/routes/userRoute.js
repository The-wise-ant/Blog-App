const express = require("express");
const router = express.Router();

//controllers imports
const  {getUsers, userById, registerUser, 
  loginUser, deleteUserById, putUserById}= require("../controllers/userController");
///
const User = require("../models/userModel");



//Get All Users//
router.get("/", getUsers);

//Get User By ID//
router.get("/:id", userById);

//Register User//
router.post("/register", registerUser);

 //Login User//
router.post("/login", loginUser);

//Delete User By ID//
   router.delete("/:id", deleteUserById)

//Put User By ID//
router.put("/:id", putUserById)
 


module.exports = router;