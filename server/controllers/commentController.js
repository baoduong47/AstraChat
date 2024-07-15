const Comment = require("../models/comment");
const { findById, findByIdAndUpdate } = require("../models/user");

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.status(200).json(comments);
  } catch (error) {
    return res.status(500).send("Error retrieving comments");
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const comment = await Comment.findById(commentId);
    console.log("Found comment", comment);

    if (!comment) {
      return res.status(500).send("Comment not found");
    }

    res.status(200).json(comment);
  } catch (error) {
    return res.status(500).send("Error retrieving comment");
  }
};

exports.postComment = async (req, res) => {
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
};

exports.editComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const updates = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(commentId, updates, {
      new: true,
    });

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    return res
      .status(200)
      .json({ message: "Comment updated successfully", updatedComment });
  } catch (error) {
    return res.status(404).json({ message: "Error updating comment", error });
  }
};
