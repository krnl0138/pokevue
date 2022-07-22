import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

type InitialState = {
  username: string;
  email: string;
  avatar: string;
  favourites: { [k: string]: number };
};

// TODO redo with asyncThunk and db connection with custom builder for statuses
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

export const selectUser = (state: RootState) => state.user;
// export const selectUserFetchStatus = (state: RootState) => state.user.status;
