const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };

    case "AUTHENTICATE_USER":
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        loading: false,
        error: null,
      };

    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
