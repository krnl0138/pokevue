import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { TUser } from "../../../utils/types";
import { dbInterface } from "../../api/dbInterface";

// type TInitialState = Pick<TUser, "uid" | "avatar" | "username">;
type TInitialState = {
  [uid: TUser["uid"]]: {
    avatar?: TUser["avatar"];
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
      action: PayloadAction<{ uid: string; username: string; avatar: string }>
    ) => {
      const { uid, username, avatar } = action.payload;
      state[uid] = { username, avatar };
    },
  },
});

// DEFAULT EXPORTS
export const { actions, reducer: usersReducer } = usersSlice;
export const { addOtherUser } = actions;

// SELECTORS
export const selectOtherUser = (state: RootState, uid: string) =>
  state.users[uid];
export const selectUserAvatar = (state: RootState, uid: string) =>
  state.users[uid].avatar;

// THUNKS
export const getOtherUser = createAsyncThunk(
  "users/getOtherUser",
  async (uid: string) => {
    const db = dbInterface();
    await db.getOtherUser(uid);
  }
);
