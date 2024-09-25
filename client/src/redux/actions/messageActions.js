import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const sendMessage = (content, recieverId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    await axios.post(
      `http://localhost:8000/messages/`,
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
    // dispatch({ type: "POST_MESSAGE_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "POST_MESSAGE_FAIL", payload: error.message });
  }
};

export const receiveMessage = (message) => ({
  type: "RECEIVE_MESSAGE_SUCCESS",
  payload: message,
});

export const clearMessages = () => ({
  type: "CLEAR_MESSAGES",
});

export const getAllMessagesForUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`http://localhost:8000/messages/`, {
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
        `http://localhost:8000/messages/${senderId}/${recieverId}`,
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
    const response = await axios.get(
      `http://localhost:8000/messages/unread-count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
    const response = await axios.get(
      `http://localhost:8000/messages/unread-counts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: "GET_UNREAD_COUNTS_SUCCESS",
      payload: response.data.unreadCounts,
    });
  } catch (error) {
    dispatch({ type: "GET_UNREAD_COUNTS_FAIL", payload: error.message });
  }
};
