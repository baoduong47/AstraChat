const express = require("express");
const messageRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const { sendMessage } = require("../controllers/messageController");

messageRouter.route("/").post(authMiddleware, sendMessage);

module.exports = messageRouter;
