const express = require("express");
const notificationRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");

notificationRouter.get("/", authMiddleware, getNotifications);

notificationRouter.put("/read", authMiddleware, markAsRead);

module.exports = notificationRouter;
