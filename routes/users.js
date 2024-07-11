const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

userRouter.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

userRouter.post("/signup", async (req, res) => {
  const { firstname, lastname, email, username, password } = req.body;

  const existingUser = await User.findOne({ $or: [{ email }] });
  if (existingUser) {
    console.log("User already exists:", existingUser);
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
    await newUser.save();
    console.log("User registered successfully:", newUser);
    res.status(200).send("User registered successfully");
  } catch (error) {
    console.error("Error registering user: ", error);
    res.status(500).send("Error registering user");
  }
});

userRouter.get("/login", (req, res, next) => {
  res.send("Welcome to the Login Page");
});

userRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("Received userId:", userId);

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
