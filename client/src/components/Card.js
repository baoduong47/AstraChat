import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  replyComment,
  updateLikes,
  deleteComment,
} from "../redux/actions/commentAction";
import { FiMessageCircle } from "react-icons/fi";
import { SiThunderbird } from "react-icons/si";
import Avatar from "./Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "animate.css";
import ConfirmationModal from "./ConfirmationModal";
import { GiCrystalCluster } from "react-icons/gi";

const Card = ({
  avatar,
  author,
  date,
  description,
  commentId,
  replies,
  likes,
  likedBy: initialLikedBy,
  title,
  setShowSuccess,
  setShowDeleteError,
  authorId,
}) => {
  const [reply, setReply] = useState("");
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [isMessageOpen, setMessageOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [likedBy, setLikedBy] = useState(initialLikedBy);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleMenuClick = (event) => {
    playSound();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    handleDelete();
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setReply(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reply.trim() === "") return;
    if (currentUser) {
      dispatch(replyComment(commentId, reply));
      setReply("");
    }
  };

  const handleLikes = (e) => {
    e.preventDefault();

    if (likedBy.includes(currentUser._id)) {
      alert("User has already liked this comment");
      return;
    }

    dispatch(updateLikes(commentId));
    setCurrentLikes(currentLikes + 1);
    setLikedBy([...likedBy, currentUser._id]);
  };

  const toggleComments = (e) => {
    setMessageOpen(!isMessageOpen);
  };

  const handleEdit = () => {
    // Implement edit functionality here
    handleMenuClose();
  };

  const handleDelete = () => {
    if (currentUser) {
      dispatch(deleteComment(commentId));
      menuSound();
      setShowSuccess(true);
    } else {
      setShowSuccess(false);
    }
    handleMenuClose();
  };

  const confirmDelete = () => {
    if (currentUser._id === authorId._id) {
      setIsModalOpen(true);
    } else {
      setShowDeleteError(true);
    }
  };

  const parseDescription = (description) => {
    const parts = description.split(/(#[a-zA-Z0-9_]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith("#")) {
        return <strong key={index}>{part}</strong>;
      }
      return part;
    });
  };

  const playSound = () => {
    const audio = new Audio("/sounds/sao_menu.mp3");
    audio.play();
  };

  const menuSound = () => {
    const audio = new Audio("/sounds/sao_menu_select.mp3");
    audio.play();
  };

  return (
    <div
      className="ml-40 relative border bg-opacity-90 bg-white border-gray-300 rounded-lg box-border h-auto min-w-96 p-6 w-[500px] mx-auto shadow-[-5px_5px_10px_-2px_rgba(0,0,0,0.3)] animate__animated animate__fadeInUp"
      style={{ animationDelay: "0.2s", animationDuration: "2s" }}
    >
      <div className="absolute top-2 right-2">
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
        >
          <SiThunderbird className="text-gray-700" />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={handleEdit}
            style={{ fontFamily: "inherit", fontSize: "inherit" }}
          >
            Edit Post
          </MenuItem>

          <MenuItem
            onClick={confirmDelete}
            style={{ fontFamily: "inherit", fontSize: "inherit" }}
          >
            Delete Post
          </MenuItem>
        </Menu>
      </div>
      <div className="flex items-center justify-start ml-1">
        <Avatar
          src={avatar}
          alt={`Avatar of ${author}`}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col items-start justify-center ml-3">
          <div className="text-foreground font-medium text-lg flex items-center space-x-2">
            <span>{author}</span>
            {title && (
              <>
                <span className="text-gray-900 text-sm">•</span>
                <span className="text-gray-500 text-sm">{title}</span>
              </>
            )}
          </div>
          <div className="text-foregroundColor text-sm">{date}</div>
        </div>
      </div>
      <div className="text-start mt-4 text-foreground text-base dark:text-card-foreground">
        {parseDescription(description)}
      </div>
      <div className="mt-4 border-t pt-4 dark:border-muted"></div>
      <div className="flex items-center text-center">
        <button onClick={handleLikes}>
          <GiCrystalCluster color="#3A0CA3" className="w-5 h-5" />
        </button>
        <div className="text-foregroundColor text-sm ml-3">
          {currentLikes} likes
        </div>
      </div>
      <div className="mt-6 grid gap-4">
        <div className="flex justify-start items-center gap-2 mb-3">
          <FiMessageCircle size={15} className="text-gray-700" />
          {isMessageOpen ? (
            <button
              type="button"
              onClick={toggleComments}
              className="text-sm text-gray-700"
            >
              Hide Comments {`(${replies.length})`}
            </button>
          ) : (
            <button
              type="button"
              onClick={toggleComments}
              className="text-sm text-gray-700"
            >
              Show Comments {`(${replies.length})`}
            </button>
          )}
        </div>
        {isMessageOpen && (
          <>
            {replies &&
              replies.map((reply) => (
                <div key={reply._id} className="flex items-start">
                  {reply.authorId && reply.authorId.avatar ? (
                    <Avatar
                      src={`http://localhost:3000/${reply.authorId.avatar}`}
                      alt={`Avatar of ${reply.authorId.firstname}`}
                      className="w-10 h-10 rounded-full flex-shrink-0"
                    />
                  ) : (
                    <Avatar
                      src="/default-avatar.png"
                      alt="Default Avatar"
                      className="w-10 h-10 rounded-full flex-shrink-0"
                    />
                  )}
                  <div className="ml-3 flex flex-col">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">
                        @{reply.authorId ? reply.authorId.firstname : "Unknown"}
                      </div>
                      <div className="text-xs text-muted-foreground dark:text-muted-foreground">
                        {new Date(reply.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-start text-sm text-foreground dark:text-card-foreground mt-1">
                      {reply.comment}
                    </div>
                  </div>
                </div>
              ))}
          </>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex items-center space-x-2 mt-4"
        >
          <input
            onChange={handleChange}
            value={reply}
            type="text"
            className="w-full h-10 p-2 border bg-inputColor border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            className="h-10 bg-white border border-gray-300 text-black px-4 py-2 flex items-center justify-center rounded-lg hover:bg-inputColor focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Reply
          </button>
        </form>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
};

export default Card;
