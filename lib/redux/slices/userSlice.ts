import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  username: string;
  email: string;
  avatar: string;
  favourites: { [k: string]: number };
};

export const userSlice = createSlice({
  name: "user",
  initialState: <InitialState>{},
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetUser: () => {
      return {} as InitialState;
    },
  },
});

export const { actions, reducer: userReducer } = userSlice;
export const { setUser, resetUser } = actions;
