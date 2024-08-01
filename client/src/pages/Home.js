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
import ArtworkCarousel from "../components/ArtworkCarousel";
import { MdLyrics } from "react-icons/md";

import "animate.css";
import Footer from "../components/Footer";

const Home = () => {
  const [comment, setComment] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [showDeleteError, setShowDeleteError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isMusicListVisible, setIsMusicListVisible] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { comments } = useSelector((state) => state.comment);

  const messages = [
    "1000 Needles!",
    "Sharp and ready!",
    "You can't outrun me!",
    "Desert sprinter!",
    "Ready to sting!",
    "Speed demon!",
    "Feeling prickly?",
    "Watch out for my needles!",
    "Cactuar dash!",
    "Try and catch me!",
    "Cactuar power!",
    "Always on point!",
  ];

  const musicList = [
    {
      name: "Kingdom Hearts II - Twilight Town ",
      file: "/sounds/KH_TWILIGHT.mp3",
    },
    { name: "Final Fantasy 15 - Somnus", file: "/sounds/Somnus.mp3" },
    {
      name: "Final Fantasy 13 - The Promise",
      file: "/sounds/FF13_PROMISE.mp3",
    },
    { name: "Song 4", file: "/sounds/song4.mp3" },
    {
      name: "Final Fantasy 13 - The Promise",
      file: "/sounds/ff13_promise.mp3",
    },
  ];

  const playSound = () => {
    const audio = new Audio("/sounds/sao_menu.mp3");
    audio.play();
  };

  const menuSound = () => {
    const audio = new Audio("/sounds/sao_menu_select.mp3");
    audio.play();
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
    if (showSuccess || postSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setPostSuccess(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess, postSuccess]);

  useEffect(() => {
    if (showError || showDeleteError) {
      const timer = setTimeout(() => {
        setShowError(false);
        setShowDeleteError(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showError, showDeleteError]);

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

  const handleCactusClick = () => {
    setIsVisible(true);
    setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
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

  const getGreeting = () => {
    const hours = currentDateTime.getHours();
    if (hours < 12) {
      return "Good Morning";
    } else if (hours < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const toggleMusicList = () => {
    playSound();
    setIsMusicListVisible((prev) => !prev);
  };

  const handleMusicSelection = (music) => {
    menuSound();
    if (selectedMusic === music.name && currentAudio) {
      if (isPlaying) {
        currentAudio.pause();
      } else {
        currentAudio.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      if (currentAudio) {
        currentAudio.pause();
      }
      const audio = new Audio(music.file);
      setSelectedMusic(music.name);
      setCurrentAudio(audio);
      setIsPlaying(true);
      audio.play();

      audio.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }
    setIsMusicListVisible(false);
  };
  return (
    <MainLayout>
      <div className="ml-3 mt-2 relative flex justify-between items-center z-50">
        <Particles count={40} />
        <AnimatePresence>
          {showError && (
            <motion.div
              className="fixed top-0 left-0 w-full flex justify-center mt-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert severity="error">Post required, Kupo!</Alert>
            </motion.div>
          )}
          {showDeleteError && (
            <motion.div
              className="fixed top-0 left-0 w-full flex justify-center mt-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert severity="error">
                You cannot delete someone else's post, Kupo!
              </Alert>
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
              <Alert severity="success">
                Successfully deleted comment, Kupo!
              </Alert>
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
              <Alert severity="success">
                Successfully posted comment, Kupo!
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className="inline-flex text-center items-center space-x-1 fixed animate__animated animate__fadeInLeft text-2xl"
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

              <div className="flex justify-center items-center gap-3">
                <span>{currentUser.firstname}</span>
                <span className="text-sm text-gray-700 mt-1">
                  {currentDateTime.toLocaleString()}
                </span>
                <GiBroadsword size={18} />
              </div>

              <div className="flex gap-2 items-center">
                <MdLyrics
                  className={`ml-2 mt-1 flex justify-center items-center cursor-pointer transition-colors hover:text-indigo-600 duration-200 ${
                    isPlaying ? "text-indigo-600" : "text-gray-700"
                  }`}
                  size={24}
                  onClick={toggleMusicList}
                />

                {isMusicListVisible && (
                  <div
                    className="absolute transform  translate-x-6 translate-y-28 mt-2 w-60 bg-white border  rounded-lg shadow-lg"
                    style={{ zIndex: 9999 }}
                  >
                    <ul className="py-1 text-sm">
                      {musicList.map((music) => (
                        <li
                          key={music.name}
                          className="cursor-pointer text-left px-4 py-2 text-black hover:bg-gray-600 hover:text-white transition-colors duration-200"
                          onClick={() => handleMusicSelection(music)}
                        >
                          {music.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedMusic && (
                  <p className="text-gray-500 text-sm">
                    Playing:
                    <span className="font-bold"> {selectedMusic}</span>
                  </p>
                )}
              </div>
            </span>
          ) : (
            <span>Guest</span>
          )}
        </div>
        <div className="right-32 mr-28 mt-72 fixed">
          <div
            className="inline-flex flex-col items-center animate__animated animate__backInRight"
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
                  {getGreeting()}, {currentUser.firstname}! Welcome to Wisteria!
                  May your adventures here be filled with magic and wonder,
                  kupo!
                </p>
              ) : (
                <p className="text-xs text-gray-700">
                  {getGreeting()}, Kupo! Welcome to Wisteria! May your
                  adventures here be filled with magic and wonder, kupo!
                </p>
              )}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-t-white border-l-transparent border-r-transparent"></div>
            </div>
          </div>
        </div>
      </div>

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
          {/* <img
            src="/images/Behemoth.jpg"
            alt="Monster Image"
            className="w-[440px] h-[440px] mt-4 object-cover rounded-lg "
          /> */}
        </div>
      </form>
      <div className="relative">
        <motion.div
          className="cactus-container fixed bottom-0 left-5"
          initial={{ rotate: 0 }}
          animate={{ rotate: 0 }}
          whileHover={{
            rotate: [0, -15, 0],
            transition: {
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
            },
          }}
          onClick={handleCactusClick}
        >
          <img src="/images/cactus.png" className="w-20 h-auto" alt="Cactus" />
          {isVisible && (
            <div className="cactus-bubble absolute bottom-32 left-24 translate-y-full -translate-x-10 bg-white border border-gray-300 rounded-lg p-2 shadow-lg inline-block min-w-[100px] max-w-[120px] whitespace-normal">
              <p className="text-xs text-gray-700 text-center">
                {messages[messageIndex]}
              </p>
            </div>
          )}
        </motion.div>
      </div>
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
                  authorId={comment.postId}
                  avatar={`http://localhost:3000/${comment.postId.avatar}`}
                  title={comment.postId.title}
                  date={new Date(comment.createdAt).toLocaleString()}
                  commentId={comment._id}
                  replies={comment.replies}
                  likes={comment.likes}
                  likedBy={comment.likedBy}
                  setShowSuccess={setShowSuccess}
                  setShowDeleteError={setShowDeleteError}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* <Footer /> */}
    </MainLayout>
  );
};

export default Home;
