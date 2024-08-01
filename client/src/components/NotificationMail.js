import React from "react";

const NotificationModal = ({ notifications, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">Notifications</h3>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification, index) => (
              <li key={index} className="mb-2">
                <p className="text-gray-800">{notification.message}</p>
                <span className="text-gray-500 text-sm">
                  {notification.date}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No notifications available.</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
