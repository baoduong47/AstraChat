import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const getComments = () => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:8000/comments/`);
    dispatch({ type: "GET_COMMENTS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_COMMENTS_FAIL", payload: error.message });
  }
};

export const receiveComment = (comment) => ({
  type: "RECEIVE_COMMENT_SUCCESS",
  payload: comment,
});

export const postComment = (comment) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `http://localhost:8000/comments/`,
      {
        comment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    dispatch({ type: "POST_COMMENT_FAIL", payload: error.message });
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `http://localhost:8000/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "DELETE_COMMENT_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "DELETE_COMMENT_FAIL", payload: error.message });
  }
};

export const replyComment = (commentId, reply) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `http://localhost:8000/comments/${commentId}/replies`,
      {
        reply,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "REPLY_TO_COMMENT_SUCCESS", payload: response.data });
  } catch (error) {
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
      `http://localhost:8000/comments/${commentId}/likes`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: "UPDATE_LIKES_SUCCESS", payload: response.data });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;

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
      `http://localhost:8000/comments/${commentId}`,
      updates,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: "UPDATE_COMMENT_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "UPDATE_COMMENT_FAIL", payload: error.message });
  }
};
