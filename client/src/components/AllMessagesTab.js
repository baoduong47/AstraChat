import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMessagesForUser,
  receiveAllMessages,
} from "../redux/actions/messageActions";
import Avatar from "./Avatar";
import "animate.css";
import socket from "../utils/socket";

const AllMessagesTab = ({ onClose, onMessageClick, user }) => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);
  const { users } = useSelector((state) => state.user);

  const [readMessages, setReadMessages] = useState({});

  const groupMessagesBySender = (messages) => {
    const filteredMessages = messages.filter(
      (message) => message.sender._id !== currentUser._id
    );

    const groups = filteredMessages.reduce((acc, message) => {
      const senderName = message.sender.firstname;

      const sender =
        users.find((user) => user._id === message.sender._id) || message.sender;

      if (
        !acc[senderName] ||
        new Date(acc[senderName].timestamp) < new Date(message.timestamp)
      ) {
        acc[senderName] = { ...message, sender };
      }
      return acc;
    }, {});

    return Object.values(groups);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minutes ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      if (days > 1) {
        return `${days} days ago`;
      } else {
        return `${days} day ago`;
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(getAllMessagesForUser());
    }
  }, [currentUser, dispatch]);

  const handleClick = (message) => {
    setReadMessages((prev) => ({ ...prev, [message._id]: true }));
    onMessageClick(message);
  };

  useEffect(() => {
    socket.on("userUpdated", (updatedUser) => {
      dispatch({
        type: "UPDATED_USER_SUCCESS",
        payload: updatedUser,
      });
    });

    return () => {
      socket.off("userUpdated");
    };
  }, [dispatch]);

  const groupedMessages = groupMessagesBySender(messages);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="fixed inset-0 flex justify-end ">
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
          {groupedMessages.length > 0 ? (
            groupedMessages.map((message) => (
              <li
                key={message._id}
                className="border-2 p-4 rounded-lg hover:bg-gray-100 transition duration-300 flex items-center space-x-4 cursor-pointer relative"
                onClick={() => handleClick(message)}
              >
                <Avatar
                  src={message.sender.avatar}
                  alt={`${message.sender.firstname}'s avatar`}
                  className="w-12 h-12 rounded-full  object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <p className="font-bold text-lg">
                        {message.sender.firstname}
                      </p>
                      {message.sender.title && (
                        <div>
                          <span className="text-gray-900 text-sm ml-1 mr-1">
                            •
                          </span>
                          <span className="text-gray-500 text-sm">
                            {message.sender.title}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">
                      {formatTimestamp(message.timestamp)}...
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">{message.content}</p>
                </div>
              </li>
            ))
          ) : (
            <li className="text-center mt-10 text-gray-500">
              No messages yet. Start a conversation!
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AllMessagesTab;
