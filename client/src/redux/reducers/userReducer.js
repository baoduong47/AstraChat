const initialState = {
  isAuthenticated: false,
  users: [],
  loading: true,
  error: null,
  currentUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "UPDATED_USER_SUCCESS":
      console.log("Updated user in Redux:", action.payload);
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),

        currentUser:
          state.currentUser && state.currentUser._id === action.payload._id
            ? { ...state.currentUser, ...action.payload }
            : state.currentUser,

        loading: false,
      };
    case "GET_USERS_SUCCESS":
      return {
        ...state,
        users: action.payload,
        loading: false,
        isAuthenticated: true,
      };
    case "GET_CURRENT_USER_SUCCESS":
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
        isAuthenticated: true,
      };
    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        currentUser: action.payload.user,
        loading: false,
      };

    case "CLEAR_USER_ERROR":
      return {
        ...state,
        error: null,
      };

    case "GET_USERS_FAIL":
    case "GET_CURRENT_USER_FAIL":
    case "UPDATE_USER_FAIL":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
