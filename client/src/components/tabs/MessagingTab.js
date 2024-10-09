import React, { useState, useEffect, useRef } from "react";
import {
  sendMessage,
  getMessagesBetweenUsers,
} from "../../redux/actions/messageActions";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import "animate.css";
import Avatar from "../ui-elements/Avatar.js";
import { Filter } from "bad-words";
import AlertNotifications from "../notifications/AlertNotifications";

const MessageTab = ({ user, setIsOpen, avatar }) => {
  const [message, setMessage] = useState("");
  const [showProfanityError, setShowProfanityError] = useState(false);

  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const messagingTabRef = useRef(null);

  const { messages } = useSelector((state) => state.message);
  const { currentUser } = useSelector((state) => state.user);

  const filter = new Filter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        messagingTabRef.current &&
        !messagingTabRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const buttonSound = () => {
    const audio = new Audio("/sounds/ff_select.mp3");
    audio.play();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    buttonSound();

    if (filter.isProfane(message)) {
      setShowProfanityError(true);
      setTimeout(() => setShowProfanityError(false), 2000);
      return;
    }

    dispatch(sendMessage(message, user._id));
    setMessage("");
  };

  useEffect(() => {
    if (user && currentUser) {
      dispatch(getMessagesBetweenUsers(currentUser._id, user._id));
    }
  }, [dispatch, currentUser, user]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("key pressed", e.key);
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      {showProfanityError && (
        <AlertNotifications showProfanityError={showProfanityError} />
      )}
      <div
        className="bg-white shadow-lg rounded-lg p-4 w-80 h-full fixed right-44 top-0 text-black border border-gray-300 space-y-2 animate__animated animate__fadeInRight z-50"
        ref={messagingTabRef}
      >
        <div className="ml-2 border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold flex gap-1">
            <Avatar
              src={avatar}
              alt={`${currentUser.firstname}'s avatar`}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-1 flex flex-col justify-center items-start">
              {user.firstname} {user.lastname}
              <p className="text-sm text-gray-500">
                @{user.firstname} {user.lastname}
              </p>
            </div>
          </h2>
        </div>
        <div className="overflow-y-auto h-5/6">
          {messages.map((message) => {
            const isCurrentUser = message.sender === currentUser._id;
            return (
              <div
                key={message._id}
                className={`flex mb-2 ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`relative p-3 rounded-lg m-2 min-w-[150px] max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl ${
                    isCurrentUser
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  style={{ wordBreak: "break-word" }}
                >
                  <p className="mb-5">
                    <strong>{isCurrentUser ? "You" : user.firstname}:</strong>{" "}
                    {message.content}
                  </p>
                  <div className="text-xs absolute bottom-0 right-0 mr-2 mb-1">
                    {formatTimestamp(message.timestamp)}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full border rounded-md p-2"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <motion.button
            onClick={handleSubmit}
            whileHover={{
              scale: 1.05,
              background: "linear-gradient(135deg, #6b7280, #4b5563)",
              boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.5)",
            }}
            className="bg-indigo-600 ml-3 text-white border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-700 transition-all duration-200 ease-in-out"
            type="submit"
          >
            Submit
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default MessageTab;
