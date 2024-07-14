const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

userRouter.route("/").get(async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).send("Error retrieving users");
  }
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

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful!", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Invalid email or password" });
  }
});

module.exports = userRouter;
