import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { postComment } from "../redux/actions/commentAction";
import ArtworkCarousel from "./ArtworkCarousel";

const NewPostForm = ({ currentUser, setShowError, setPostSuccess }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setShowError(true);
      setPostSuccess(false);
      return;
    }

    if (currentUser) {
      dispatch(postComment(comment));
      setComment("");
      setShowError(false);
      setPostSuccess(true);
    } else {
      setShowError(true);
    }
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="ml-3 mt-8 fixed flex flex-col animate__animated animate__fadeInLeft"
        style={{ animationDelay: "1s", animationDuration: "1s" }}
      >
        <div className="flex">
          <div>
            <label htmlFor="comment" className="text-black text-md">
              New Post:
            </label>
            <input
              type="text"
              id="text"
              name="text"
              value={comment}
              onChange={handleChange}
              placeholder="Enter a new comment..."
              className="mx-2 h-10 px-4 text-black bg-inputColor border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition-shadow duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(5px)",
              }}
            />
          </div>
          <div>
            <motion.button
              whileHover={{
                scale: 1.05,
                background: "linear-gradient(135deg, #6b7280, #4b5563)",
                boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.5)",
              }}
              className="h-10 bg-indigo-600 text-white border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-700 transition-all duration-200 ease-in-out"
              type="submit"
            >
              Submit
            </motion.button>
          </div>
        </div>
        <ArtworkCarousel />
      </div>
    </form>
  );
};

export default NewPostForm;
