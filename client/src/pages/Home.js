import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import Alert from "@mui/material/Alert";
import { GiBroadsword } from "react-icons/gi";
import { HiMiniUserCircle } from "react-icons/hi2";
import { getUsers, getCurrentUser } from "../redux/actions/userActions";
import { getComments, postComment } from "../redux/actions/commentAction";
import MainLayout from "../components/MainLayout";
import Card from "../components/Card";
import Particles from "../components/Particle";
import { GiTwoCoins } from "react-icons/gi";
import { GiBullHorns } from "react-icons/gi";

import "animate.css";

const Home = () => {
  const [comment, setComment] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { comments } = useSelector((state) => state.comment);

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
    if (showSuccess || postSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setPostSuccess(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess, postSuccess]);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showError]);

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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <MainLayout>
      <div className="ml-3 mt-2 relative flex justify-between items-center">
        <Particles count={30} />
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
          {postSuccess && (
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

            <div className="absolute animate-fly -top-20 -right-3 w-32 bg-white border border-gray-300 rounded-lg p-2 shadow-lg kupo-bubble">
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
          className="ml-3 mt-8 fixed flex-col animate__animated animate__fadeInLeft"
          style={{ animationDelay: "1s", animationDuration: "1s" }}
        >
          <div className="flex">
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

          <motion.div
            className="mt-10 text-center w-[440px] h-auto rounded-lg border-2 border-gray-300 bg-gradient-to-br from-white/90 to-gray-100/90 bg-opacity-80 p-6 relative shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5)]"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            <div className="absolute top-2 right-2 bg-red-700 text-white text-sm px-3 py-1 rounded-full">
              S Rank
            </div>
            <div className="absolute top-2 left-2 bg-yellow-600 text-white text-xs px-2 py-1 rounded">
              Monster of the Day
            </div>
            <div className="w-full h-56 mb-4">
              <img
                src="/images/Behemoth.jpg"
                alt="Monster Image"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div
              className="text-2xl font-extrabold mb-3 mt-3 text-yellow-500 animate-pulse"
              style={{
                fontFamily: "Almendra, serif",
                textShadow: "0 0 10px rgba(255, 215, 0, 0.8)",
              }}
            >
              Behemoth King
            </div>
            <div className="text-left text-sm mb-4 text-gray-600">
              <p>
                The Behemoth King is a colossal and formidable creature,
                towering over its adversaries with an imposing stature. It is
                recognized by its massive, muscular frame, sharp claws, and a
                set of menacing horns that curve backward from its head. Its fur
                is dark and thick, providing a natural armor against attacks.
              </p>
              <p className="mt-2">Location: ???</p>
            </div>
            <div className="border-t-2 border-gold-500 my-4"></div>
            <div className="text-left text-gray-600 text-sm flex justify-between">
              <div className="flex justify-center items-center gap-2">
                Loot:
                <span>
                  <GiBullHorns color="purple" />
                </span>
                Behemoth Horn
              </div>
              <div className="flex justify-center items-center gap-2">
                Gold:
                <span>
                  <GiTwoCoins
                    color="#FFD700"
                    style={{ width: "15px", height: "15px" }}
                  />
                </span>
                50,000 gil
              </div>
            </div>
            <div className="border-t-2 border-gold-500 my-4"></div>
            <div className="mt-4 text-left text-sm text-gray-600">
              <p className="font-bold">Lore:</p>
              <p className="mt-1">
                The Behemoth King has been a menace to the lands for
                centuries...
              </p>
            </div>
          </motion.div>
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
