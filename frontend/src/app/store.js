import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
// import threadReducer from "../features/counter/threadSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    // thread: threadReducer,
  },
});