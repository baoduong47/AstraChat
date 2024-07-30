const initialState = {
  messages: [],
  loading: false,
  error: null,
  unreadCount: 0,
  unreadCounts: {},
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POST_MESSAGE_SUCCESS":
      return {
        ...state,
        messages: [...state.messages, action.payload.newMessage],
        loading: false,
      };

    case "GET_MESSAGE_SUCCESS":
      return {
        ...state,
        messages: action.payload,
        loading: false,
      };

    case "GET_UNREAD_COUNT_SUCCESS":
      return {
        ...state,
        unreadCount: action.payload,
      };

    case "GET_UNREAD_COUNTS_SUCCESS":
      return {
        ...state,
        unreadCounts: action.payload,
      };

    case "GET_ALL_MSG_SUCCESS":
      return {
        ...state,
        messages: action.payload,
        loading: false,
      };

    case "POST_MESSAGE_FAIL":
    case "GET_MESSAGE_FAIL":
    case "GET_MSG_FAIL":
    case "GET_UNREAD_COUNT_FAIL":
    case "GET_UNREAD_COUNTS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default messageReducer;
