const express = require("express");
const userRouter = express.Router();

const {
  getUsers,
  signup,
  getUserById,
  login,
  deleteUser,
} = require("../controllers/userController");

userRouter.route("/users").get(getUsers);
userRouter.route("/signup").post(signup);
userRouter.route("/:userId").get(getUserById).delete(deleteUser);
userRouter.route("/login").post(login);

module.exports = userRouter;
