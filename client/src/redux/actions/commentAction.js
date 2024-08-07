import axios from "axios";

export const getComments = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/comments/");
    console.log("Recieved comments data: ", response.data);
    dispatch({ type: "GET_COMMENTS_SUCCESS", payload: response.data });
  } catch (error) {
    console.log("Error retrieving comments", error.response.data);
    dispatch({ type: "GET_COMMENTS_FAIL", payload: error.message });
  }
};

export const postComment = (comment) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:3000/comments/",
      {
        comment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "POST_COMMENT_SUCCESS", payload: response.data });
  } catch (error) {
    console.log("Error posting comment", error.response.data);
    dispatch({ type: "POST_COMMENT_FAIL", payload: error.message });
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `http://localhost:3000/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Recieved comments data: ", response.data);
    dispatch({ type: "DELETE_COMMENT_SUCCESS", payload: response.data });
  } catch (error) {
    console.log("Error Deleting comment", error.response.data);
    dispatch({ type: "DELETE_COMMENT_FAIL", payload: error.message });
  }
};

export const replyComment = (commentId, reply) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `http://localhost:3000/comments/${commentId}/replies`,
      {
        reply,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Received reply data: ", response.data);
    dispatch({ type: "REPLY_TO_COMMENT_SUCCESS", payload: response.data });
  } catch (error) {
    console.log("Error replying to comment", error.response.data);
    dispatch({ type: "REPLY_TO_COMMENT_FAIL", payload: error.message });
  }
};

export const updateLikes = (commentId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.post(
      `http://localhost:3000/comments/${commentId}/likes`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Successfully updated likes: ", response.data);
    dispatch({ type: "UPDATE_LIKES_SUCCESS", payload: response.data });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;

    console.log("Error updating likes", errorMessage);

    if (errorMessage === "User has already liked this comment") {
      alert("You have already liked this comment.");
      dispatch({ type: "UPDATE_LIKES_ALREADY_LIKED" });
    } else {
      dispatch({ type: "UPDATE_LIKES_FAIL", payload: errorMessage });
    }
  }
};

export const updateComment = (commentId, updates) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.put(
      `http://localhost:3000/comments/${commentId}`,
      updates,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Successfully updated comment: ", response.data);
    dispatch({ type: "UPDATE_COMMENT_SUCCESS", payload: response.data });
  } catch (error) {
    console.log("Error updating comment", error);
    dispatch({ type: "UPDATE_COMMENT_FAIL", payload: error.message });
  }
};
