import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getCurrentUser } from "../redux/actions/userActions";
import { getComments, postComment } from "../redux/actions/commentAction";
import { GiBroadsword } from "react-icons/gi";
import { HiMiniUserCircle } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";
import Alert from "@mui/material/Alert";
import MainLayout from "../components/MainLayout";
import Card from "../components/Card";
import "animate.css";

const Home = () => {
  const [comment, setComment] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [postSucess, setPostSuccess] = useState(false);

  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { comments } = useSelector((state) => state.comment);

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

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCurrentUser());
    dispatch(getComments());

    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (showSuccess || postSucess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setPostSuccess(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess, postSucess]);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showError]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <MainLayout>
      <div className="relative flex justify-between items-center">
        <AnimatePresence>
          {showError && (
            <motion.div
              className="fixed top-0 left-0 w-full flex justify-center mt-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert severity="error">Post required.</Alert>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="fixed top-0 left-0 w-full flex justify-center mt-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert severity="success">Successfully deleted comment.</Alert>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {postSucess && (
            <motion.div
              className="fixed top-0 left-0 w-full flex justify-center mt-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert severity="success">Successfully posted comment.</Alert>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className="inline-flex items-center space-x-1 fixed animate__animated animate__fadeInLeft"
          style={{ animationDelay: "0.5s", animationDuration: "1s" }}
        >
          <span>Welcome Back,</span>
          {currentUser ? (
            <span className="inline-flex items-center space-x-2">
              <HiMiniUserCircle
                style={{
                  verticalAlign: "middle",
                  marginRight: "1px",
                  marginLeft: "5px",
                  fontSize: "large",
                }}
              />
              <span>
                {currentUser.title} {currentUser.firstname}
              </span>
              <span>{currentDateTime.toLocaleString()}</span>
              <GiBroadsword
                className="ml-1 inline-block align-middle"
                size={16}
              />
            </span>
          ) : (
            <span>Guest</span>
          )}
        </div>
        <div className="absolute right-0 mr-28 mt-80">
          <div
            className="inline-flex flex-col items-center animate__animated animate__backInRight "
            style={{ animationDelay: "0.5s", animationDuration: "2s" }}
          >
            <img
              src="/images/kupo.png"
              alt="Kupo"
              className="w-20 h-auto mr-32 mb-2 animate-fly"
            />

            <div className="absolute animate-fly  -top-20 -right-3 w-32 bg-white border border-gray-300 rounded-lg p-2 shadow-lg kupo-bubble">
              {currentUser ? (
                <p className="text-xs text-gray-700">
                  Greetings, {currentUser.firstname}! Welcome to Wisteria! May
                  your adventures here be filled with magic and wonder, kupo!
                </p>
              ) : (
                <p className="text-xs text-gray-700">
                  Greetings, Kupo! Welcome to Wisteria! May your adventures here
                  be filled with magic and wonder, kupo!
                </p>
              )}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-t-white border-l-transparent border-r-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          className="mt-8 fixed flex animate__animated animate__fadeInLeft"
          style={{ animationDelay: "1s", animationDuration: "1s" }}
        >
          <div>
            <label htmlFor="comment">New Post:</label>
            <input
              type="text"
              id="text"
              name="text"
              value={comment}
              onChange={handleChange}
              placeholder="Enter a new comment..."
              className="mx-2 h-9 bg-inputColor border-gray-300 text-black rounded-xl"
            />
          </div>
          <div>
            <button
              className="h-9 bg-white border flex justify-center items-center border-gray-300 rounded-lg hover:bg-inputColor focus:outline-none  px-4 py-2 text-center"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      <div>
        <ul style={{ listStyleType: "none", padding: 0, marginTop: 10 }}>
          {comments.map((comment) => (
            <li
              key={comment._id}
              style={{
                marginBottom: "16px",
                padding: "50px",
                textAlign: "center",
              }}
              className="flex justify-center"
            >
              <div>
                <Card
                  description={comment.comment}
                  author={comment.author}
                  avatar={`http://localhost:3000/${comment.postId.avatar}`}
                  title={comment.postId.title}
                  date={new Date(comment.createdAt).toLocaleString()}
                  commentId={comment._id}
                  replies={comment.replies}
                  likes={comment.likes}
                  likedBy={comment.likedBy}
                  setShowSuccess={setShowSuccess}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
};

export default Home;
