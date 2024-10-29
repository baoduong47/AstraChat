import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const getComments = () => async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/comments/`);
    dispatch({ type: "GET_COMMENTS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_COMMENTS_FAIL", payload: error.message });
  }
};

export const receiveComment = (comment) => ({
  type: "RECEIVE_COMMENT_SUCCESS",
  payload: comment,
});

export const editComment = (updatedComment) => ({
  type: "UPDATED_COMMENT_SUCCESS",
  payload: updatedComment,
});

export const updatedLikes = (comment) => ({
  type: "UPDATED_LIKES_SUCCESS",
  payload: comment,
});

export const postComment = (comment) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `${apiUrl}/comments/`,
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
    await axios.delete(`${apiUrl}/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    dispatch({ type: "DELETE_COMMENT_FAIL", payload: error.message });
  }
};

export const deletedComment = (removedComment) => ({
  type: "DELETED_COMMENT_SUCCESS",
  payload: removedComment,
});

export const replyComment = (commentId, reply) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `${apiUrl}/comments/${commentId}/replies`,
      {
        reply,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    dispatch({ type: "REPLY_TO_COMMENT_FAIL", payload: error.message });
  }
};

export const receiveReply = (updatedParentComment) => ({
  type: "RECEIVE_REPLY_SUCCESS",
  payload: updatedParentComment,
});

export const updateLikes = (commentId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.post(
      `${apiUrl}/comments/${commentId}/likes`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // dispatch({ type: "UPDATE_LIKES_SUCCESS", payload: response.data });
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

    await axios.put(`${apiUrl}/comments/${commentId}`, updates, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    dispatch({ type: "UPDATE_COMMENT_FAIL", payload: error.message });
  }
};
