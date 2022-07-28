import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { TUser } from "../../../utils/types";
import { dbInterface } from "../../api/dbInterface";

// type TInitialState = Pick<TUser, "uid" | "avatar" | "username">;
type TInitialState = {
  [uid: TUser["uid"]]: {
    avatar: TUser["avatar"];
    username: TUser["username"];
  };
};

const initialState: TInitialState = {};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addOtherUser: (
      state,
      action: PayloadAction<{ uid: string; avatar: string; username: string }>
    ) => {
      console.log(
        "payload in reducer addOtherUser in usersSlice is: ",
        action.payload
      );
      const { uid, avatar, username } = action.payload;
      state[uid] = { avatar: avatar, username: username };
    },
  },
  extraReducers: (builder) =>
    builder.addCase(getOtherUser.fulfilled, (state, action) => {
      // return { ...state, ...action.payload };
    }),
});

// Default exports
export const { actions, reducer: usersReducer } = usersSlice;
export const { addOtherUser } = actions;

// Selectors
export const selectOtherUser = (state: RootState, uid: string) =>
  state.users[uid];
// TODO embed the logic if no avatar return a placeholder -- abstract this logic from components
export const selectUserAvatar = (state: RootState, uid: string) =>
  state.users[uid].avatar;

// Thunks
export const getOtherUser = createAsyncThunk(
  "users/getOtherUser",
  async (uid: string) => {
    const db = dbInterface();
    console.log("from usersSlice: getOtherUser was called ");
    await db.getOtherUser(uid);
  }
);