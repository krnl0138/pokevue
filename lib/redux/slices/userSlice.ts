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
    setUser: (state, action) => {
      //   state.username = action.payload.username;
      //   state.email = action.payload.email;
      //   state.avatar = action.payload.avatar;
      return { ...state, ...action.payload };
    },
  },
});

const { actions, reducer: userReducer } = userSlice;
export const { setUser } = actions;
export default userReducer;
