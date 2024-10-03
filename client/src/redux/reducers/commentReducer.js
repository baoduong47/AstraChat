const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COMMENTS_SUCCESS":
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };

    case "RECEIVE_COMMENT_SUCCESS":
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    case "POST_COMMENT_SUCCESS":
      return {
        ...state,
        comments: [...state.comments, action.payload.newComment],
        loading: false,
      };

    case "UPDATED_COMMENT_SUCCESS":
      console.log("received updated comment in reducer", action.payload);
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === action.payload._id
            ? { ...state.comments, ...action.payload }
            : comment
        ),
      };

    case "UPDATE_LIKES_SUCCESS":
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment
        ),
        loading: false,
      };

    case "UPDATED_LIKES_SUCCESS":
      console.log("updated likes reducer", action.payload);
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === action.payload._id
            ? {
                ...comment,
                likes: action.payload.likes,
                likedBy: action.payload.likedBy,
              }
            : comment
        ),
        loading: false,
      };

    case "RECEIVE_REPLY_SUCCESS":
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment
        ),
      };

    case "DELETED_COMMENT_SUCCESS":
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload
        ),
      };

    case "GET_COMMENTS_FAIL":
    case "GET_REPLIES_FAIL":
    case "POST_COMMENT_FAIL":
    case "DELETE_COMMENT_FAIL":
    case "REPLY_TO_COMMENT_FAIL":
    case "UPDATE_LIKES_FAIL":
    case "UPDATE_COMMENT_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default commentReducer;
