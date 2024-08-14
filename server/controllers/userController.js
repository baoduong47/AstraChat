const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving users" });
  }
};

exports.getUserById = async (req, res) => {
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
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving user" });
  }
};

exports.updateCurrentUser = async (req, res) => {
  try {
    const userId = req.user;

    console.log("userid", userId);

    const updates = { ...req.body };

    if (req.file) {
      updates.avatar = req.file.path;
    }
    console.log("user", userId);

    updates.bio;
    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");

    console.log("Updates", updates);

    console.log("User", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User successfully updated", user });
  } catch (error) {
    return res.status(500).json({ message: "Error updating profile" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (user) {
      res.status(200).json({ message: "User deleted successfully", user });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    return res.status(500).send("Error deleting user", error);
  }
};

exports.signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User already exists", existingUser);
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7h",
    });

    res
      .status(200)
      .json({ message: "User created successfully!", user: newUser, token });
  } catch (error) {
    return res.status(500).json({ message: "Error signing up", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Password Invalid" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7h",
    });

    res.status(200).json({ message: "Login successful!", user, token });
    console.log("You are successfully logged in!");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error logging in", error });
  }
};
