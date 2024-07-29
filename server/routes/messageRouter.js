const express = require("express");
const messageRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  sendMessage,
  getMessagesBetweenUsers,
  getUnreadMessagesCount,
  getUnreadMessagesCounts,
  getAllMessagesForUser,
} = require("../controllers/messageController");

messageRouter
  .route("/unread-count")
  .get(authMiddleware, getUnreadMessagesCount);

messageRouter
  .route("/unread-counts")
  .get(authMiddleware, getUnreadMessagesCounts);

messageRouter
  .route("/")
  .get(authMiddleware, getAllMessagesForUser)
  .post(authMiddleware, sendMessage);

messageRouter.route("/:senderId/:recieverId").get(getMessagesBetweenUsers);

module.exports = messageRouter;
