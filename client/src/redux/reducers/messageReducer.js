const initialState = {
  messages: [],
  loading: false,
  error: null,
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

    case "POST_MESSAGE_FAIL":
    case "GET_MESSAGE_FAIL":
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
