import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getCurrentUser } from "../redux/actions/userActions";
import {
  getComments,
  postComment,
  deleteComment,
} from "../redux/actions/commentAction";
import { GiBroadsword } from "react-icons/gi";
import { HiMiniUserCircle } from "react-icons/hi2";
import MainLayout from "../components/MainLayout";
import Card from "../components/Card";
import "animate.css";

const Home = () => {
  const [comment, setComment] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { comments } = useSelector((state) => state.comment);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      dispatch(postComment(comment));
      setComment("");
    } else {
      console.log("User not authenticated. Cannot submit comment.");
    }
  };

  const handleDeleteSubmit = (commentId) => {
    if (currentUser) {
      dispatch(deleteComment(commentId));
      console.log("Successfully deleted comment", comment);
    } else {
      console.log("User not authenticated. Cannot submit comment.");
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <MainLayout>
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
            <span>{currentUser.firstname}</span>
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
      <div>
        <form onSubmit={handleSubmit}>
          <div
            className="mt-10 fixed flex animate__animated animate__fadeInLeft"
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

        <ul style={{ listStyleType: "none", padding: 0, marginTop: 10 }}>
          {comments.map((comment, index) => (
            <li
              key={comment._id}
              style={{
                marginBottom: "16px",
                padding: "50px",
                textAlign: "center",
                animationDelay: `${index * 0.3 + 1.5}s`,
                animationDuration: "1s",
                animationTimingFunction: "ease-in-out",
              }}
              className="flex justify-center animate__animated animate__fadeIn"
            >
              <div>
                <Card
                  key={comment._id}
                  description={comment.comment}
                  author={comment.author}
                  avatar={`http://localhost:3000/${comment.postId.avatar}`}
                  title={`Comment by ${comment.author}`}
                  date={new Date(comment.createdAt).toLocaleString()}
                  commentId={comment._id}
                  replies={comment.replies}
                  likes={comment.likes}
                  likedBy={comment.likedBy}
                />

                <button onClick={() => handleDeleteSubmit(comment._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
};

export default Home;
