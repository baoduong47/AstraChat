import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import commentReducer from "./reducers/commentReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    comment: commentReducer,
  },
});

export default store;
