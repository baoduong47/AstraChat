const initialState = {
  isAuthenticated: false,
  users: [],
  loading: true,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_USERS_SUCCESS":
      return {
        ...state,
        users: action.payload,
        loading: false,
        isAuthenticated: true,
      };
    case "GET_USERS_FAIL":
      return {
        ...state,
        users: null,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
