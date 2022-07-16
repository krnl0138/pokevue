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
      return { ...state, ...action.payload };
    },
    resetUser: () => {
      return initialState;
    },
  },
});

const { actions, reducer: userReducer } = userSlice;
export const { setUser, resetUser } = actions;
export default userReducer;
