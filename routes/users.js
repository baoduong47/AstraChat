const express = require("express");
const router = express.Router();
const User = require("../models/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", async (req, res, next) => {
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

router.get("/login", (req, res, next) => {
  res.send("Welcome to the Login Page");
});

module.exports = router;
