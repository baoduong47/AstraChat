// Home.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getCurrentUser } from "../redux/actions/userActions";
import {
  getComments,
  postComment,
  deleteComment,
} from "../redux/actions/commentAction";
import PersonIcon from "@mui/icons-material/Person";
import MainLayout from "../components/MainLayout";
import Card from "../components/Card";

const Home = () => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { comments } = useSelector((state) => state.comment);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      dispatch(postComment(comment));
      console.log("Comment submitted", comment);
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

  const now = new Date();
  const currentDateTime = now.toLocaleString();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCurrentUser());
    dispatch(getComments());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <MainLayout>
      <h1>
        Welcome Back, {""}
        {currentUser ? (
          <>
            <PersonIcon
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            {currentUser.firstname} {currentDateTime}
          </>
        ) : (
          "Guest"
        )}
      </h1>

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
