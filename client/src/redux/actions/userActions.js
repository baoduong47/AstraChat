import axios from "axios";

export const getUsers = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/users/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Recieved user data: ", response.data);
    dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    console.log("Error retrieving users", error.response.data);
    dispatch({ type: "GET_USERS_FAIL", payload: error.message });
  }
};
