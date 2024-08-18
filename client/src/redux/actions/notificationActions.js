import axios from "axios";

export const getNotifications = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/notifications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Received notifications data: ", response.data);
    dispatch({ type: "GET_NOTIFICATIONS_SUCCESS", payload: response.data });
  } catch (error) {
    console.log(
      "Error retrieving notifications",
      error.response?.data || error.message
    );
    dispatch({ type: "GET_NOTIFICATIONS_FAIL", payload: error.message });
  }
};

export const deleteNotifications = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete("http://localhost:3000/notifications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: "DELETE_NOTIFICATIONS_SUCCESS" });
  } catch (error) {
    dispatch({ type: "DELETE_NOTIFICATIONS_FAIL", payload: error.message });
  }
};

export const markNotificationsAsRead = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      "http://localhost:3000/notifications/read",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Successfully marked notifications as read: ", response.data);
    dispatch({
      type: "MARK_NOTIFICATIONS_READ_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    console.log(
      "Error marking notifications as read",
      error.response?.data || error.message
    );
    dispatch({ type: "MARK_NOTIFICATIONS_READ_FAIL", payload: error.message });
  }
};
