import axios from "axios";

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post("/api/auth/signup", userData);
    dispatch({ type: "REGISTER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "REGISTER_FAIL", payload: error.response.data });
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post("/api/auth/login", credentials);
    dispatch({ type: "LOGIN_SUCCESSFUL", payload: response.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error.response.data });
  }
};

export const logoutUser = () => {
  return { type: "LOGOUT" };
};
