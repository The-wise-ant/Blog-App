const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

const userById = asyncHandler(async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await User.findById(userID);
    res.json({ "target user: ": user });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashPsw = bcrypt.hashSync(password, 10);
    console.log({ "username: ": username, "hashPsw: ": hashPsw });
    const newUser = await User.create({ username, password: hashPsw });
    res.json({ newUser });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await User.findOne({ username });
    if (!user) return res.json("user not found");
    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.json("user or password incorrect");
    console.log("match ", match);
    res.json({ user });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await User.findByIdAndDelete(userID);
    if(!user){
      res.status(404);
      throw new Error(`Cannot find any user with ID= ${userID}`);
    }
    res.json({ "deleted user: ": user });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

const putUserById = asyncHandler(async (req, res) => {
  try {
    const userID = req.params.id;
    const updatedFields = req.body;
    const updatedUser = await User.findByIdAndUpdate(userID, updatedFields, {new: true});
    if(!updatedUser){
      res.status(404);
      throw new Error(`Cannot find any user with ID= ${userID}`);
    }
    res.json({ "updated user: ": updatedUser });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

module.exports = {
  getUsers,
  userById,
  registerUser,
  loginUser,
  deleteUserById,
  putUserById,
};
