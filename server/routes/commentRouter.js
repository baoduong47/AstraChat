const express = require("express");
const commentRouter = express.Router();

const {
  getComments,
  getCommentById,
  postComment,
  editComment,
} = require("../controllers/commentController");

commentRouter.route("/").get(getComments).post(postComment);
commentRouter.route("/:commentId").get(getCommentById).put(editComment);

module.exports = commentRouter;
