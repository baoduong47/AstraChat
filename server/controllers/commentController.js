const Comment = require("../models/comment");
const User = require("../models/user");
const Notification = require("../models/notification");

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate({
        path: "replies.authorId",
        select: "firstname avatar title",
      })
      .populate({
        path: "postId",
        select: "firstname avatar title bio location",
      });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).send("Error retrieving comments", error);
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(500).send("Comment not found");
    }

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).send("Error retrieving comment", error);
  }
};

exports.postComment = async (req, res) => {
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let newComment = new Comment({
      comment,
      author: user.firstname,
      postId: req.user,
    });

    await newComment.save();

    newComment = await Comment.findById(newComment._id).populate("postId");

    req.io.emit("receiveComment", newComment);

    return res
      .status(200)
      .json({ message: "Comment saved successfully!", newComment });
  } catch (error) {
    res.status(500).json({ message: "Error saving comment", error });
  }
};

exports.replyComment = async (req, res) => {
  const { reply: replyComment } = req.body;
  const { commentId } = req.params;

  try {
    if (!commentId) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const parentComment = await Comment.findById(commentId);
    if (!parentComment) {
      return res.status(404).json({ message: "Parent comment not found" });
    }

    const reply = {
      comment: replyComment,
      author: user.firstname,
      avatar: user.avatar,
      authorId: user._id,
      createdAt: new Date(),
    };

    if (!reply.authorId) {
      return res.status(400).json({ message: "authorId is required" });
    }

    parentComment.replies.push(reply);

    await parentComment.save();

    if (parentComment.postId.toString() !== user._id.toString()) {
      const notification = new Notification({
        user: parentComment.postId,
        replier: user._id,
        message: user.firstname,
        replyContent: replyComment,
        type: "comment",
        postId: parentComment._id,
      });
      await notification.save();

      req.io.emit("newNotification", notification);
    }

    const updatedParentComment = await Comment.findById(commentId)
      .populate({
        path: "replies.authorId",
        select: "firstname avatar",
      })
      .populate({
        path: "postId",
        select: "avatar title",
      });

    req.io.emit("receiveReply", updatedParentComment);

    return res.status(200).json({
      message: "Reply added successfully!",
      parentComment: updatedParentComment,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error replying to comment", error });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const updates = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(commentId, updates, {
      new: true,
    })
      .populate("postId", "firstname avatar title")
      .populate({
        path: "replies",
        populate: {
          path: "authorId",
          select: "firstname avatar",
        },
      });

    req.io.emit("editComment", updatedComment);

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

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(req.user);

    console.log("User found: ", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(500).json({ message: "Comment not found", error });
    }

    if (comment.postId.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this comment" });
    }
    const removedComment = await Comment.findByIdAndDelete(commentId);

    req.io.emit("deletedComment", removedComment);

    return res
      .status(200)
      .json({ message: "Comment deleted successfully!", removedComment });
  } catch (error) {
    console.log("Error removing message", error);
    return res.status(500).json({ message: "Error deleting message", error });
  }
};

exports.updateLikes = async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (!comment.likedBy) {
      return (comment.likedBy = []);
    }

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userIdString = user._id.toString();

    if (comment.likedBy.some((id) => id.toString() === userIdString)) {
      return res
        .status(400)
        .json({ message: "User has already liked this comment" });
    }

    comment.likes += 1;
    comment.likedBy.push(user);
    await comment.save();

    req.io.emit("updatedLikes", comment);

    if (comment.postId.toString() !== user._id.toString()) {
      const notification = new Notification({
        user: comment.postId,
        replier: user._id,
        message: user.firstname,
        type: "like",
        postId: comment._id,
        read: false,
      });
      await notification.save();

      req.io.emit("newNotification", notification);
    }

    return res.status(200).json({
      comment,
      user: {
        _id: user._id,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error updating likes", error });
  }
};
