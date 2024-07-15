const express = require("express");

const {
  getUsers,
  signup,
  getUserById,
  login,
  deleteUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.route("/").get(getUsers);
userRouter.route("/signup").post(signup);
userRouter.route("/:userId").get(getUserById).delete(deleteUser);
userRouter.post("/login", login);

module.exports = userRouter;
