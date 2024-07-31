import React from "react";
import { motion } from "framer-motion";

const PostNotification = ({ notifications, isOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex justify-center items-start mt-12 p-4 bg-white bg-opacity-90 shadow-2xl rounded-lg w-64 border-2 border-blue-500 text-black"
    >
      <h3 className="text-xl font-extrabold mb-4 text-blue-500">
        Notifications
      </h3>
      <ul className="space-y-2">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li
              key={index}
              className="text-sm bg-gray-200 bg-opacity-75 p-2 rounded-md"
            >
              {notification}
            </li>
          ))
        ) : (
          <li className="text-sm bg-gray-200 bg-opacity-75 p-2 rounded-md">
            No new notifications
          </li>
        )}
      </ul>
    </motion.div>
  );
};

export default PostNotification;
