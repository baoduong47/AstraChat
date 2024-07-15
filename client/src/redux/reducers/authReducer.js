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
    case "LOGIN_SUCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payloud.user,
        loading: false,
        error: null,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payloud,
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
