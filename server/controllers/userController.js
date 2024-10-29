const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving users" });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    return res.status(500).send("Error retrieving user");
  }
};

// Get the current authenticated user
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

// Update the current authenticated user's profile
exports.updateCurrentUser = async (req, res) => {
  try {
    const userId = req.user;

    const updates = { ...req.body };

    if (updates.email) {
      const existingUser = await User.findOne({ email: updates.email });

      if (existingUser && existingUser._id.toString() !== userId.toString()) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Handle avatar update if file is provided
    if (req.file) {
      updates.avatar = req.file.path;
    }

    updates.bio;

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.io.emit("userUpdated", user);

    res.status(200).json({ message: "User successfully updated", user });
  } catch (error) {
    return res.status(500).json({ message: "Error updating profile" });
  }
};

// Delete user by ID
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

//  Sign up a new user
exports.signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT for the new user
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

// Log in a existing user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Password Invalid" });
    }

    // Generate JWT for authenticated user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7h",
    });

    res.status(200).json({ message: "Login successful!", user, token });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in", error });
  }
};
