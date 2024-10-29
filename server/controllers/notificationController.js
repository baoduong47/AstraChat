const Notification = require("../models/notification");

// Get all notifications for a user
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user })
      .sort({ createdAt: -1 })
      .populate("replier", "firstname avatar")
      .exec();

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving notifications", error });
  }
};

// Delete all notifications for a user
exports.deleteNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({ user: req.user });
    res.status(200).json({ message: "All notifications deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting notifications", error });
  }
};

// Mark all notifications as read for a user
exports.markAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user, read: false },
      { $set: { read: true } }
    );
    res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error marking notifications as read", error });
  }
};
