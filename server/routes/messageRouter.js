const express = require("express");
const messageRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  sendMessage,
  getMessagesBetweenUsers,
} = require("../controllers/messageController");

messageRouter.route("/").post(authMiddleware, sendMessage);

messageRouter.route("/:senderId/:recieverId").get(getMessagesBetweenUsers);

module.exports = messageRouter;
