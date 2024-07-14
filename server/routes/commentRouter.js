const express = require("express");
const commentRouter = express.Router();
const Comment = require("../models/comment");

commentRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const comments = await Comment.find({});
      res.status(200).json(comments);
    } catch (error) {
      return res.status(500).send("Error retrieving comments");
    }
  })
  .post(async (req, res) => {
    const { comment, author, postId } = req.body;
    try {
      const newComment = new Comment({
        comment,
        author,
        postId,
      });

      await newComment.save();
      res
        .status(200)
        .json({ message: "Comment saved successfully!", newComment });
    } catch (error) {
      res.status(500).json({ message: "Error saving comment", error });
    }
  });

module.exports = commentRouter;
