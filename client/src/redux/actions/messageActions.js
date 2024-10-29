import axios from "axios";
import { useActionData } from "react-router-dom";
const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const sendMessage = (content, recieverId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    await axios.post(
      `${apiUrl}/messages/`,
      {
        content,
        recieverId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    dispatch({ type: "POST_MESSAGE_FAIL", payload: error.message });
  }
};

export const receiveMessage = (newMessage, currentUser) => (dispatch) =>
  dispatch({
    type: "RECEIVE_MESSAGE_SUCCESS",
    payload: { newMessage, currentUser },
  });

export const clearMessages = () => ({
  type: "CLEAR_MESSAGES",
});

export const getAllMessagesForUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${apiUrl}/messages/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "GET_ALL_MSG_SUCCESS", payload: response.data.messages });
  } catch (error) {
    dispatch({ type: "GET_ALL_MSG_FAIL", payload: error.message });
  }
};

export const getMessagesBetweenUsers =
  (senderId, recieverId) => async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${apiUrl}/messages/${senderId}/${recieverId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "GET_MESSAGE_SUCCESS", payload: response.data });
      dispatch(getUnreadMessagesCounts());
    } catch (error) {
      dispatch({ type: "GET_MESSAGE_FAIL", payload: error.message });
    }
  };

export const getUnreadMessagesCount = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${apiUrl}/messages/unread-count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "GET_UNREAD_COUNT_SUCCESS",
      payload: response.data.unreadCount,
    });
  } catch (error) {
    dispatch({ type: "GET_UNREAD_COUNT_FAIL", payload: error.message });
  }
};

export const getUnreadMessagesCounts = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${apiUrl}/messages/unread-counts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "GET_UNREAD_COUNTS_SUCCESS",
      payload: response.data.unreadCounts,
    });
  } catch (error) {
    dispatch({ type: "GET_UNREAD_COUNTS_FAIL", payload: error.message });
  }
};
