import React, { useState } from "react";
import { motion } from "framer-motion";

const PostNotification = ({ notifications, isOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      className="absolute top-72 right-40 bg-gray-400 text-white shadow-lg rounded-lg w-72 p-4"
    >
      <h3 className="text-lg font-bold mb-3 text-center">Notifications</h3>
      <ul className="space-y-2 overflow-y-auto" style={{ maxHeight: "150px" }}>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li
              key={index}
              className="text-sm bg-opacity-50 bg-black p-2 rounded-md"
            >
              {notification}
            </li>
          ))
        ) : (
          <li className="text-sm bg-opacity-50 bg-black p-2 rounded-md text-center">
            No new notifications
          </li>
        )}
      </ul>
    </motion.div>
  );
};

export default PostNotification;
