import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
export default store;
// What is this?
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
