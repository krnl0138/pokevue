import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  avatar: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.username = actions.payload.username;
      state.email = actions.payload.email;
      state.avatar = actions.payload.avatar;
    },
  },
});

const { actions, reducer: userReducer } = userSlice;
export const { setUser } = actions;
export default userReducer;
