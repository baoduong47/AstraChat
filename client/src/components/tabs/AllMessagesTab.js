import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMessagesForUser,
  receiveAllMessages,
} from "../../redux/actions/messageActions";
import Avatar from "../ui-elements/Avatar.js";
import "animate.css";
import useSocketUpdates from "../../hooks/useSocketUpdates";
import {
  formatTimestamp,
  groupMessagesBySender,
} from "../../utils/messageUtils";

const AllMessagesTab = ({ onClose, onMessageClick, user }) => {
  const [readMessages, setReadMessages] = useState({});

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);
  const { users } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser) {
      dispatch(getAllMessagesForUser());
    }
  }, [currentUser, dispatch]);

  useSocketUpdates(user);

  const handleClick = (message) => {
    setReadMessages((prev) => ({ ...prev, [message._id]: true }));
    onMessageClick(message);
  };

  const groupedMessages = groupMessagesBySender(messages, currentUser, users);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="fixed inset-0 flex justify-end">
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
