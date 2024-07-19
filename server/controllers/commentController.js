const Comment = require("../models/comment");
const User = require("../models/user");

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
  const { comment } = req.body;

  console.log("Comment", comment);

  if (!comment) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    console.log("Authenticated user:", req.user);

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User fetched successfully:", user);

    const newComment = new Comment({
      comment,
      author: user.firstname,
      postId: req.user,
    });

    await newComment.save();
    res
      .status(200)
      .json({ message: "Comment saved successfully!", newComment });

    console.log("Comment saved: ", newComment);
  } catch (error) {
    console.log("Error saving message", error);
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
