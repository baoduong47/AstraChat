import React, { useEffect } from "react";
import { motion } from "framer-motion";

const PostNotification = ({ notifications, isOpen }) => {
  useEffect(() => {
    console.log("notifications in postNotifications", notifications);
  }, [notifications]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      className="absolute top-72 right-40 bg-white shadow-lg rounded-lg w-80 p-4 border border-gray-300"
    >
      <h3 className="text-lg font-semibold mb-3 text-gray-800 text-center">
        Notifications
      </h3>
      <ul className="space-y-3 overflow-y-auto" style={{ maxHeight: "200px" }}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <li
              key={notification._id}
              className="bg-gray-100 p-3 rounded-md shadow-sm hover:bg-gray-200 transition-colors duration-200"
            >
              <div className="flex items-center space-x-2 mb-2">
                <img
                  src={
                    notification.replier
                      ? `http://localhost:3000/${notification.replier.avatar}`
                      : "default-avatar-url"
                  }
                  alt="Replier Avatar"
                  className="w-9 h-9 border border-gray-200 rounded-full object-cover"
                />
                <div className="text-sm text-gray-700">
                  {notification.type === "like" ? (
                    <div>
                      <strong>{notification.message}</strong>{" "}
                      <span>liked to your comment.</span>
                    </div>
                  ) : (
                    <div>
                      <strong>{notification.message}</strong>{" "}
                      <span>replied to your comment.</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex-1 mt-1 text-ellipsis overflow-hidden">
                  {notification.type === "comment" && (
                    <em>"{notification.replyContent}"</em>
                  )}
                </div>
                <div className="text-xs text-gray-600 mt-2 text-right">
                  {new Date(notification.createdAt).toLocaleString()}
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="text-sm text-gray-700 bg-gray-100 p-3 rounded-md text-center">
            No new notifications
          </li>
        )}
      </ul>
    </motion.div>
  );
};

export default PostNotification;
