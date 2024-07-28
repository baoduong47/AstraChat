import React, { useState, useEffect, useRef } from "react";
import {
  sendMessage,
  getMessagesBetweenUsers,
} from "../redux/actions/messageActions";
import { useDispatch, useSelector } from "react-redux";
import "animate.css";
import Avatar from "../components/Avatar";

const MessageTab = ({ user }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  const { messages } = useSelector((state) => state.message);
  const { currentUser } = useSelector((state) => state.user);
  console.log("messages recieved: ", messages);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMessage(message, user._id));
    setMessage("");
    console.log("Message submitted: ", message);
  };

  console.log("currentUser ID", currentUser._id);
  console.log("user ID", user._id);

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
    <div className="bg-white shadow-lg rounded-lg p-4 w-80 h-full fixed right-56 top-0 text-black border border-gray-300 space-y-2 animate__animated animate__fadeInRight">
      <div className="ml-2 border-b pb-2 mb-4">
        <h2 className="text-xl font-semibold flex gap-1">
          <Avatar
            src={`http://localhost:3000/${user.avatar}`}
            alt={`${currentUser.firstname}'s avatar`}
            className="w-10 h-10 rounded-full object-cover "
          />
          <div className="ml-1 flex flex-col justify-center items-start">
            {user.firstname} {user.lastname}
            <p className="text-sm text-gray-500">
              @{user.firstname} {user.lastname}
            </p>
          </div>
        </h2>
      </div>
      <div className="overflow-y-auto h-5/6 ">
        {messages.map((message) => (
          <div key={message._id} className="mb-2">
            <div className="flex justify-between">
              <p>
                <strong>
                  {message.sender === currentUser._id ? "You" : user.firstname}:
                </strong>{" "}
                {message.content}
              </p>
              <div className="text-sm text-gray-600">
                {formatTimestamp(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
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
        <button
          onClick={handleSubmit} // Add your button functionality here
          className="bg-buttonColor hover:bg-green-700 ml-3 text-white font-bold py-2 px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageTab;
