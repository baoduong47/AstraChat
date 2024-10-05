const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NOTIFICATIONS_SUCCESS":
      return {
        ...state,
        notifications: action.payload,
        loading: false,
      };
    case "RECEIVE_NOTIFICATIONS_SUCCESS":
      console.log("received notification", action.payload);
      console.log("Current state", state.notifications);
      console.log("updated state", [...state.notifications, action.payload]);

      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    case "MARK_NOTIFICATIONS_READ_SUCCESS":
      return {
        ...state,
        notifications: state.notifications.map((notification) => ({
          ...notification,
          read: true,
        })),
        loading: false,
      };
    case "DELETE_NOTIFICATIONS_SUCCESS":
      return {
        ...state,
        notifications: [],
        loading: false,
      };
    case "GET_NOTIFICATIONS_FAIL":
    case "MARK_NOTIFICATIONS_READ_FAIL":
    case "DELETE_NOTIFICATIONS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default notificationReducer;
