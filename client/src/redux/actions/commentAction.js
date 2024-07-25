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
