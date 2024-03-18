import { createSlice } from "@reduxjs/toolkit";

interface UserData {
  user_id: number;
  username: string;
}
const initialState: UserData = {
  user_id: 0,
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    get: (state) => {},
    post: (state, action) => {
      state.username = action.payload;
    },
    postId: (state, action) => {
      state.user_id = action.payload;
    },
  },
});
export default userSlice;
