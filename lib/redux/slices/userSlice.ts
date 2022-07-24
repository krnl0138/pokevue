import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "..";
import { TLoginFormData } from "../../../components/forms/loginForm/LoginForm";
import { TProfileFormData } from "../../../components/forms/profileForm/ProfileForm";
import { TRegisterFormData } from "../../../components/forms/registerForm/RegisterForm";
import {
  handleUpdateEmail,
  handleUpdatePassword,
  dbUpdateUserData,
  dbGetUser,
  dbWriteUserData,
  handleCreateUser,
  hanldeSignInWithEmailPassword,
  handleGoogleAuth,
} from "../../../database";

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

export const userSelect = (state: RootState) => state.user;

export const userLogin =
  (data: TLoginFormData) => async (dispatch: AppDispatch) => {
    const { email, password } = data;
    if (!email || !password) return;
    try {
      await hanldeSignInWithEmailPassword(email, password);
      const user = await dbGetUser();
      dispatch(setUser(user));
    } catch {
      throw new Error("Register failed.");
    }
  };

export const userLoginGoogle = () => async (dispatch: AppDispatch) => {
  try {
    await handleGoogleAuth();
    const user = await dbGetUser();
    dispatch(setUser(user));
  } catch {
    throw new Error("Register failed.");
  }
};

export const userRegister =
  (data: TRegisterFormData) => async (dispatch: AppDispatch) => {
    if (!data) return;
    const { email, username, password } = data;
    if (!email || !password || !username) return;
    try {
      await handleCreateUser(email, password);
      const newUser = { username, email };
      await dbWriteUserData(newUser);
      const user = await dbGetUser();
      dispatch(setUser(user));
    } catch {
      throw new Error("Register failed.");
    }
  };

export const userUpdate =
  (data: TProfileFormData) => async (dispatch: AppDispatch) => {
    if (!data) return;
    const { email, password, avatar, username } = data;
    try {
      email && handleUpdateEmail(email);
      password && handleUpdatePassword(password);
      await dbUpdateUserData({
        username,
        email,
        avatar,
      });
      const user = await dbGetUser();
      dispatch(setUser(user));
    } catch {
      throw new Error("Register failed.");
    }
  };
