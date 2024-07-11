const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

userRouter.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

userRouter.route("/signup").post(async (req, res) => {
  const { firstname, lastname, email, username, password } = req.body;
  const existingUser = await User.findOne({ $or: [{ email }] });

  if (existingUser) {
    console.log("User already exists", existingUser);
    return res.status(400).send("User with this emnail already exists");
  }

  try {
    const newUser = new User({
      firstname,
      lastname,
      email,
      username,
      password,
    });
    newUser.save();
  } catch (error) {
    return res.status(500).send("Error registering user");
  }
});

userRouter.get("/login", (req, res, next) => {
  res.send("Welcome to the Login Page");
});

userRouter.route("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("Found user", userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    return res.status(500).send("Error retrieving user");
  }
});

module.exports = userRouter;
