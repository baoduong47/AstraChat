const express = require("express");
const commentRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getComments,
  getCommentById,
  postComment,
  editComment,
  deleteComment,
  replyComment,
  updateLikes,
} = require("../controllers/commentController");

commentRouter.route("/").get(getComments).post(authMiddleware, postComment);

commentRouter
  .route("/:commentId")
  .get(getCommentById)
  .put(editComment)
  .delete(authMiddleware, deleteComment);

commentRouter.route("/:commentId/replies").post(authMiddleware, replyComment);

commentRouter.route("/:commentId/likes").post(authMiddleware, updateLikes);

module.exports = commentRouter;
