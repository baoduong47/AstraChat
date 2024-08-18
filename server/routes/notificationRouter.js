const express = require("express");
const notificationRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getNotifications,
  markAsRead,
  deleteNotifications,
} = require("../controllers/notificationController");

notificationRouter
  .route("/")
  .get(authMiddleware, getNotifications)
  .delete(authMiddleware, deleteNotifications);

notificationRouter.put("/read", authMiddleware, markAsRead);

module.exports = notificationRouter;
