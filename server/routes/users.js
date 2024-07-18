const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getUsers,
  signup,
  getUserById,
  login,
  deleteUser,
  getCurrentUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.route("/").get(authMiddleware, getUsers);
userRouter.route("/current").get(authMiddleware, getCurrentUser);
userRouter.route("/signup").post(signup);
userRouter
  .route("/:userId")
  .get(authMiddleware, getUserById)
  .delete(authMiddleware, deleteUser);
userRouter.post("/login", login);

module.exports = userRouter;
