const Notification = require("../models/notification");

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user,
      read: false,
    });
    console.log("notifications found:", notifications);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving notifications", error });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user, read: false },
      { read: true }
    );
    res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error marking notifications as read", error });
  }
};
