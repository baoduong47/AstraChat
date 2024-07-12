const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

userRouter.get("/", function (req, res, next) {
  res.json({ message: "respond with a resource" });
});

userRouter.route("/signup").post(async (req, res) => {
  const { firstname, lastname, email, username, password } = req.body;
  const existingUser = await User.findOne({ $or: [{ email }] });

  if (existingUser) {
    console.log("User already exists", existingUser);
    return res.status(400).send("User with this email already exists");
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
    res.status(200).send("User created successfully!");
    console.log(newUser);
  } catch (error) {
    return res.status(500).send("Error registering user");
  }
});

userRouter.route("/:userId").get(async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("Received userId", userId);

    const user = await User.findById(userId);
    console.log("Found user", user);

    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error); // Log error for debugging
    return res.status(500).send("Error retrieving user");
  }
});

userRouter.get("/login", (req, res, next) => {
  res.send("Welcome to the Login Page");
});

module.exports = userRouter;
