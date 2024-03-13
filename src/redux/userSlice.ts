import { createSlice } from "@reduxjs/toolkit";

interface UserData {
  username: string;
}
const initialState: UserData = {
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
  },
});
export default userSlice;
