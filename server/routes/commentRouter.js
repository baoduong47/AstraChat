const express = require("express");
const commentRouter = express.Router();

const {
  getComments,
  postComment,
} = require("../controllers/commentController");

commentRouter.route("/").get(getComments).post(postComment);

module.exports = commentRouter;
