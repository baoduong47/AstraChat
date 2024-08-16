import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import commentReducer from "./reducers/commentReducer";
import messageReducer from "./reducers/messageReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    comment: commentReducer,
    message: messageReducer,
    notifications: notificationReducer,
  },
});

export default store;
