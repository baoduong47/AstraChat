// src/components/AllMessagesTab.jsx

import React from "react";
import { Link } from "react-router-dom";
import "animate.css";

const AllMessagesTab = ({ onClose }) => {
  const conversations = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "Hey, how are you?",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "Are we still on for tomorrow?",
    },
    {
      id: 3,
      name: "Mike Johnson",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "Great job on the project!",
    },
  ];

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      <div
        className="bg-black opacity-50 absolute inset-0"
        onClick={onClose}
      ></div>
      <div className="bg-white w-full md:w-1/3 h-full shadow-lg p-4 overflow-y-auto animate__animated animate__slideInRight relative text-black border border-gray-300 space-y-2">
        <button
          onClick={onClose}
          className="text-xl font-bold absolute right-4 top-4"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <ul className="space-y-4">
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              className="border p-4 rounded-lg hover:bg-gray-100 transition duration-300"
            >
              <Link
                to={`/messages/${conversation.id}`}
                className="flex items-center space-x-4"
              >
                <img
                  src={conversation.avatar}
                  alt={`${conversation.name}'s avatar`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-lg">{conversation.name}</p>
                  <p className="text-sm text-gray-600">
                    {conversation.lastMessage}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllMessagesTab;
