const express = require("express");
const commentRouter = express.Router();
const Comment = require("../models/comment");

commentRouter.route("/").get(async (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

module.exports = commentRouter;
