import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessagesForUser } from "../redux/actions/messageActions";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import "animate.css";

const AllMessagesTab = ({ onClose, onMessageClick }) => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const { messages } = useSelector((state) => state.message);

  const groupMessagesBySender = (messages) => {
    const groups = messages.reduce((acc, message) => {
      const senderName = message.sender.firstname;
      if (
        !acc[senderName] ||
        new Date(acc[senderName].timestamp) < new Date(message.timestamp)
      ) {
        acc[senderName] = message;
      }
      return acc;
    }, {});
    return Object.values(groups);
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(getAllMessagesForUser());
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    console.log("messages: ", messages);
    messages.map((message) => {
      console.log("mapped message: ", message);
    });
  }, [messages]);

  const groupedMessages = groupMessagesBySender(messages);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
          {groupedMessages.map((message) => (
            <li
              key={message._id}
              className="border p-4 rounded-lg hover:bg-gray-100 transition duration-300 flex items-center space-x-4 cursor-pointer"
              onClick={() => onMessageClick(message)}
            >
              <Avatar
                src={`http://localhost:3000/${message.sender.avatar}`}
                alt={`${message.sender.firstname}'s avatar`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-lg">{message.sender.firstname}</p>
                <p className="text-sm text-gray-600">{message.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllMessagesTab;
