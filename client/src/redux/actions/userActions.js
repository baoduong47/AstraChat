import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const getUsers = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`http://localhost:8000/users/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_USERS_FAIL", payload: error.message });
  }
};

export const getCurrentUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`http://localhost:8000/users/current`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "GET_CURRENT_USER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_CURRENT_USER_FAIL", payload: error.message });
  }
};

export const updateCurrentUser = (formData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:8000/users/current`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "UPDATE_USER_SUCCESS", payload: response.data });
  } catch (error) {
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.message === "Email already in use"
    ) {
      dispatch({ type: "UPDATE_USER_FAIL", payload: "Email already in use" });
    } else {
      dispatch({ type: "UPDATE_USER_FAIL", payload: error.message });
    }
  }
};

export const clearUserError = () => {
  return {
    type: "CLEAR_USER_ERROR",
  };
};
