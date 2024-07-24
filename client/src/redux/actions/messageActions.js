import axios from "axios";

export const sendMessage = (content, recieverId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      "http://localhost:3000/messages/",
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
    dispatch({ type: "POST_MESSAGE_SUCCESS", payload: response.data });
    console.log("Recieved sent message: ", response.data);
  } catch (error) {
    console.log("Error sending message", error.response.data);
    dispatch({ type: "POST_MESSAGE_FAIL", payload: error.message });
  }
};

export const getMessagesBetweenUsers =
  (senderId, recieverId) => async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:3000/messages/${senderId}/${recieverId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "GET_MESSAGE_SUCCESS", payload: response.data });
      console.log("Received messages: ", response.data);
    } catch (error) {
      console.log("Error retrieving messages: ", error.response.data);
      dispatch({ type: "GET_MESSAGE_FAIL", payload: error.message });
    }
  };
