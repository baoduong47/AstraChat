import axios from "axios";
const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const registerUser = (userData) => async (dispatch) => {
  try {
    console.log("Sending userData:", userData);
    const response = await axios.post(`${apiUrl}/users/signup`, userData);
    console.log("Recieved response: ", response.data);
    dispatch({ type: "REGISTER_SUCCESS", payload: response.data });

    if (response.data.token) {
      console.log("User is authenticated, redirecting to login...");
      window.location.href = "/login";
    } else {
      console.log("User is not authenticated, no redirection.");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    const errorMessage = error.response?.data || { message: "Server error" };
    console.log("Error message:", errorMessage);
    dispatch({ type: "REGISTER_FAIL", payload: errorMessage });
  }
};

export const loginUser = (credentials, rememberMe) => async (dispatch) => {
  try {
    console.log("Logging user with credentials:", credentials);
    const response = await axios.post(`${apiUrl}/users/login`, credentials);
    console.log("Received response from server:", response.data);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });

    localStorage.setItem("token", response.data.token);
  } catch (error) {
    console.log("Error during login:", error.response.data);
    dispatch({ type: "LOGIN_FAIL", payload: error.response.data });
  }
};

export const logoutUser = () => {
  localStorage.removeItem("email");
  localStorage.removeItem("rememberMe");
  return { type: "LOGOUT" };
};

export const authenticateWithToken = (token) => (dispatch) => {
  localStorage.setItem("token", token);

  dispatch({
    type: "AUTHENTICATE_USER",
    payload: token,
  });
};
