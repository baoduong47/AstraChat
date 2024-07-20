const express = require("express");
const upload = require("../config/uploadConfig");
const authMiddleware = require("../middleware/authMiddleware");

const {
  getUsers,
  signup,
  getUserById,
  login,
  deleteUser,
  getCurrentUser,
  updateCurrentUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.route("/").get(authMiddleware, getUsers);
userRouter
  .route("/current")
  .get(authMiddleware, getCurrentUser)
  .put(authMiddleware, upload.single("avatar"), updateCurrentUser);
userRouter.route("/signup").post(signup);
userRouter
  .route("/:userId")

  .get(authMiddleware, getUserById)
  .delete(authMiddleware, deleteUser);
userRouter.post("/login", login);

module.exports = userRouter;
