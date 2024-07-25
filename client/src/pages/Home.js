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
      <div className="inline-flex items-center space-x-1 fixed">
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
          <div className="mt-20">
            <label htmlFor="comment">Comment:</label>
            <input
              type="text"
              id="text"
              name="text"
              value={comment}
              onChange={handleChange}
              placeholder="Enter a new comment..."
              className="mx-2 text-black rounded-xl"
            />
            <button type="submit">Submit</button>
          </div>
        </form>

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
                  title={`Comment by ${comment.author}`}
                  date={new Date(comment.createdAt).toLocaleString()}
                  commentId={comment._id}
                  replies={comment.replies}
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
